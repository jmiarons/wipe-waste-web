"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("uuid");
var __1 = require("../..");
var base_1 = require("../base");
var messages = (0, tslib_1.__importStar)(require("./messages"));
var messages_1 = require("../messages");
var nodeUrl = (0, tslib_1.__importStar)(require("url"));
var event_connection_1 = require("../event_connection");
var utils_1 = require("../utils");
/**
 * Class that deals with communication with the centralized server when training
 * a specific task in the federated setting.
 */
var Client = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Client, _super);
    function Client() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clientID = (0, uuid_1.v4)();
        _this.round = 0;
        return _this;
    }
    Object.defineProperty(Client.prototype, "server", {
        get: function () {
            if (this._server === undefined) {
                throw new Error('server undefined, not connected');
            }
            return this._server;
        },
        enumerable: false,
        configurable: true
    });
    // It opens a new WebSocket connection and listens to new messages over the channel
    Client.prototype.connectServer = function (url) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var server;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event_connection_1.WebSocketServer.connect(url, messages.isMessageFederated, messages.isMessageFederated)];
                    case 1:
                        server = _a.sent();
                        return [2 /*return*/, server];
                }
            });
        });
    };
    /**
     * Initialize the connection to the server. TODO: In the case of FeAI,
     * should return the current server-side round for the task.
     */
    Client.prototype.connect = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var URL, serverURL, _a, msg;
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
                        serverURL.pathname += "feai/" + this.task.taskID + "/" + this.clientID;
                        _a = this;
                        return [4 /*yield*/, this.connectServer(serverURL)];
                    case 1:
                        _a._server = _b.sent();
                        msg = {
                            type: messages_1.type.clientConnected
                        };
                        this.server.send(msg);
                        return [4 /*yield*/, (0, event_connection_1.waitMessageWithTimeout)(this.server, messages_1.type.clientConnected, utils_1.MAX_WAIT_PER_ROUND)];
                    case 2:
                        _b.sent();
                        this.connected = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Disconnection process when user quits the task.
     */
    Client.prototype.disconnect = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                this.server.disconnect();
                this._server = undefined;
                this.connected = false;
                return [2 /*return*/];
            });
        });
    };
    // It sends a message to the server
    Client.prototype.sendMessage = function (msg) {
        var _a;
        (_a = this.server) === null || _a === void 0 ? void 0 : _a.send(msg);
    };
    // It sends weights to the server
    Client.prototype.postWeightsToServer = function (weights) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var msg;
            var _a;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            type: messages_1.type.postWeightsToServer
                        };
                        return [4 /*yield*/, __1.serialization.weights.encode(weights)];
                    case 1:
                        msg = (_a.weights = _b.sent(),
                            _a.round = this.round,
                            _a);
                        this.sendMessage(msg);
                        return [2 /*return*/];
                }
            });
        });
    };
    // It retrieves the last server round and weights, but return only the server round
    Client.prototype.getLatestServerRound = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var msg, received;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.serverRound = undefined;
                        this.serverWeights = undefined;
                        msg = {
                            type: messages_1.type.latestServerRound
                        };
                        this.sendMessage(msg);
                        return [4 /*yield*/, (0, event_connection_1.waitMessageWithTimeout)(this.server, messages_1.type.latestServerRound, utils_1.MAX_WAIT_PER_ROUND)];
                    case 1:
                        received = _a.sent();
                        this.serverRound = received.round;
                        this.serverWeights = __1.serialization.weights.decode(received.weights);
                        return [2 /*return*/, this.serverRound];
                }
            });
        });
    };
    // It retrieves the last server round and weights, but return only the server weights
    Client.prototype.pullRoundAndFetchWeights = function () {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0: 
                    // get server round of latest model
                    return [4 /*yield*/, this.getLatestServerRound()];
                    case 1:
                        // get server round of latest model
                        _b.sent();
                        if (this.round < ((_a = this.serverRound) !== null && _a !== void 0 ? _a : 0)) {
                            // Update the local round to match the server's
                            this.round = this.serverRound;
                            return [2 /*return*/, this.serverWeights];
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // It pulls statistics from the server
    Client.prototype.pullServerStatistics = function (trainingInformant) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var msg, received;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.receivedStatistics = undefined;
                        msg = {
                            type: messages_1.type.pullServerStatistics
                        };
                        this.sendMessage(msg);
                        return [4 /*yield*/, (0, event_connection_1.waitMessageWithTimeout)(this.server, messages_1.type.pullServerStatistics, utils_1.MAX_WAIT_PER_ROUND)];
                    case 1:
                        received = _b.sent();
                        this.receivedStatistics = received.statistics;
                        trainingInformant.update((_a = this.receivedStatistics) !== null && _a !== void 0 ? _a : {});
                        return [2 /*return*/];
                }
            });
        });
    };
    // It posts a new metadata value to the server
    Client.prototype.postMetadata = function (metadataID, metadata) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var msg;
            return (0, tslib_1.__generator)(this, function (_a) {
                msg = {
                    type: messages_1.type.postMetadata,
                    taskId: this.task.taskID,
                    clientId: this.clientID,
                    round: this.round,
                    metadataId: metadataID,
                    metadata: metadata
                };
                this.sendMessage(msg);
                return [2 /*return*/];
            });
        });
    };
    // It gets a metadata map from the server
    Client.prototype.getMetadataMap = function (metadataId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var msg, received;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.metadataMap = undefined;
                        msg = {
                            type: messages_1.type.getMetadataMap,
                            taskId: this.task.taskID,
                            clientId: this.clientID,
                            round: this.round,
                            metadataId: metadataId
                        };
                        this.sendMessage(msg);
                        return [4 /*yield*/, (0, event_connection_1.waitMessageWithTimeout)(this.server, messages_1.type.getMetadataMap, utils_1.MAX_WAIT_PER_ROUND)];
                    case 1:
                        received = _a.sent();
                        if (received.metadataMap !== undefined) {
                            this.metadataMap = new Map(received.metadataMap);
                        }
                        return [2 /*return*/, this.metadataMap];
                }
            });
        });
    };
    Client.prototype.onRoundEndCommunication = function (updatedWeights, staleWeights, _, trainingInformant) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var noisyWeights, serverWeights;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        noisyWeights = __1.privacy.addDifferentialPrivacy(updatedWeights, staleWeights, this.task);
                        return [4 /*yield*/, this.postWeightsToServer(noisyWeights)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.pullServerStatistics(trainingInformant)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.pullRoundAndFetchWeights()];
                    case 3:
                        serverWeights = _a.sent();
                        return [2 /*return*/, serverWeights !== null && serverWeights !== void 0 ? serverWeights : staleWeights];
                }
            });
        });
    };
    Client.prototype.onTrainEndCommunication = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return Client;
}(base_1.Base));
exports.Client = Client;
