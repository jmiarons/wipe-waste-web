import { tf, Memory, Path, ModelInfo, ModelSource } from '..';
export declare class IndexedDB extends Memory {
    pathFor(source: ModelSource): Path;
    infoFor(source: ModelSource): ModelInfo;
    getModelMetadata(source: ModelSource): Promise<tf.io.ModelArtifactsInfo | undefined>;
    contains(source: ModelSource): Promise<boolean>;
    getModel(source: ModelSource): Promise<tf.LayersModel>;
    deleteModel(source: ModelSource): Promise<void>;
    loadModel(source: ModelSource): Promise<void>;
    /**
     * Saves the working model to the source.
     * @param source the destination
     * @param model the model
     */
    updateWorkingModel(source: ModelSource, model: tf.LayersModel): Promise<void>;
    /**
   * Creates a saved copy of the working model corresponding to the source.
   * @param source the source
   */
    saveWorkingModel(source: ModelSource): Promise<Path>;
    saveModel(source: ModelSource, model: tf.LayersModel): Promise<Path>;
    /**
   * Downloads the model corresponding to the source.
   * @param source the source
   */
    downloadModel(source: ModelSource): Promise<void>;
    latestDuplicate(source: ModelSource): Promise<number | undefined>;
    duplicateSource(source: ModelSource): Promise<ModelInfo>;
}
