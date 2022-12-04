"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncBuffer = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
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
var AsyncBuffer = /** @class */ (function () {
    function AsyncBuffer(taskID, bufferCapacity, aggregateAndStoreWeights, roundCutoff) {
        if (roundCutoff === void 0) { roundCutoff = 0; }
        this.taskID = taskID;
        this.bufferCapacity = bufferCapacity;
        this.aggregateAndStoreWeights = aggregateAndStoreWeights;
        this.roundCutoff = roundCutoff;
        this.buffer = (0, immutable_1.Map)();
        this.round = 0;
    }
    AsyncBuffer.prototype.registerObserver = function (observer) {
        this.observer = observer;
    };
    // TODO do not test private
    AsyncBuffer.prototype.bufferIsFull = function () {
        return this.buffer.size >= this.bufferCapacity;
    };
    AsyncBuffer.prototype.updateWeightsIfBufferIsFull = function () {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.bufferIsFull()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.aggregateAndStoreWeights(this.buffer.values())];
                    case 1:
                        _b.sent();
                        this.round += 1;
                        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.update();
                        this.buffer = (0, immutable_1.Map)();
                        console.log('\n************************************************************');
                        console.log("Buffer is full; Aggregating weights and starting round: " + this.round + "\n");
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // TODO do not test private
    AsyncBuffer.prototype.isNotWithinRoundCutoff = function (round) {
        // Note that always this.round >= round
        return this.round - round > this.roundCutoff;
    };
    /**
       * Add weights originating from weights of a given round.
       * Only add to buffer if the given round is not old.
       * @param weights
       * @param round
       * @returns true if weights were added, and false otherwise
       */
    AsyncBuffer.prototype.add = function (id, weights, round) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var weightsUpdatedByUser, msg;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isNotWithinRoundCutoff(round)) {
                            console.log("Did not add weights of " + id + " to buffer. Due to old round update: " + round + ", current round is " + this.round);
                            return [2 /*return*/, false];
                        }
                        weightsUpdatedByUser = this.buffer.has(id);
                        msg = weightsUpdatedByUser ? '\tUpdating' : '-> Adding new';
                        console.log(msg + " weights of " + id + " to buffer.");
                        this.buffer = this.buffer.set(id, weights);
                        return [4 /*yield*/, this.updateWeightsIfBufferIsFull()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return AsyncBuffer;
}());
exports.AsyncBuffer = AsyncBuffer;
