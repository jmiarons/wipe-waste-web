"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMessageType = exports.type = void 0;
var type;
(function (type) {
    type[type["clientConnected"] = 0] = "clientConnected";
    // decentralized
    type[type["PeerID"] = 1] = "PeerID";
    type[type["SignalForPeer"] = 2] = "SignalForPeer";
    type[type["PeerIsReady"] = 3] = "PeerIsReady";
    type[type["PeersForRound"] = 4] = "PeersForRound";
    type[type["Weights"] = 5] = "Weights";
    type[type["Shares"] = 6] = "Shares";
    type[type["PartialSums"] = 7] = "PartialSums";
    // federated
    type[type["postWeightsToServer"] = 8] = "postWeightsToServer";
    type[type["postMetadata"] = 9] = "postMetadata";
    type[type["getMetadataMap"] = 10] = "getMetadataMap";
    type[type["latestServerRound"] = 11] = "latestServerRound";
    type[type["pullRoundAndFetchWeights"] = 12] = "pullRoundAndFetchWeights";
    type[type["pullServerStatistics"] = 13] = "pullServerStatistics";
})(type = exports.type || (exports.type = {}));
function hasMessageType(raw) {
    if (typeof raw !== 'object' || raw === null) {
        return false;
    }
    var o = raw;
    if (!('type' in o && typeof o.type === 'number' && o.type in type)) {
        return false;
    }
    return true;
}
exports.hasMessageType = hasMessageType;
