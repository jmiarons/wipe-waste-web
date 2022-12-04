"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var nodeUrl = (0, tslib_1.__importStar)(require("url"));
var __1 = require("../..");
var base_1 = require("../base");
var peer_pool_1 = require("./peer_pool");
var messages = (0, tslib_1.__importStar)(require("./messages"));
var messages_1 = require("../messages");
var event_connection_1 = require("../event_connection");
var utils_1 = require("../utils");
/**
 * Abstract class for decentralized clients, executes onRoundEndCommunication as well as connecting
 * to the signaling server
 */
var Base = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Base, _super);
    function Base(url, task) {
        var _a, _b;
        var _this = _super.call(this, url, task) || this;
        _this.url = url;
        _this.task = task;
        _this.minimumReadyPeers = (_b = (_a = _this.task.trainingInformation) === null || _a === void 0 ? void 0 : _a.minimumReadyPeers) !== null && _b !== void 0 ? _b : 3;
        return _this;
    }
    // send message to server that client is ready
    Base.prototype.waitForPeers = function (round) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var msg, receivedMessage, peers, ret;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.debug(this.ID, 'is ready for round', round);
                        // clean old round
                        this.peers = undefined;
                        msg = { type: messages_1.type.PeerIsReady };
                        if (this.server === undefined) {
                            throw new Error('server undefined, could not connect peers');
                        }
                        this.server.send(msg);
                        return [4 /*yield*/, (0, event_connection_1.waitMessageWithTimeout)(this.server, messages_1.type.PeersForRound, utils_1.MAX_WAIT_PER_ROUND)];
                    case 1:
                        receivedMessage = _b.sent();
                        peers = (0, immutable_1.Set)(receivedMessage.peers);
                        if (this.ID !== undefined && peers.has(this.ID)) {
                            throw new Error('received peer list contains our own id');
                        }
                        if (this.peers !== undefined) {
                            throw new Error('got new peer list from server but was already received for this round');
                        }
                        if (peers.size + 1 < this.minimumReadyPeers) {
                            throw new Error('new peer list do not contain enough ready peers');
                        }
                        this.peers = peers;
                        console.debug(this.ID, 'got peers for round:', peers.toJS());
                        if (this.pool === undefined) {
                            throw new Error('waiting for peers but peer pool is undefined');
                        }
                        return [4 /*yield*/, this.pool];
                    case 2: return [4 /*yield*/, (_b.sent()).getPeers((0, immutable_1.Set)((_a = this.peers) !== null && _a !== void 0 ? _a : []), this.server, function (p) { return _this.clientHandle(p); })];
                    case 3:
                        ret = _b.sent();
                        console.debug(this.ID, "got peers for round " + round + ":", ret.keySeq().toJS());
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    // TODO inline? have a serialization mod
    Base.prototype.sendMessagetoPeer = function (peer, msg) {
        console.debug(this.ID, 'sends message to peer', msg.peer, msg);
        peer.send(msg);
    };
    /*
    creation of the websocket for the server, connection of client to that webSocket,
    deals with message reception from decentralized client perspective (messages received by client)
     */
    Base.prototype.connectServer = function (url) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var server;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event_connection_1.WebSocketServer.connect(url, messages.isMessageFromServer, messages.isMessageToServer)];
                    case 1:
                        server = _a.sent();
                        server.on(messages_1.type.SignalForPeer, function (event) {
                            console.debug(_this.ID, 'got signal from', event.peer);
                            if (_this.pool === undefined) {
                                throw new Error('got signal but peer pool is undefined');
                            }
                            void _this.pool.then(function (pool) { return pool.signal(event.peer, event.signal); });
                        });
                        return [2 /*return*/, server];
                }
            });
        });
    };
    /**
     * Initialize the connection to the peers and to the other nodes.
     */
    Base.prototype.connect = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var URL, serverURL, _a, msg, peerIdMsg;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        URL = typeof window !== 'undefined' ? window.URL : nodeUrl.URL;
                        serverURL = new URL('', this.url.href);
                        switch (this.url.protocol) {
                            case 'http:':
                                serverURL.protocol = 'ws:';
                                break;
                            case 'https:':
                                serverURL.protocol = 'wss:';
                                break;
                            default:
                                throw new Error("unknown protocol: " + this.url.protocol);
                        }
                        serverURL.pathname += "deai/" + this.task.taskID;
                        _a = this;
                        return [4 /*yield*/, this.connectServer(serverURL)];
                    case 1:
                        _a.server = _b.sent();
                        msg = {
                            type: messages_1.type.clientConnected
                        };
                        this.server.send(msg);
                        return [4 /*yield*/, (0, event_connection_1.waitMessage)(this.server, messages_1.type.PeerID)];
                    case 2:
                        peerIdMsg = _b.sent();
                        console.debug(peerIdMsg.id, 'got own id from server');
                        if (this.ID !== undefined) {
                            throw new Error('got ID from server but was already received');
                        }
                        this.ID = peerIdMsg.id;
                        this.pool = peer_pool_1.PeerPool.init(peerIdMsg.id);
                        this.connected = true; // Is this still needed?
                        console.debug(this.ID, 'client connected to server');
                        return [2 /*return*/];
                }
            });
        });
    };
    // disconnect from server & peers
    Base.prototype.disconnect = function () {
        var _a, _b;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.debug(this.ID, 'disconnect');
                        return [4 /*yield*/, this.pool];
                    case 1:
                        (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.shutdown();
                        this.pool = undefined;
                        (_b = this.server) === null || _b === void 0 ? void 0 : _b.disconnect();
                        this.server = undefined;
                        this.connected = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    Base.prototype.onTrainEndCommunication = function (_, trainingInformant) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                // TODO: enter seeding mode?
                trainingInformant.addMessage('Training finished.');
                return [2 /*return*/];
            });
        });
    };
    Base.prototype.onRoundEndCommunication = function (updatedWeights, staleWeights, round, trainingInformant) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var peers, noisyWeights, finalWeights, e_1, msg;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.waitForPeers(round)
                            // centralized phase of communication --> client tells server that they have finished a local round and are ready to aggregate
                            // Apply clipping and DP to updates that will be sent
                        ];
                    case 1:
                        peers = _a.sent();
                        noisyWeights = __1.privacy.addDifferentialPrivacy(updatedWeights, staleWeights, this.task);
                        return [4 /*yield*/, this.sendAndReceiveWeights(peers, noisyWeights, round, trainingInformant)];
                    case 2:
                        finalWeights = _a.sent();
                        console.debug(this.ID, 'sent and received', finalWeights.size, 'weights at round', round);
                        return [2 /*return*/, __1.aggregation.avg(finalWeights)];
                    case 3:
                        e_1 = _a.sent();
                        msg = "errored on round " + round;
                        if (e_1 instanceof Error) {
                            msg += ": " + e_1.message;
                        }
                        console.warn(this.ID, msg);
                        return [2 /*return*/, updatedWeights];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Base;
}(base_1.Base));
exports.Base = Base;
