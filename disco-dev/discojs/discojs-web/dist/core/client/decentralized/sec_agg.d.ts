import { List, Map } from 'immutable';
import { Task, TrainingInformant, WeightsContainer } from '../..';
import { Base } from './base';
import { PeerID } from './types';
import { PeerConnection } from '../event_connection';
/**
 * Decentralized client that utilizes secure aggregation so client updates remain private
 */
export declare class SecAgg extends Base {
    readonly url: URL;
    readonly task: Task;
    private readonly maxShareValue;
    private receivedShares?;
    private receivedPartialSums?;
    constructor(url: URL, task: Task);
    private sendShares;
    private sendPartialSums;
    sendAndReceiveWeights(peers: Map<PeerID, PeerConnection>, noisyWeights: WeightsContainer, round: number, trainingInformant: TrainingInformant): Promise<List<WeightsContainer>>;
    private receiveShares;
    private receivePartials;
    clientHandle(peers: Map<PeerID, PeerConnection>): void;
}
