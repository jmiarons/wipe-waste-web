import { Client, data, Logger, Task, TrainingInformant, TrainingSchemes, Memory } from '..';
import { TrainerLog } from '../logging/trainer_logger';
interface DiscoOptions {
    client?: Client;
    url?: string | URL;
    scheme?: TrainingSchemes;
    informant?: TrainingInformant;
    logger?: Logger;
    memory?: Memory;
}
export declare class Disco {
    readonly task: Task;
    readonly logger: Logger;
    readonly memory: Memory;
    private readonly client;
    private readonly trainer;
    constructor(task: Task, options: DiscoOptions);
    fit(dataTuple: data.DataSplit): Promise<void>;
    pause(): Promise<void>;
    close(): Promise<void>;
    logs(): Promise<TrainerLog>;
}
export {};
