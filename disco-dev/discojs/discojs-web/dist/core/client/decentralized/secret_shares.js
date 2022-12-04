"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAllShares = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var crypto = (0, tslib_1.__importStar)(require("crypto"));
var __1 = require("../..");
var maxSeed = Math.pow(2, 47);
/*
Return Weights in the remaining share once N-1 shares have been constructed (where N is number of ready clients)
 */
function lastShare(currentShares, secret) {
    if (currentShares.size === 0) {
        throw new Error('Need at least one current share to be able to subtract secret from');
    }
    return secret.sub(__1.aggregation.sum(currentShares));
}
/*
Generate N additive shares that aggregate to the secret weights array (where N is number of ready clients)
 */
function generateAllShares(secret, nParticipants, maxShareValue) {
    if (nParticipants < 1) {
        throw new Error('too few participants to genreate shares');
    }
    var randomShares = (0, immutable_1.Range)(0, nParticipants - 1)
        .map(function () { return generateRandomShare(secret, maxShareValue); })
        .toList();
    return randomShares
        .push(lastShare(randomShares, secret));
}
exports.generateAllShares = generateAllShares;
/*
generates one share in the same shape as the secret that is populated with values randomly chosend from
a uniform distribution between (-maxShareValue, maxShareValue).
 */
function generateRandomShare(secret, maxShareValue) {
    var seed = crypto.randomInt(maxSeed);
    return secret.map(function (t) { return __1.tf.randomUniform(t.shape, -maxShareValue, maxShareValue, 'float32', seed); });
}
