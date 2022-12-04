import { Map, Set } from 'immutable';
import { SignalData } from 'simple-peer';
import { PeerID } from './types';
import { PeerConnection, EventConnection } from '../event_connection';
export declare class PeerPool {
    private readonly id;
    private readonly wrtc?;
    private peers;
    private constructor();
    static init(id: PeerID): Promise<PeerPool>;
    shutdown(): void;
    signal(peerID: PeerID, signal: SignalData): void;
    getPeers(peersToConnect: Set<PeerID>, signallingServer: EventConnection, clientHandle: (connections: Map<PeerID, PeerConnection>) => void): Promise<Map<PeerID, PeerConnection>>;
}
