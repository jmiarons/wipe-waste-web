"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageLoader = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var __1 = require("../..");
var data_1 = require("../data");
var data_loader_1 = require("../data_loader");
/**
 * TODO @s314cy:
 * Load labels and correctly match them with their respective images, with the following constraints:
 * 1. Images are given as 1 image/1 file
 * 2. Labels are given as multiple labels/1 file, each label file can contain a different amount of labels
 */
var ImageLoader = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ImageLoader, _super);
    function ImageLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageLoader.prototype.load = function (image, config) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var tensorContainer;
            var _a;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(config === undefined || config.labels === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.readImageFrom(image)];
                    case 1:
                        tensorContainer = _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _a = {};
                        return [4 /*yield*/, this.readImageFrom(image)];
                    case 3:
                        tensorContainer = (_a.xs = _b.sent(),
                            _a.ys = config.labels[0],
                            _a);
                        _b.label = 4;
                    case 4: return [2 /*return*/, __1.tf.data.array([tensorContainer])];
                }
            });
        });
    };
    ImageLoader.prototype.buildDataset = function (images, labels, indices, config) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var dataset;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataset = __1.tf.data.generator(function () {
                            var withLabels = (config === null || config === void 0 ? void 0 : config.labels) !== undefined;
                            var index = 0;
                            var iterator = {
                                next: function () { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                                    var sample, label, value;
                                    return (0, tslib_1.__generator)(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (index === indices.length) {
                                                    return [2 /*return*/, { done: true }];
                                                }
                                                return [4 /*yield*/, this.readImageFrom(images[indices[index]])];
                                            case 1:
                                                sample = _a.sent();
                                                label = withLabels ? labels[indices[index]] : undefined;
                                                value = withLabels ? { xs: sample, ys: label } : sample;
                                                index++;
                                                return [2 /*return*/, {
                                                        value: value,
                                                        done: false
                                                    }];
                                        }
                                    });
                                }); }
                            };
                            return iterator; // Lazy
                        });
                        return [4 /*yield*/, data_1.ImageData.init(dataset, this.task, indices.length)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ImageLoader.prototype.loadAll = function (images, config) {
        var _a, _b;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var labels, indices, numberOfClasses, dataset, trainSize, trainIndices, valIndices, trainDataset, valDataset;
            return (0, tslib_1.__generator)(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        labels = [];
                        indices = (0, immutable_1.Range)(0, images.length).toArray();
                        if ((config === null || config === void 0 ? void 0 : config.labels) !== undefined) {
                            numberOfClasses = (_b = (_a = this.task.trainingInformation) === null || _a === void 0 ? void 0 : _a.LABEL_LIST) === null || _b === void 0 ? void 0 : _b.length;
                            if (numberOfClasses === undefined) {
                                throw new Error('wanted labels but none found in task');
                            }
                            labels = __1.tf.oneHot(__1.tf.tensor1d(config.labels, 'int32'), numberOfClasses).arraySync();
                        }
                        if ((config === null || config === void 0 ? void 0 : config.shuffle) === undefined || (config === null || config === void 0 ? void 0 : config.shuffle)) {
                            this.shuffle(indices);
                        }
                        if (!((config === null || config === void 0 ? void 0 : config.validationSplit) === undefined || (config === null || config === void 0 ? void 0 : config.validationSplit) === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.buildDataset(images, labels, indices, config)];
                    case 1:
                        dataset = _c.sent();
                        return [2 /*return*/, {
                                train: dataset,
                                validation: undefined
                            }];
                    case 2:
                        trainSize = Math.floor(images.length * (1 - config.validationSplit));
                        trainIndices = indices.slice(0, trainSize);
                        valIndices = indices.slice(trainSize);
                        return [4 /*yield*/, this.buildDataset(images, labels, trainIndices, config)];
                    case 3:
                        trainDataset = _c.sent();
                        return [4 /*yield*/, this.buildDataset(images, labels, valIndices, config)];
                    case 4:
                        valDataset = _c.sent();
                        return [2 /*return*/, {
                                train: trainDataset,
                                validation: valDataset
                            }];
                }
            });
        });
    };
    ImageLoader.prototype.shuffle = function (array) {
        for (var i = 0; i < array.length; i++) {
            var j = Math.floor(Math.random() * i);
            var swap = array[i];
            array[i] = array[j];
            array[j] = swap;
        }
    };
    return ImageLoader;
}(data_loader_1.DataLoader));
exports.ImageLoader = ImageLoader;
