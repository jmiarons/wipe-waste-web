"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalTrainer = void 0;
var tslib_1 = require("tslib");
var trainer_1 = require("./trainer");
/** Class whose role is to locally (alone) train a model on a given dataset, without any collaborators.
 */
var LocalTrainer = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(LocalTrainer, _super);
    function LocalTrainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Callback called every time a round is over. For local training, a round is typically an epoch
     */
    LocalTrainer.prototype.onRoundEnd = function (accuracy) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.memory.updateWorkingModel({ taskID: this.task.taskID, name: this.trainingInformation.modelID }, this.model)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalTrainer.prototype.onEpochEnd = function (epoch, logs) {
        _super.prototype.onEpochEnd.call(this, epoch, logs);
        this.trainingInformant.update({ currentRound: epoch });
    };
    return LocalTrainer;
}(trainer_1.Trainer));
exports.LocalTrainer = LocalTrainer;
