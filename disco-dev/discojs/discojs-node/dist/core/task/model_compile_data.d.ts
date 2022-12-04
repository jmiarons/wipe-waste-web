export declare function isModelCompileData(raw: unknown): raw is ModelCompileData;
export interface ModelCompileData {
    optimizer: string;
    loss: string;
    metrics: string[];
}
