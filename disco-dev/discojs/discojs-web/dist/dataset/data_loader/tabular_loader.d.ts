import { tf, data } from '../..';
export declare class WebTabularLoader extends data.TabularLoader<File> {
    loadTabularDatasetFrom(source: File, csvConfig: Record<string, unknown>): tf.data.CSVDataset;
}
