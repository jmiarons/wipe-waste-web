import { tf } from '..';
import { Memory, ModelInfo, Path } from './base';
export declare class Empty extends Memory {
    getModelMetadata(): Promise<undefined>;
    contains(): Promise<boolean>;
    getModel(): Promise<tf.LayersModel>;
    loadModel(): Promise<void>;
    updateWorkingModel(): Promise<void>;
    saveWorkingModel(): Promise<undefined>;
    saveModel(): Promise<undefined>;
    deleteModel(): Promise<void>;
    downloadModel(): Promise<void>;
    pathFor(): Path;
    infoFor(): ModelInfo;
    duplicateSource(): Promise<undefined>;
}
