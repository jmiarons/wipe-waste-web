import { Peer } from './decentralized/peer';
import { PeerID } from './decentralized/types';
import { type, NarrowMessage, Message } from './messages';
import { SignalData } from 'simple-peer';
export interface EventConnection {
    on: <K extends type>(type: K, handler: (event: NarrowMessage<K>) => void) => void;
    once: <K extends type>(type: K, handler: (event: NarrowMessage<K>) => void) => void;
    send: <T extends Message>(msg: T) => void;
    disconnect: () => void;
}
export declare function waitMessage<T extends type>(connection: EventConnection, type: T): Promise<NarrowMessage<T>>;
export declare function waitMessageWithTimeout<T extends type>(connection: EventConnection, type: T, timeoutMs: number): Promise<NarrowMessage<T>>;
export declare class PeerConnection implements EventConnection {
    private readonly selfId;
    private readonly peer;
    private readonly signallingServer;
    private readonly eventEmitter;
    constructor(selfId: PeerID, peer: Peer, signallingServer: EventConnection);
    connect(): Promise<void>;
    signal(signal: SignalData): void;
    on<K extends type>(type: K, handler: (event: NarrowMessage<K>) => void): void;
    once<K extends type>(type: K, handler: (event: NarrowMessage<K>) => void): void;
    send<T extends Message>(msg: T): void;
    disconnect(): void;
}
export declare class WebSocketServer implements EventConnection {
    private readonly socket;
    private readonly eventEmitter;
    private readonly validateReceived?;
    private readonly validateSent?;
    private constructor();
    static connect(url: URL, validateReceived?: (msg: any) => boolean, validateSent?: (msg: any) => boolean): Promise<WebSocketServer>;
    disconnect(): void;
    on<K extends type>(type: K, handler: (event: NarrowMessage<K>) => void): void;
    once<K extends type>(type: K, handler: (event: NarrowMessage<K>) => void): void;
    send(msg: Message): void;
}
