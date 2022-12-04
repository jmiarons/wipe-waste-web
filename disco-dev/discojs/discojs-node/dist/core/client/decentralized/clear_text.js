"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearText = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var __1 = require("../..");
var base_1 = require("./base");
var messages_1 = require("../messages");
var event_connection_1 = require("../event_connection");
/**
 * Decentralized client that does not utilize secure aggregation, but sends model updates in clear text
 */
var ClearText = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ClearText, _super);
    function ClearText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClearText.prototype.sendAndReceiveWeights = function (peers, noisyWeights, round, trainingInformant) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var weights, ret;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.receivedWeights) {
                            throw new Error('no promise setup for receiving weights');
                        }
                        // PHASE 1 COMMUNICATION --> create weights message and send to all peers (only one phase of communication for clear_text)
                        // send weights asynchronously
                        __1.serialization.weights.encode(noisyWeights).then(function (encodedWeights) {
                            // create weights message and send to all peers
                            peers.forEach(function (peer, id) {
                                return _this.sendMessagetoPeer(peer, {
                                    type: messages_1.type.Weights,
                                    peer: id,
                                    weights: encodedWeights
                                });
                            });
                        }).catch(function () {
                            throw new Error('error while sending weights');
                        });
                        return [4 /*yield*/, this.receivedWeights];
                    case 1:
                        weights = _a.sent();
                        trainingInformant.update({
                            currentNumberOfParticipants: weights.size + 1
                        });
                        ret = weights.push(noisyWeights);
                        this.receivedWeights = undefined;
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    ClearText.prototype.receiveWeights = function (peers) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var waitWeights, receivedWeights;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.debug('beginning of receiveWeights');
                        waitWeights = Array.from(peers.values()).map(function (peer) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                            return (0, tslib_1.__generator)(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, event_connection_1.waitMessage)(peer, messages_1.type.Weights)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        receivedWeights = (0, immutable_1.List)();
                        return [4 /*yield*/, Promise.allSettled(waitWeights)];
                    case 1: return [4 /*yield*/, (_a.sent()).forEach(function (message) {
                            if (message.status === 'fulfilled') {
                                receivedWeights = receivedWeights.push(__1.serialization.weights.decode(message.value.weights));
                            }
                        })];
                    case 2:
                        _a.sent();
                        if (receivedWeights.size < peers.size) {
                            throw new Error('not enough peer weights received');
                        }
                        return [2 /*return*/, receivedWeights];
                }
            });
        });
    };
    /*
      handles received messages from signaling server
   */
    ClearText.prototype.clientHandle = function (peers) {
        this.receivedWeights = this.receiveWeights(peers);
    };
    return ClearText;
}(base_1.Base));
exports.ClearText = ClearText;
