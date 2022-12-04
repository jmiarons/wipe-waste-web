import { List } from 'immutable';
import { tf, data, Task, Logger, Client, Memory, ModelSource } from '..';
export declare class Validator {
    readonly task: Task;
    readonly logger: Logger;
    private readonly memory;
    private readonly source?;
    private readonly client?;
    private readonly graphInformant;
    private size;
    constructor(task: Task, logger: Logger, memory: Memory, source?: ModelSource | undefined, client?: Client | undefined);
    assess(data: data.Data): Promise<Array<{
        groundTruth: number;
        pred: number;
        features: number | number[] | number[][] | number[][][] | number[][][][] | number[][][][][];
    }>>;
    predict(data: data.Data): Promise<Array<{
        pred: number;
        features: number | number[] | number[][] | number[][][] | number[][][][] | number[][][][][];
    }>>;
    getModel(): Promise<tf.LayersModel>;
    accuracyData(): List<number>;
    accuracy(): number;
    visitedSamples(): number;
}
