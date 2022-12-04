"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketServer = exports.PeerConnection = exports.waitMessageWithTimeout = exports.waitMessage = void 0;
var tslib_1 = require("tslib");
var isomorphic_ws_1 = (0, tslib_1.__importDefault)(require("isomorphic-ws"));
var events_1 = require("events");
var msgpack_lite_1 = (0, tslib_1.__importDefault)(require("msgpack-lite"));
var decentralizedMessages = (0, tslib_1.__importStar)(require("./decentralized/messages"));
var messages_1 = require("./messages");
var utils_1 = require("./utils");
function waitMessage(connection, type) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        // "once" is important because we can't resolve the same promise multiple time
                        connection.once(type, function (event) {
                            resolve(event);
                        });
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.waitMessage = waitMessage;
function waitMessageWithTimeout(connection, type, timeoutMs) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.race([waitMessage(connection, type), (0, utils_1.timeout)(timeoutMs)])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.waitMessageWithTimeout = waitMessageWithTimeout;
var PeerConnection = /** @class */ (function () {
    function PeerConnection(selfId, peer, signallingServer) {
        this.eventEmitter = new events_1.EventEmitter();
        this.selfId = selfId;
        this.peer = peer;
        this.signallingServer = signallingServer;
    }
    PeerConnection.prototype.connect = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.peer.on('signal', function (signal) {
                            console.debug(_this.selfId, 'generates signal for', _this.peer.id);
                            var msg = {
                                type: messages_1.type.SignalForPeer,
                                peer: _this.peer.id,
                                signal: signal
                            };
                            _this.signallingServer.send(msg);
                        });
                        this.peer.on('data', function (data) {
                            var msg = msgpack_lite_1.default.decode(data);
                            if (!decentralizedMessages.isPeerMessage(msg)) {
                                throw new Error("invalid message received: " + JSON.stringify(msg));
                            }
                            _this.eventEmitter.emit(msg.type.toString(), msg);
                        });
                        this.peer.on('close', function () { return console.warn('peer', _this.peer.id, 'closed connection'); });
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.peer.on('connect', function () {
                                    console.debug('connected new peer', _this.peer.id);
                                    resolve();
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PeerConnection.prototype.signal = function (signal) {
        this.peer.signal(signal);
    };
    PeerConnection.prototype.on = function (type, handler) {
        this.eventEmitter.on(type.toString(), handler);
    };
    PeerConnection.prototype.once = function (type, handler) {
        this.eventEmitter.once(type.toString(), handler);
    };
    PeerConnection.prototype.send = function (msg) {
        if (!decentralizedMessages.isPeerMessage(msg)) {
            throw new Error("can't send this type of message: " + JSON.stringify(msg));
        }
        this.peer.send(msgpack_lite_1.default.encode(msg));
    };
    PeerConnection.prototype.disconnect = function () {
        this.peer.destroy();
    };
    return PeerConnection;
}());
exports.PeerConnection = PeerConnection;
var WebSocketServer = /** @class */ (function () {
    function WebSocketServer(socket, eventEmitter, validateReceived, validateSent) {
        this.socket = socket;
        this.eventEmitter = eventEmitter;
        this.validateReceived = validateReceived;
        this.validateSent = validateSent;
    }
    WebSocketServer.connect = function (url, validateReceived, validateSent) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var WS, ws, emitter, server;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        WS = typeof window !== 'undefined' ? window.WebSocket : isomorphic_ws_1.default.WebSocket;
                        ws = new WS(url);
                        ws.binaryType = 'arraybuffer';
                        emitter = new events_1.EventEmitter();
                        server = new WebSocketServer(ws, emitter, validateReceived, validateSent);
                        ws.onmessage = function (event) {
                            if (!(event.data instanceof ArrayBuffer)) {
                                throw new Error('server did not send an ArrayBuffer');
                            }
                            var msg = msgpack_lite_1.default.decode(new Uint8Array(event.data));
                            // Validate message format
                            if (validateReceived && !validateReceived(msg)) {
                                throw new Error("invalid message received: " + JSON.stringify(msg));
                            }
                            emitter.emit(msg.type.toString(), msg);
                        };
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                ws.onerror = function (err) {
                                    return reject(new Error("connecting server: " + err.message));
                                }; // eslint-disable-line @typescript-eslint/restrict-template-expressions
                                ws.onopen = function () { return resolve(server); };
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WebSocketServer.prototype.disconnect = function () {
        this.socket.close();
    };
    // Not straigtforward way of making sure the handler take the correct message type as a parameter, for typesafety
    WebSocketServer.prototype.on = function (type, handler) {
        this.eventEmitter.on(type.toString(), handler);
    };
    WebSocketServer.prototype.once = function (type, handler) {
        this.eventEmitter.once(type.toString(), handler);
    };
    WebSocketServer.prototype.send = function (msg) {
        if (this.validateSent && !this.validateSent(msg)) {
            throw new Error("can't send this type of message: " + JSON.stringify(msg));
        }
        this.socket.send(msgpack_lite_1.default.encode(msg));
    };
    return WebSocketServer;
}());
exports.WebSocketServer = WebSocketServer;
