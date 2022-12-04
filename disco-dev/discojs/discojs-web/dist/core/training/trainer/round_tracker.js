"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundTracker = void 0;
/**
 * Class that keeps track of the current batch in order for the trainer to query when round has ended.
 *
 * @remark
 * In distributed training, the client trains locally for a certain amount of epochs before sharing his weights to the server/neighbor, this
 * is what we call a round.
 *
 * The role of the RoundTracker is to keep track of when a roundHasEnded using the current batch number. The batch in the RoundTracker is cumulative whereas
 * in the onBatchEnd it is not (it resets to 0 after each epoch).
 *
 * The roundDuration is the length of a round (in batches).
 */
var RoundTracker = /** @class */ (function () {
    function RoundTracker(roundDuration) {
        this.round = 0;
        this.batch = 0;
        this.roundDuration = roundDuration;
    }
    /**
     * Update the batch number, to be called inside onBatchEnd. (We do not use batch output of onBatchEnd since it is
     * not cumulative).
     */
    RoundTracker.prototype.updateBatch = function () {
        this.batch += 1;
    };
    /**
     * Returns true if a local round has ended, false otherwise.
     *
     * @remark
     * Returns true if (batch) mod (batches per round) == 0, false otherwise
     */
    RoundTracker.prototype.roundHasEnded = function () {
        if (this.batch === 0) {
            return false;
        }
        var roundHasEnded = this.batch % this.roundDuration === 0;
        if (roundHasEnded) {
            this.round += 1;
        }
        return roundHasEnded;
    };
    return RoundTracker;
}());
exports.RoundTracker = RoundTracker;
