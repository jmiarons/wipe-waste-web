import { Task } from '../..';
import { Dataset } from '../dataset';
import { Data } from './data';
export declare class TabularData extends Data {
    static init(dataset: Dataset, task: Task, size?: number): Promise<Data>;
    batch(): Data;
    preprocess(): Data;
}
