import { Client, Task, TrainingInformant, Memory } from '../..';
import { Trainer } from './trainer';
/**
 * A class that helps build the Trainer and auxiliary classes.
 */
export declare class TrainerBuilder {
    private readonly memory;
    private readonly task;
    private readonly trainingInformant;
    constructor(memory: Memory, task: Task, trainingInformant: TrainingInformant);
    /**
     * Builds a trainer object.
     *
     * @param client client to share weights with (either distributed or federated)
     * @param distributed whether to build a distributed or local trainer
     * @returns
     */
    build(client: Client, distributed?: boolean): Promise<Trainer>;
    /**
     * If a model exists in memory, laod it, otherwise load model from server
     * @returns
     */
    private getModel;
    private updateModelInformation;
}
