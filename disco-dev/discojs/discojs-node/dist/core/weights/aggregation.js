"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avgClippingWeights = exports.avg = exports.diff = exports.sum = void 0;
var immutable_1 = require("immutable");
var __1 = require("..");
var weights_container_1 = require("./weights_container");
function parseWeights(weights) {
    var _a;
    var r = (0, immutable_1.List)(weights).map(function (w) {
        return w instanceof weights_container_1.WeightsContainer ? w : new weights_container_1.WeightsContainer(w);
    });
    var weightsSize = (_a = r.first()) === null || _a === void 0 ? void 0 : _a.weights.length;
    if (weightsSize === undefined) {
        throw new Error('no weights to work with');
    }
    if (r.rest().every(function (w) { return w.weights.length !== weightsSize; })) {
        throw new Error('weights dimensions are different for some of the operands');
    }
    return r;
}
function centerWeights(weights, currentModel) {
    return parseWeights(weights).map(function (model) { return model.mapWith(currentModel, __1.tf.sub); });
}
function clipWeights(modelList, normArray, tau) {
    return modelList.map(function (weights) { return weights.map(function (w, i) { return __1.tf.prod(w, Math.min(1, tau / (normArray[i]))); }); });
}
function computeQuantile(array, q) {
    var sorted = array.sort(function (a, b) { return a - b; });
    var pos = (sorted.length - 1) * q;
    var base = Math.floor(pos);
    var rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    }
    else {
        return sorted[base];
    }
}
function reduce(weights, fn) {
    return parseWeights(weights).reduce(function (acc, ws) {
        return new weights_container_1.WeightsContainer(acc.weights.map(function (w, i) {
            return fn(w, ws.get(i));
        }));
    });
}
function sum(weights) {
    return reduce(weights, __1.tf.add);
}
exports.sum = sum;
function diff(weights) {
    return reduce(weights, __1.tf.sub);
}
exports.diff = diff;
function avg(weights) {
    var size = (0, immutable_1.List)(weights).size;
    return sum(weights).map(function (ws) { return ws.div(size); });
}
exports.avg = avg;
// See: https://arxiv.org/abs/2012.10333
function avgClippingWeights(peersWeights, currentModel, tauPercentile) {
    // Computing the centered peers weights with respect to the previous model aggragation
    var centeredPeersWeights = centerWeights(peersWeights, currentModel);
    // Computing the Matrix Norm (Frobenius Norm) of the centered peers weights
    var normArray = Array.from(centeredPeersWeights.map(function (model) { return model.frobeniusNorm(); }));
    // Computing the parameter tau as third percentile with respect to the norm array
    var tau = computeQuantile(normArray, tauPercentile);
    // Computing the centered clipped peers weights given the norm array and the parameter tau
    var centeredMean = clipWeights(centeredPeersWeights, normArray, tau);
    // Aggregating all centered clipped peers weights
    return avg(centeredMean);
}
exports.avgClippingWeights = avgClippingWeights;
