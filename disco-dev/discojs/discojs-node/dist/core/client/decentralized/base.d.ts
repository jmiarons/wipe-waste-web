import { List, Map } from 'immutable';
import { TrainingInformant, WeightsContainer, Task } from '../..';
import { Base as ClientBase } from '../base';
import { PeerID } from './types';
import * as messages from './messages';
import { PeerConnection } from '../event_connection';
/**
 * Abstract class for decentralized clients, executes onRoundEndCommunication as well as connecting
 * to the signaling server
 */
export declare abstract class Base extends ClientBase {
    readonly url: URL;
    readonly task: Task;
    protected readonly minimumReadyPeers: number;
    private server?;
    private peers?;
    private ID?;
    private pool?;
    constructor(url: URL, task: Task);
    private waitForPeers;
    protected sendMessagetoPeer(peer: PeerConnection, msg: messages.PeerMessage): void;
    private connectServer;
    /**
     * Initialize the connection to the peers and to the other nodes.
     */
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    onTrainEndCommunication(_: WeightsContainer, trainingInformant: TrainingInformant): Promise<void>;
    onRoundEndCommunication(updatedWeights: WeightsContainer, staleWeights: WeightsContainer, round: number, trainingInformant: TrainingInformant): Promise<WeightsContainer>;
    abstract sendAndReceiveWeights(peers: Map<PeerID, PeerConnection>, noisyWeights: WeightsContainer, round: number, trainingInformant: TrainingInformant): Promise<List<WeightsContainer>>;
    abstract clientHandle(peers: Map<PeerID, PeerConnection>): void;
}
