import { SignalData } from 'simple-peer';
import { weights } from '../../serialization';
import { PeerID as PeerIDType } from './types';
import { type, clientConnected } from '../messages';
export interface PeerID {
    type: type.PeerID;
    id: PeerIDType;
}
export interface SignalForPeer {
    type: type.SignalForPeer;
    peer: PeerIDType;
    signal: SignalData;
}
export interface PeerIsReady {
    type: type.PeerIsReady;
}
export interface PeersForRound {
    type: type.PeersForRound;
    peers: PeerIDType[];
}
export interface Weights {
    type: type.Weights;
    peer: PeerIDType;
    weights: weights.Encoded;
}
export interface Shares {
    type: type.Shares;
    peer: PeerIDType;
    weights: weights.Encoded;
}
export interface PartialSums {
    type: type.PartialSums;
    peer: PeerIDType;
    partials: weights.Encoded;
}
export declare type MessageFromServer = PeerID | SignalForPeer | PeersForRound;
export declare type MessageToServer = clientConnected | SignalForPeer | PeerIsReady;
export declare type PeerMessage = Weights | Shares | PartialSums;
export declare function isMessageFromServer(o: unknown): o is MessageFromServer;
export declare function isMessageToServer(o: unknown): o is MessageToServer;
export declare function isPeerMessage(o: unknown): o is PeerMessage;
