"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecAgg = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var __1 = require("../..");
var base_1 = require("./base");
var messages_1 = require("../messages");
var secret_shares = (0, tslib_1.__importStar)(require("./secret_shares"));
var event_connection_1 = require("../event_connection");
/**
 * Decentralized client that utilizes secure aggregation so client updates remain private
 */
var SecAgg = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(SecAgg, _super);
    function SecAgg(url, task) {
        var _a, _b;
        var _this = _super.call(this, url, task) || this;
        _this.url = url;
        _this.task = task;
        _this.maxShareValue = (_b = (_a = _this.task.trainingInformation) === null || _a === void 0 ? void 0 : _a.maxShareValue) !== null && _b !== void 0 ? _b : 100;
        return _this;
    }
    /*
    generates shares and sends to all ready peers adds differential privacy
     */
    SecAgg.prototype.sendShares = function (peers, weightShares, round, trainingInformant) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var encodedWeightShares, _a;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = immutable_1.List;
                        return [4 /*yield*/, Promise.all(weightShares.rest().map(function (weights) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, __1.serialization.weights.encode(weights)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 1:
                        encodedWeightShares = _a.apply(void 0, [_b.sent()]);
                        // Broadcast our weights to ith peer in the SERVER LIST OF PEERS (seen in signaling_server.ts)
                        peers
                            .entrySeq()
                            .toSeq()
                            .zip(encodedWeightShares)
                            .forEach(function (_a) {
                            var _b = (0, tslib_1.__read)(_a, 2), _c = (0, tslib_1.__read)(_b[0], 2), id = _c[0], peer = _c[1], weights = _b[1];
                            return _this.sendMessagetoPeer(peer, {
                                type: messages_1.type.Shares,
                                peer: id,
                                weights: weights
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
  sends partial sums to connected peers so final update can be calculated
   */
    SecAgg.prototype.sendPartialSums = function (partial, peers) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var myEncodedSum;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __1.serialization.weights.encode(partial)
                        // calculate, encode, and send sum
                    ];
                    case 1:
                        myEncodedSum = _a.sent();
                        // calculate, encode, and send sum
                        peers.forEach(function (peer, id) {
                            return _this.sendMessagetoPeer(peer, {
                                type: messages_1.type.PartialSums,
                                peer: id,
                                partials: myEncodedSum
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SecAgg.prototype.sendAndReceiveWeights = function (peers, noisyWeights, round, trainingInformant) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var weightShares, shares, mySum, partials;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.receivedShares || !this.receivedPartialSums) {
                            throw new Error('no promise setup for receiving weights');
                        }
                        weightShares = secret_shares.generateAllShares(noisyWeights, peers.size + 1, this.maxShareValue);
                        return [4 /*yield*/, this.sendShares(peers, weightShares, round, trainingInformant)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.receivedShares
                            // add own share to list
                        ];
                    case 2:
                        shares = _a.sent();
                        // add own share to list
                        shares = shares.insert(0, weightShares.first());
                        mySum = __1.aggregation.sum(shares);
                        void this.sendPartialSums(mySum, peers);
                        return [4 /*yield*/, this.receivedPartialSums];
                    case 3:
                        partials = _a.sent();
                        partials = partials.insert(0, mySum);
                        trainingInformant.update({
                            currentNumberOfParticipants: partials.size
                        });
                        // resets state
                        this.receivedPartialSums = undefined;
                        this.receivedShares = undefined;
                        return [2 /*return*/, partials];
                }
            });
        });
    };
    SecAgg.prototype.receiveShares = function (peers) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var sharesPromises, receivedShares, sharesMessages;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sharesPromises = Array.from(peers.values()).map(function (peer) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, event_connection_1.waitMessage)(peer, messages_1.type.Shares)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        receivedShares = (0, immutable_1.List)();
                        return [4 /*yield*/, Promise.all(sharesPromises)];
                    case 1:
                        sharesMessages = _a.sent();
                        sharesMessages.forEach(function (message) {
                            receivedShares = receivedShares.push(__1.serialization.weights.decode(message.weights));
                        });
                        if (receivedShares.size < peers.size) {
                            throw new Error('Not enough shares received');
                        }
                        return [2 /*return*/, receivedShares];
                }
            });
        });
    };
    SecAgg.prototype.receivePartials = function (peers) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var partialsPromises, receivedPartials, partialMessages;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        partialsPromises = Array.from(peers.values()).map(function (peer) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, event_connection_1.waitMessage)(peer, messages_1.type.PartialSums)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                        receivedPartials = (0, immutable_1.List)();
                        return [4 /*yield*/, Promise.all(partialsPromises)];
                    case 1:
                        partialMessages = _a.sent();
                        partialMessages.forEach(function (message) {
                            receivedPartials = receivedPartials.push(__1.serialization.weights.decode(message.partials));
                        });
                        if (receivedPartials.size < peers.size) {
                            throw new Error('Not enough partials received');
                        }
                        return [2 /*return*/, receivedPartials];
                }
            });
        });
    };
    /*
      handles received messages from signaling server
   */
    SecAgg.prototype.clientHandle = function (peers) {
        this.receivedShares = this.receiveShares(peers);
        this.receivedPartialSums = this.receivePartials(peers);
    };
    return SecAgg;
}(base_1.Base));
exports.SecAgg = SecAgg;
