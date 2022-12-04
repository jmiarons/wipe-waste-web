import { Task, WeightsContainer } from '.';
/**
 * Add task-parametrized Gaussian noise to and clip the weights update between the previous and current rounds.
 * The previous round's weights are the last weights pulled from server/peers.
 * The current round's weights are obtained after a single round of training, from the previous round's weights.
 * @param updatedWeights weights from the current round
 * @param staleWeights weights from the previous round
 * @param task the task
 * @returns the noised weights for the current round
 */
export declare function addDifferentialPrivacy(updatedWeights: WeightsContainer, staleWeights: WeightsContainer, task: Task): WeightsContainer;
