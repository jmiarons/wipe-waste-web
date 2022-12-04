import { List, Map } from 'immutable';
import { TrainingInformant, WeightsContainer } from '../..';
import { Base } from './base';
import { PeerID } from './types';
import { PeerConnection } from '../event_connection';
/**
 * Decentralized client that does not utilize secure aggregation, but sends model updates in clear text
 */
export declare class ClearText extends Base {
    private receivedWeights?;
    sendAndReceiveWeights(peers: Map<PeerID, PeerConnection>, noisyWeights: WeightsContainer, round: number, trainingInformant: TrainingInformant): Promise<List<WeightsContainer>>;
    private receiveWeights;
    clientHandle(peers: Map<PeerID, PeerConnection>): void;
}
