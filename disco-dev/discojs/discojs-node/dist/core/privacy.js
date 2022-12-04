"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDifferentialPrivacy = void 0;
var _1 = require(".");
/**
 * Add task-parametrized Gaussian noise to and clip the weights update between the previous and current rounds.
 * The previous round's weights are the last weights pulled from server/peers.
 * The current round's weights are obtained after a single round of training, from the previous round's weights.
 * @param updatedWeights weights from the current round
 * @param staleWeights weights from the previous round
 * @param task the task
 * @returns the noised weights for the current round
 */
function addDifferentialPrivacy(updatedWeights, staleWeights, task) {
    var _a, _b;
    var noiseScale = (_a = task.trainingInformation) === null || _a === void 0 ? void 0 : _a.noiseScale;
    var clippingRadius = (_b = task.trainingInformation) === null || _b === void 0 ? void 0 : _b.clippingRadius;
    var weightsDiff = updatedWeights.sub(staleWeights);
    var newWeightsDiff;
    if (clippingRadius !== undefined) {
        // Frobenius norm
        var norm_1 = weightsDiff.frobeniusNorm();
        newWeightsDiff = weightsDiff.map(function (w) {
            var clipped = w.div(Math.max(1, norm_1 / clippingRadius));
            if (noiseScale !== undefined) {
                // Add clipping and noise
                var noise = _1.tf.randomNormal(w.shape, 0, (noiseScale * noiseScale) * (clippingRadius * clippingRadius));
                return clipped.add(noise);
            }
            else {
                // Add clipping without any noise
                return clipped;
            }
        });
    }
    else {
        if (noiseScale !== undefined) {
            // Add noise without any clipping
            newWeightsDiff = weightsDiff.map(function (w) { return _1.tf.randomNormal(w.shape, 0, (noiseScale * noiseScale)); });
        }
        else {
            return updatedWeights;
        }
    }
    return staleWeights.add(newWeightsDiff);
}
exports.addDifferentialPrivacy = addDifferentialPrivacy;
