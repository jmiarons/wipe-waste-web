import { tf, Client, Memory, Task, TrainingInformant } from '../..';
import { Trainer } from './trainer';
/**
 * Class whose role is to train a model in a distributed way with a given dataset.
 */
export declare class DistributedTrainer extends Trainer {
    private readonly previousRoundModel;
    private readonly client;
    /** DistributedTrainer constructor, accepts same arguments as Trainer and in additional also a client who takes care of communicating weights.
     */
    constructor(task: Task, trainingInformant: TrainingInformant, memory: Memory, model: tf.LayersModel, previousRoundModel: tf.LayersModel, client: Client);
    /**
     * Callback called every time a round is over
     */
    onRoundEnd(accuracy: number): Promise<void>;
    /**
     * Callback called once training is over
     */
    onTrainEnd(): Promise<void>;
}
