"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerPool = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var peer_1 = require("./peer");
var event_connection_1 = require("../event_connection");
// TODO cleanup old peers
var PeerPool = /** @class */ (function () {
    function PeerPool(id, wrtc) {
        this.id = id;
        this.wrtc = wrtc;
        this.peers = (0, immutable_1.Map)();
    }
    PeerPool.init = function (id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var wrtc, path, e_1;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        path = require.resolve('@koush/wrtc', { paths: ['.'] });
                        return [4 /*yield*/, Promise.resolve().then(function () { return (0, tslib_1.__importStar)(require(path)); })];
                    case 1:
                        wrtc = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, new PeerPool(id, wrtc)];
                }
            });
        });
    };
    PeerPool.prototype.shutdown = function () {
        console.debug(this.id, 'shutdown their peers');
        this.peers.forEach(function (peer) { return peer.disconnect(); });
        this.peers = (0, immutable_1.Map)();
    };
    PeerPool.prototype.signal = function (peerID, signal) {
        console.debug(this.id, 'signals for', peerID);
        var peer = this.peers.get(peerID);
        if (peer === undefined) {
            throw new Error("received signal for unknown peer: " + peerID);
        }
        peer.signal(signal);
    };
    PeerPool.prototype.getPeers = function (peersToConnect, signallingServer, 
    // TODO as event?
    clientHandle) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var newPeers, newPeersConnections;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (peersToConnect.contains(this.id)) {
                            throw new Error('peers to connect contains our id');
                        }
                        console.debug(this.id, 'is connecting peers:', peersToConnect.toJS());
                        newPeers = (0, immutable_1.Map)(peersToConnect
                            .filter(function (id) { return !_this.peers.has(id); })
                            .map(function (id) { return [id, id < _this.id]; })
                            .map(function (_a) {
                            var _b = (0, tslib_1.__read)(_a, 2), id = _b[0], initiator = _b[1];
                            var p = new peer_1.Peer(id, { initiator: initiator, wrtc: _this.wrtc });
                            // onNewPeer(id, p)
                            return [id, p];
                        }));
                        console.debug(this.id, 'asked to connect new peers:', newPeers.keySeq().toJS());
                        newPeersConnections = newPeers.map(function (peer, id) { return new event_connection_1.PeerConnection(_this.id, peer, signallingServer); });
                        // adding peers to pool before connecting them because they must be set to call signal on them
                        this.peers = this.peers.merge(newPeersConnections);
                        clientHandle(this.peers);
                        return [4 /*yield*/, Promise.all(Array.from(newPeersConnections.values()).map(function (connection) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, connection.connect()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 1:
                        _a.sent();
                        console.debug(this.id, 'knowns connected peers:', this.peers.keySeq().toJS());
                        return [2 /*return*/, this.peers
                                .filter(function (_, id) { return peersToConnect.has(id); })];
                }
            });
        });
    };
    return PeerPool;
}());
exports.PeerPool = PeerPool;
