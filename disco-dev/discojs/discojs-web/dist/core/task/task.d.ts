import { DisplayInformation } from './display_information';
import { TrainingInformation } from './training_information';
import { Digest } from './digest';
export declare type TaskID = string;
export declare function isTaskID(obj: unknown): obj is TaskID;
export declare function isTask(raw: unknown): raw is Task;
export interface Task {
    taskID: TaskID;
    digest?: Digest;
    displayInformation: DisplayInformation;
    trainingInformation: TrainingInformation;
}
