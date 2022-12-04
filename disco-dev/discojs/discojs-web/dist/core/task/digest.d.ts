export interface Digest {
    algorithm: string;
    value: string;
}
export declare function isDigest(raw: unknown): raw is Digest;
