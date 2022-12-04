import { tf, WeightsContainer, Task, TrainingInformant } from '..';
export declare abstract class Base {
    readonly url: URL;
    readonly task: Task;
    protected connected: boolean;
    constructor(url: URL, task: Task);
    /**
     * Handles the connection process from the client to any sort of
     * centralized server.
     */
    abstract connect(): Promise<void>;
    /**
     * Handles the disconnection process of the client from any sort
     * of centralized server.
     */
    abstract disconnect(): Promise<void>;
    getLatestModel(): Promise<tf.LayersModel>;
    /**
     * The training manager matches this function with the training loop's
     * onTrainEnd callback when training a TFJS model object. See the
     * training manager for more details.
     */
    abstract onTrainEndCommunication(weights: WeightsContainer, trainingInformant: TrainingInformant): Promise<void>;
    /**
     * This function will be called whenever a local round has ended.
     *
     * @param updatedWeights
     * @param staleWeights
     * @param round
     * @param trainingInformant
     */
    abstract onRoundEndCommunication(updatedWeights: WeightsContainer, staleWeights: WeightsContainer, round: number, trainingInformant: TrainingInformant): Promise<WeightsContainer>;
}
