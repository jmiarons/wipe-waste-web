import { Task } from '..';
import { DataSplit } from './data';
import { DataConfig, DataLoader } from './data_loader/data_loader';
export declare class DatasetBuilder<Source> {
    private readonly task;
    private readonly dataLoader;
    private _sources;
    private readonly labelledSources;
    private built;
    constructor(dataLoader: DataLoader<Source>, task: Task);
    get sources(): Source[];
    addFiles(sources: Source[], label?: string): void;
    clearFiles(label?: string): void;
    private resetBuiltState;
    private getLabels;
    build(config?: DataConfig): Promise<DataSplit>;
    isBuilt(): boolean;
    size(): number;
}
