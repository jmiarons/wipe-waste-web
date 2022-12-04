import { Map } from 'immutable';
import { tf } from '..';
import { Task, TaskID } from './task';
export declare function pushTask(url: URL, task: Task, model: tf.LayersModel): Promise<void>;
export declare function fetchTasks(url: URL): Promise<Map<TaskID, Task>>;
