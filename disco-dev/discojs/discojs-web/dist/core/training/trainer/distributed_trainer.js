"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributedTrainer = void 0;
var tslib_1 = require("tslib");
var __1 = require("../..");
var trainer_1 = require("./trainer");
/**
 * Class whose role is to train a model in a distributed way with a given dataset.
 */
var DistributedTrainer = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(DistributedTrainer, _super);
    /** DistributedTrainer constructor, accepts same arguments as Trainer and in additional also a client who takes care of communicating weights.
     */
    function DistributedTrainer(task, trainingInformant, memory, model, previousRoundModel, client) {
        var _this = _super.call(this, task, trainingInformant, memory, model) || this;
        _this.previousRoundModel = previousRoundModel;
        _this.client = client;
        return _this;
    }
    /**
     * Callback called every time a round is over
     */
    DistributedTrainer.prototype.onRoundEnd = function (accuracy) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var currentRoundWeights, previousRoundWeights, aggregatedWeights;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentRoundWeights = __1.WeightsContainer.from(this.model);
                        previousRoundWeights = __1.WeightsContainer.from(this.previousRoundModel);
                        return [4 /*yield*/, this.client.onRoundEndCommunication(currentRoundWeights, previousRoundWeights, this.roundTracker.round, this.trainingInformant)];
                    case 1:
                        aggregatedWeights = _a.sent();
                        this.previousRoundModel.setWeights(currentRoundWeights.weights);
                        this.model.setWeights(aggregatedWeights.weights);
                        return [4 /*yield*/, this.memory.updateWorkingModel({ taskID: this.task.taskID, name: this.trainingInformation.modelID }, this.model)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // if it is undefined, will training continue? we hope yes
    /**
     * Callback called once training is over
     */
    DistributedTrainer.prototype.onTrainEnd = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.onTrainEndCommunication(__1.WeightsContainer.from(this.model), this.trainingInformant)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype.onTrainEnd.call(this)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DistributedTrainer;
}(trainer_1.Trainer));
exports.DistributedTrainer = DistributedTrainer;
