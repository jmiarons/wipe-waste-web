import { Map } from 'immutable';
import { TaskID, AsyncInformant } from '.';
/**
 * The AsyncWeightsBuffer class holds and manipulates information about the
 * async weights buffer. It works as follows:
 *
 * Setup: Init round to zero and create empty buffer (a map from user id to weights)
 *
 * - When a user adds weights only do so when they are recent weights: i.e. this.round - round <= roundCutoff.
 * - If a user already added weights, update them. (-> there can be at most one entry of weights per id in a buffer).
 * - When the buffer is full, call aggregateAndStoreWeights with the weights in the buffer and then increment round by one  and reset the buffer.
 *
 * @remarks
 * taskID: corresponds to the task that weights correspond to.
 * bufferCapacity: size of the buffer.
 * buffer: holds a map of users to their added weights.
 * round: the latest round of the weight buffer.
 * roundCutoff: cutoff for accepted rounds.
 */
export declare class AsyncBuffer<T> {
    readonly taskID: TaskID;
    private readonly bufferCapacity;
    private readonly aggregateAndStoreWeights;
    private readonly roundCutoff;
    buffer: Map<string, T>;
    round: number;
    private observer;
    constructor(taskID: TaskID, bufferCapacity: number, aggregateAndStoreWeights: (weights: Iterable<T>) => Promise<void>, roundCutoff?: number);
    registerObserver(observer: AsyncInformant<T>): void;
    bufferIsFull(): boolean;
    private updateWeightsIfBufferIsFull;
    isNotWithinRoundCutoff(round: number): boolean;
    /**
       * Add weights originating from weights of a given round.
       * Only add to buffer if the given round is not old.
       * @param weights
       * @param round
       * @returns true if weights were added, and false otherwise
       */
    add(id: string, weights: T, round: number): Promise<boolean>;
}
