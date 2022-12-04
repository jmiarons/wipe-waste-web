"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
var tslib_1 = require("tslib");
var round_tracker_1 = require("./round_tracker");
var trainer_logger_1 = require("../../logging/trainer_logger");
/** Abstract class whose role is to train a model with a given dataset. This can be either done
 * locally (alone) or in a distributed way with collaborators. The Trainer works as follows:
 *
 * 1. Call trainModel(dataset) to start training
 * 2. Once a batch ends, onBatchEnd is triggered, which will then call onRoundEnd once the round has ended.
 *
 * The onRoundEnd needs to be implemented to specify what actions to do when the round has ended, such as a communication step with collaborators. To know when
 * a round has ended we use the roundTracker object.
 */
var Trainer = /** @class */ (function () {
    /**
     * Constructs the training manager.
     * @param task the trained task
     * @param trainingInformant the training informant
     */
    function Trainer(task, trainingInformant, memory, model) {
        this.task = task;
        this.trainingInformant = trainingInformant;
        this.memory = memory;
        this.model = model;
        this.stopTrainingRequested = false;
        this.trainerLogger = new trainer_logger_1.TrainerLogger();
        var trainingInformation = task.trainingInformation;
        if (trainingInformation === undefined) {
            throw new Error('round duration is undefined');
        }
        this.trainingInformation = trainingInformation;
        this.roundTracker = new round_tracker_1.RoundTracker(trainingInformation.roundDuration);
    }
    /** onBatchEnd callback, when a round ends, we call onRoundEnd (to be implemented for local and distributed instances)
     */
    Trainer.prototype.onBatchEnd = function (_, logs) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (logs === undefined) {
                            return [2 /*return*/];
                        }
                        this.roundTracker.updateBatch();
                        this.stopTrainModelIfRequested();
                        if (!this.roundTracker.roundHasEnded()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onRoundEnd(logs.acc)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * We update the training graph, this needs to be done on epoch end as there is no validation accuracy onBatchEnd.
     */
    Trainer.prototype.onEpochEnd = function (epoch, logs) {
        this.trainerLogger.onEpochEnd(epoch, logs);
        if (logs !== undefined && !isNaN(logs.acc) && !isNaN(logs.val_acc)) {
            this.trainingInformant.updateTrainingGraph(this.roundDecimals(logs.acc));
            this.trainingInformant.updateValidationGraph(this.roundDecimals(logs.val_acc));
        }
        else {
            this.trainerLogger.error('onEpochEnd: NaN value');
        }
    };
    /**
     * When the training ends this function will be call
     */
    Trainer.prototype.onTrainEnd = function (logs) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                this.trainingInformant.addMessage('Training finished.');
                return [2 /*return*/];
            });
        });
    };
    /**
     * Request stop training to be used from the Disco instance or any class that is taking care of the trainer.
     */
    Trainer.prototype.stopTraining = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                this.stopTrainingRequested = true;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Start training the model with the given dataset
     * @param dataset
     */
    Trainer.prototype.trainModel = function (dataset, valDataset) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.resetStopTrainerState();
                        // Assign callbacks and start training
                        return [4 /*yield*/, this.model.fitDataset(dataset, {
                                epochs: this.trainingInformation.epochs,
                                validationData: valDataset,
                                callbacks: {
                                    onEpochEnd: function (epoch, logs) { return _this.onEpochEnd(epoch, logs); },
                                    onBatchEnd: function (epoch, logs) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.onBatchEnd(epoch, logs)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    }); }); },
                                    onTrainEnd: function (logs) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.onTrainEnd(logs)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    }); }); }
                                }
                            })];
                    case 1:
                        // Assign callbacks and start training
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Format accuracy
     */
    Trainer.prototype.roundDecimals = function (accuracy, decimalsToRound) {
        if (decimalsToRound === void 0) { decimalsToRound = 2; }
        return +(accuracy * 100).toFixed(decimalsToRound);
    };
    /**
     * reset stop training state
     */
    Trainer.prototype.resetStopTrainerState = function () {
        this.model.stopTraining = false;
        this.stopTrainingRequested = false;
    };
    /**
     * If stop training is requested, do so
     */
    Trainer.prototype.stopTrainModelIfRequested = function () {
        if (this.stopTrainingRequested) {
            this.model.stopTraining = true;
            this.stopTrainingRequested = false;
        }
    };
    Trainer.prototype.getTrainerLog = function () {
        return this.trainerLogger.log;
    };
    return Trainer;
}());
exports.Trainer = Trainer;
