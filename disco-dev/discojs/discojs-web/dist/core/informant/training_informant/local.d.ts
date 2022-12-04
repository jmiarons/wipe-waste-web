import { Task } from '../../task';
import { Base } from '.';
export declare class LocalInformant extends Base {
    constructor(task: Task, nbrMessagesToShow?: number);
    update(statistics: Record<string, number>): void;
}
