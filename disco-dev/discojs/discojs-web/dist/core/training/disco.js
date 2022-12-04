"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disco = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var trainer_builder_1 = require("./trainer/trainer_builder");
// Handles the training loop, server communication & provides the user with feedback.
var Disco = /** @class */ (function () {
    // client need to be connected
    function Disco(task, options) {
        if (options.scheme === undefined) {
            options.scheme = __1.TrainingSchemes[task.trainingInformation.scheme];
        }
        if (options.client === undefined) {
            if (options.url === undefined) {
                throw new Error('could not determine client from given parameters');
            }
            if (typeof options.url === 'string') {
                options.url = new URL(options.url);
            }
            switch (options.scheme) {
                case __1.TrainingSchemes.FEDERATED:
                    options.client = new __1.client.federated.Client(options.url, task);
                    break;
                case __1.TrainingSchemes.DECENTRALIZED:
                    options.client = new __1.client.federated.Client(options.url, task);
                    break;
                default:
                    options.client = new __1.client.Local(options.url, task);
                    break;
            }
        }
        if (options.informant === undefined) {
            switch (options.scheme) {
                case __1.TrainingSchemes.FEDERATED:
                    options.informant = new __1.informant.FederatedInformant(task);
                    break;
                case __1.TrainingSchemes.DECENTRALIZED:
                    options.informant = new __1.informant.DecentralizedInformant(task);
                    break;
                default:
                    options.informant = new __1.informant.LocalInformant(task);
                    break;
            }
        }
        if (options.logger === undefined) {
            options.logger = new __1.ConsoleLogger();
        }
        if (options.memory === undefined) {
            options.memory = new __1.EmptyMemory();
        }
        if (options.client.task !== task) {
            throw new Error('client not setup for given task');
        }
        if (options.informant.task.taskID !== task.taskID) {
            throw new Error('informant not setup for given task');
        }
        this.task = task;
        this.client = options.client;
        this.memory = options.memory;
        this.logger = options.logger;
        var trainerBuilder = new trainer_builder_1.TrainerBuilder(this.memory, this.task, options.informant);
        this.trainer = trainerBuilder.build(this.client, options.scheme !== __1.TrainingSchemes.LOCAL);
    }
    Disco.prototype.fit = function (dataTuple) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var trainDataset, valDataset;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.success('Thank you for your contribution. Data preprocessing has started');
                        trainDataset = dataTuple.train.batch().preprocess();
                        valDataset = dataTuple.validation !== undefined
                            ? dataTuple.validation.batch().preprocess()
                            : trainDataset;
                        return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.trainer];
                    case 2: return [4 /*yield*/, (_a.sent()).trainModel(trainDataset.dataset, valDataset.dataset)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Stops the training function. Does not disconnect the client.
    Disco.prototype.pause = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.trainer];
                    case 1: return [4 /*yield*/, (_a.sent()).stopTraining()];
                    case 2:
                        _a.sent();
                        this.logger.success('Training was successfully interrupted.');
                        return [2 /*return*/];
                }
            });
        });
    };
    Disco.prototype.close = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pause()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.client.disconnect()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Disco.prototype.logs = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.trainer];
                    case 1: return [2 /*return*/, (_a.sent()).getTrainerLog()];
                }
            });
        });
    };
    return Disco;
}());
exports.Disco = Disco;
