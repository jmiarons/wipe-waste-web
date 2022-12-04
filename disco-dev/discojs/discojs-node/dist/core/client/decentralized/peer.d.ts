/// <reference types="node" />
import SimplePeer, { SignalData } from 'simple-peer';
import { PeerID } from './types';
interface Events {
    'close': () => void;
    'connect': () => void;
    'signal': (signal: SignalData) => void;
    'data': (data: Buffer) => void;
}
export declare class Peer {
    readonly id: PeerID;
    private readonly peer;
    private bufferSize?;
    private sendCounter;
    private sendQueue;
    private receiving;
    constructor(id: PeerID, opts?: SimplePeer.Options);
    send(msg: Buffer): void;
    private flush;
    get maxChunkSize(): number;
    private chunk;
    destroy(): void;
    signal(signal: SimplePeer.SignalData): void;
    on<K extends keyof Events>(event: K, listener: Events[K]): void;
}
export {};
