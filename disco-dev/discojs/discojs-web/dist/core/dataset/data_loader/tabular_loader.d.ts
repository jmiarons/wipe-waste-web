import { tf, Task } from '../..';
import { Dataset } from '../dataset';
import { DataSplit } from '../data';
import { DataLoader, DataConfig } from '../data_loader';
export declare abstract class TabularLoader<Source> extends DataLoader<Source> {
    private readonly delimiter;
    constructor(task: Task, delimiter: string);
    /**
     * Creates a CSV dataset object based off the given source.
     * @param source File object, URL string or local file system path.
     * @param csvConfig Object expected by TF.js to create a CSVDataset.
     * @returns The CSVDataset object built upon the given source.
     */
    abstract loadTabularDatasetFrom(source: Source, csvConfig: Record<string, unknown>): tf.data.CSVDataset;
    /**
     * Expects delimiter-separated tabular data made of N columns. The data may be
     * potentially split among several sources. Every source should contain N-1
     * feature columns and 1 single label column.
     * @param source List of File objects, URLs or file system paths.
     * @param config
     * @returns A TF.js dataset built upon read tabular data stored in the given sources.
     */
    load(source: Source, config?: DataConfig): Promise<Dataset>;
    /**
      * Creates the CSV datasets based off the given sources, then fuses them into a single CSV
      * dataset.
      */
    loadAll(sources: Source[], config: DataConfig): Promise<DataSplit>;
}
