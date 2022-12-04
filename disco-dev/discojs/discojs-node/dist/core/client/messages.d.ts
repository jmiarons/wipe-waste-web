import * as decentralized from './decentralized/messages';
import * as federated from './federated/messages';
export declare enum type {
    clientConnected = 0,
    PeerID = 1,
    SignalForPeer = 2,
    PeerIsReady = 3,
    PeersForRound = 4,
    Weights = 5,
    Shares = 6,
    PartialSums = 7,
    postWeightsToServer = 8,
    postMetadata = 9,
    getMetadataMap = 10,
    latestServerRound = 11,
    pullRoundAndFetchWeights = 12,
    pullServerStatistics = 13
}
export interface clientConnected {
    type: type.clientConnected;
}
export declare type Message = decentralized.MessageFromServer | decentralized.MessageToServer | decentralized.PeerMessage | federated.MessageFederated;
export declare type NarrowMessage<D> = Extract<Message, {
    type: D;
}>;
export declare function hasMessageType(raw: unknown): raw is {
    type: type;
} & Record<string, unknown>;
