import { tf } from '..';
export declare type Encoded = number[];
export declare function isEncoded(raw: unknown): raw is Encoded;
export declare function encode(model: tf.LayersModel): Promise<Encoded>;
export declare function decode(encoded: Encoded): Promise<tf.LayersModel>;
