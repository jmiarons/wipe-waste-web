"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMessageFederated = void 0;
var messages_1 = require("../messages");
function isMessageFederated(o) {
    if (!(0, messages_1.hasMessageType)(o)) {
        return false;
    }
    switch (o.type) {
        case messages_1.type.clientConnected:
            return true;
        case messages_1.type.postWeightsToServer:
            return true;
        case messages_1.type.latestServerRound:
            return true;
        case messages_1.type.pullServerStatistics:
            return true;
        case messages_1.type.postMetadata:
            return true;
        case messages_1.type.getMetadataMap:
            return true;
    }
    return false;
}
exports.isMessageFederated = isMessageFederated;
