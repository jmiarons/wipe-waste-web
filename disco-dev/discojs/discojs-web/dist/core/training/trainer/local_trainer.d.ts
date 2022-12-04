import { tf } from '../..';
import { Trainer } from './trainer';
/** Class whose role is to locally (alone) train a model on a given dataset, without any collaborators.
 */
export declare class LocalTrainer extends Trainer {
    /**
     * Callback called every time a round is over. For local training, a round is typically an epoch
     */
    onRoundEnd(accuracy: number): Promise<void>;
    protected onEpochEnd(epoch: number, logs?: tf.Logs): void;
}
