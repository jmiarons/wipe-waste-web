import { tf, Weights } from '..';
export declare type TensorLike = tf.Tensor | ArrayLike<number>;
export declare class WeightsContainer {
    private readonly _weights;
    constructor(weights: Iterable<TensorLike>);
    get weights(): Weights;
    add(other: WeightsContainer): WeightsContainer;
    sub(other: WeightsContainer): WeightsContainer;
    mapWith(other: WeightsContainer, fn: (a: tf.Tensor, b: tf.Tensor) => tf.Tensor): WeightsContainer;
    map(fn: (t: tf.Tensor, i: number) => tf.Tensor): WeightsContainer;
    map(fn: (t: tf.Tensor) => tf.Tensor): WeightsContainer;
    reduce(fn: (acc: tf.Tensor, t: tf.Tensor) => tf.Tensor): tf.Tensor;
    get(index: number): tf.Tensor | undefined;
    frobeniusNorm(): number;
    static of(...weights: TensorLike[]): WeightsContainer;
    static from(model: tf.LayersModel): WeightsContainer;
    static add(a: Iterable<TensorLike>, b: Iterable<TensorLike>): WeightsContainer;
    static sub(a: Iterable<TensorLike>, b: Iterable<TensorLike>): WeightsContainer;
}
