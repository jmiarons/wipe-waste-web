import * as tf from '@tensorflow/tfjs';
import { TaskID } from '..';
import { ModelType } from './model_type';
export declare type Path = string;
export interface ModelInfo {
    type?: ModelType;
    version?: number;
    taskID: TaskID;
    name: string;
}
export declare type ModelSource = ModelInfo | Path;
export declare abstract class Memory {
    abstract getModel(source: ModelSource): Promise<tf.LayersModel>;
    abstract deleteModel(source: ModelSource): Promise<void>;
    abstract loadModel(source: ModelSource): Promise<void>;
    abstract getModelMetadata(source: ModelSource): Promise<object | undefined>;
    abstract updateWorkingModel(source: ModelSource, model: tf.LayersModel): Promise<void>;
    abstract saveWorkingModel(source: ModelSource): Promise<Path | undefined>;
    abstract saveModel(source: ModelSource, model: tf.LayersModel): Promise<Path | undefined>;
    abstract downloadModel(source: ModelSource): Promise<void>;
    abstract contains(source: ModelSource): Promise<boolean>;
    abstract pathFor(source: ModelSource): Path | undefined;
    abstract infoFor(source: ModelSource): ModelInfo | undefined;
    abstract duplicateSource(source: ModelSource): Promise<ModelInfo | undefined>;
}
