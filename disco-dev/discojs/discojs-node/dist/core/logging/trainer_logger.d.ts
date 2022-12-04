import { List } from 'immutable';
import { tf } from '..';
import { ConsoleLogger } from '.';
export declare class TrainerLog {
    epochs: List<number>;
    trainAccuracy: List<number>;
    validationAccuracy: List<number>;
    loss: List<number>;
    add(epoch: number, logs?: tf.Logs): void;
}
/**
 *
 * @class TrainerLogger
 */
export declare class TrainerLogger extends ConsoleLogger {
    readonly log: TrainerLog;
    readonly saveTrainerLog: boolean;
    constructor(saveTrainerLog?: boolean);
    onEpochEnd(epoch: number, logs?: tf.Logs): void;
    /**
     *  Display ram usage
     */
    ramUsage(): void;
}
