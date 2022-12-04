import { tf, Task } from '..';
export interface TaskProvider {
    getTask: () => Task;
    getModel: () => Promise<tf.LayersModel>;
}
export declare function isTaskProvider(obj: any): obj is TaskProvider;
