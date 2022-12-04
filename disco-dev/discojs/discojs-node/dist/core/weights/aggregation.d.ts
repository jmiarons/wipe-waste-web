import { TensorLike, WeightsContainer } from './weights_container';
declare type WeightsLike = Iterable<TensorLike>;
export declare function sum(weights: Iterable<WeightsLike | WeightsContainer>): WeightsContainer;
export declare function diff(weights: Iterable<WeightsLike | WeightsContainer>): WeightsContainer;
export declare function avg(weights: Iterable<WeightsLike | WeightsContainer>): WeightsContainer;
export declare function avgClippingWeights(peersWeights: Iterable<WeightsLike | WeightsContainer>, currentModel: WeightsContainer, tauPercentile: number): WeightsContainer;
export {};
