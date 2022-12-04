import { Preprocessing } from '../dataset/data/preprocessing';
import { ModelCompileData } from './model_compile_data';
export declare function isTrainingInformation(raw: unknown): raw is TrainingInformation;
export interface TrainingInformation {
    modelID: string;
    epochs: number;
    roundDuration: number;
    validationSplit: number;
    batchSize: number;
    preprocessingFunctions?: Preprocessing[];
    modelCompileData: ModelCompileData;
    dataType: string;
    inputColumns?: string[];
    outputColumns?: string[];
    IMAGE_H?: number;
    IMAGE_W?: number;
    modelURL?: string;
    LABEL_LIST?: string[];
    learningRate?: number;
    scheme: string;
    noiseScale?: number;
    clippingRadius?: number;
    decentralizedSecure?: boolean;
    byzantineRobustAggregator?: boolean;
    tauPercentile?: number;
    maxShareValue?: number;
    minimumReadyPeers?: number;
}
