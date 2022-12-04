"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPeerMessage = exports.isMessageToServer = exports.isMessageFromServer = void 0;
var serialization_1 = require("../../serialization");
var types_1 = require("./types");
var messages_1 = require("../messages");
function isMessageFromServer(o) {
    if (!(0, messages_1.hasMessageType)(o)) {
        return false;
    }
    switch (o.type) {
        case messages_1.type.PeerID:
            return 'id' in o && (0, types_1.isPeerID)(o.id);
        case messages_1.type.SignalForPeer:
            return 'peer' in o && (0, types_1.isPeerID)(o.peer) &&
                'signal' in o; // TODO check signal content?
        case messages_1.type.PeersForRound:
            return 'peers' in o && Array.isArray(o.peers) && o.peers.every(types_1.isPeerID);
    }
    return false;
}
exports.isMessageFromServer = isMessageFromServer;
function isMessageToServer(o) {
    if (!(0, messages_1.hasMessageType)(o)) {
        return false;
    }
    switch (o.type) {
        case messages_1.type.clientConnected:
            return true;
        case messages_1.type.SignalForPeer:
            return 'peer' in o && (0, types_1.isPeerID)(o.peer) &&
                'signal' in o; // TODO check signal content?
        case messages_1.type.PeerIsReady:
            return true;
    }
    return false;
}
exports.isMessageToServer = isMessageToServer;
function isPeerMessage(o) {
    if (!(0, messages_1.hasMessageType)(o)) {
        return false;
    }
    switch (o.type) {
        case messages_1.type.Weights:
        case messages_1.type.Shares:
            return 'peer' in o && (0, types_1.isPeerID)(o.peer) &&
                'weights' in o && serialization_1.weights.isEncoded(o.weights);
        case messages_1.type.PartialSums:
            return 'peer' in o && (0, types_1.isPeerID)(o.peer) &&
                'partials' in o && serialization_1.weights.isEncoded(o.partials);
    }
    return false;
}
exports.isPeerMessage = isPeerMessage;
