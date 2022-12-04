import { tf, data } from '../..';
export declare class NodeTabularLoader extends data.TabularLoader<string> {
    loadTabularDatasetFrom(source: string, csvConfig: Record<string, unknown>): tf.data.CSVDataset;
}
