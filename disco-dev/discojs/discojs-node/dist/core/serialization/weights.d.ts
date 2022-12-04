import { WeightsContainer } from '..';
export declare type Encoded = number[];
export declare function isEncoded(raw: unknown): raw is Encoded;
export declare function encode(weights: WeightsContainer): Promise<Encoded>;
export declare function decode(encoded: Encoded): WeightsContainer;
