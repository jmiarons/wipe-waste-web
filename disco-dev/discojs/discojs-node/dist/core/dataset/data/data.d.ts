import { Task } from '../..';
import { Dataset } from '../dataset';
export declare abstract class Data {
    readonly dataset: Dataset;
    readonly task: Task;
    readonly size?: number | undefined;
    protected constructor(dataset: Dataset, task: Task, size?: number | undefined);
    static init(dataset: Dataset, task: Task, size?: number): Promise<Data>;
    abstract batch(): Data;
    abstract preprocess(): Data;
}
