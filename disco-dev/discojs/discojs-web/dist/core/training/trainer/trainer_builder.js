"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerBuilder = void 0;
var tslib_1 = require("tslib");
var __1 = require("../..");
var distributed_trainer_1 = require("./distributed_trainer");
var local_trainer_1 = require("./local_trainer");
/**
 * A class that helps build the Trainer and auxiliary classes.
 */
var TrainerBuilder = /** @class */ (function () {
    function TrainerBuilder(memory, task, trainingInformant) {
        this.memory = memory;
        this.task = task;
        this.trainingInformant = trainingInformant;
    }
    /**
     * Builds a trainer object.
     *
     * @param client client to share weights with (either distributed or federated)
     * @param distributed whether to build a distributed or local trainer
     * @returns
     */
    TrainerBuilder.prototype.build = function (client, distributed) {
        if (distributed === void 0) { distributed = false; }
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var model;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModel(client)];
                    case 1:
                        model = _a.sent();
                        if (distributed) {
                            return [2 /*return*/, new distributed_trainer_1.DistributedTrainer(this.task, this.trainingInformant, this.memory, model, model, client)];
                        }
                        else {
                            return [2 /*return*/, new local_trainer_1.LocalTrainer(this.task, this.trainingInformant, this.memory, model)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * If a model exists in memory, laod it, otherwise load model from server
     * @returns
     */
    TrainerBuilder.prototype.getModel = function (client) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var modelID, info, model;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        modelID = (_a = this.task.trainingInformation) === null || _a === void 0 ? void 0 : _a.modelID;
                        if (modelID === undefined) {
                            throw new TypeError('model ID is undefined');
                        }
                        info = { type: __1.ModelType.WORKING, taskID: this.task.taskID, name: modelID };
                        return [4 /*yield*/, this.memory.contains(info)];
                    case 1: return [4 /*yield*/, ((_b.sent()) ? this.memory.getModel(info) : client.getLatestModel())];
                    case 2:
                        model = _b.sent();
                        return [4 /*yield*/, this.updateModelInformation(model)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    TrainerBuilder.prototype.updateModelInformation = function (model) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var info;
            return (0, tslib_1.__generator)(this, function (_a) {
                // Continue local training from previous epoch checkpoint
                if (model.getUserDefinedMetadata() === undefined) {
                    model.setUserDefinedMetadata({ epoch: 0 });
                }
                info = this.task.trainingInformation;
                if (info === undefined) {
                    throw new TypeError('training information is undefined');
                }
                model.compile(info.modelCompileData);
                if (info.learningRate !== undefined) {
                    // TODO: Not the right way to change learningRate and hence we cast to any
                    // the right way is to construct the optimiser and pass learningRate via
                    // argument.
                    model.optimizer.learningRate = info.learningRate;
                }
                return [2 /*return*/, model];
            });
        });
    };
    return TrainerBuilder;
}());
exports.TrainerBuilder = TrainerBuilder;
