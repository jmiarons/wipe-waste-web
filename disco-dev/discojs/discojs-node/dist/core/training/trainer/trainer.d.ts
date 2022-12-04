import { tf, Memory, Task, TrainingInformant, TrainingInformation } from '../..';
import { RoundTracker } from './round_tracker';
import { TrainerLog } from '../../logging/trainer_logger';
/** Abstract class whose role is to train a model with a given dataset. This can be either done
 * locally (alone) or in a distributed way with collaborators. The Trainer works as follows:
 *
 * 1. Call trainModel(dataset) to start training
 * 2. Once a batch ends, onBatchEnd is triggered, which will then call onRoundEnd once the round has ended.
 *
 * The onRoundEnd needs to be implemented to specify what actions to do when the round has ended, such as a communication step with collaborators. To know when
 * a round has ended we use the roundTracker object.
 */
export declare abstract class Trainer {
    readonly task: Task;
    readonly trainingInformant: TrainingInformant;
    readonly memory: Memory;
    readonly model: tf.LayersModel;
    readonly trainingInformation: TrainingInformation;
    readonly roundTracker: RoundTracker;
    private stopTrainingRequested;
    private readonly trainerLogger;
    /**
     * Constructs the training manager.
     * @param task the trained task
     * @param trainingInformant the training informant
     */
    constructor(task: Task, trainingInformant: TrainingInformant, memory: Memory, model: tf.LayersModel);
    /**
     * Every time a round ends this function will be called
     */
    protected abstract onRoundEnd(accuracy: number): Promise<void>;
    /** onBatchEnd callback, when a round ends, we call onRoundEnd (to be implemented for local and distributed instances)
     */
    protected onBatchEnd(_: number, logs?: tf.Logs): Promise<void>;
    /**
     * We update the training graph, this needs to be done on epoch end as there is no validation accuracy onBatchEnd.
     */
    protected onEpochEnd(epoch: number, logs?: tf.Logs): void;
    /**
     * When the training ends this function will be call
     */
    protected onTrainEnd(logs?: tf.Logs): Promise<void>;
    /**
     * Request stop training to be used from the Disco instance or any class that is taking care of the trainer.
     */
    stopTraining(): Promise<void>;
    /**
     * Start training the model with the given dataset
     * @param dataset
     */
    trainModel(dataset: tf.data.Dataset<tf.TensorContainer>, valDataset: tf.data.Dataset<tf.TensorContainer>): Promise<void>;
    /**
     * Format accuracy
     */
    protected roundDecimals(accuracy: number, decimalsToRound?: number): number;
    /**
     * reset stop training state
     */
    protected resetStopTrainerState(): void;
    /**
     * If stop training is requested, do so
     */
    protected stopTrainModelIfRequested(): void;
    getTrainerLog(): TrainerLog;
}
