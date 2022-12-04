"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var __1 = require("..");
var Validator = /** @class */ (function () {
    function Validator(task, logger, memory, source, client) {
        this.task = task;
        this.logger = logger;
        this.memory = memory;
        this.source = source;
        this.client = client;
        this.graphInformant = new __1.GraphInformant();
        this.size = 0;
        if (source === undefined && client === undefined) {
            throw new Error('cannot identify model');
        }
    }
    Validator.prototype.assess = function (data) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var batchSize, model, features, groundTruth, predictions, hits;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        batchSize = (_a = this.task.trainingInformation) === null || _a === void 0 ? void 0 : _a.batchSize;
                        if (batchSize === undefined) {
                            throw new TypeError('batch size is undefined');
                        }
                        return [4 /*yield*/, this.getModel()];
                    case 1:
                        model = _b.sent();
                        features = [];
                        groundTruth = [];
                        predictions = [];
                        hits = 0;
                        return [4 /*yield*/, data.preprocess().dataset.batch(batchSize).forEachAsync(function (e) {
                                if (typeof e === 'object' && 'xs' in e && 'ys' in e) {
                                    var xs = e.xs;
                                    var ys = e.ys.argMax(1).dataSync();
                                    var pred = model.predict(xs, { batchSize: batchSize })
                                        .argMax(1)
                                        .dataSync();
                                    var currentFeatures = xs.arraySync();
                                    if (Array.isArray(currentFeatures)) {
                                        features = (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(features), false), (0, tslib_1.__read)(currentFeatures), false);
                                    }
                                    else {
                                        throw new TypeError('features array is not correct');
                                    }
                                    groundTruth.push.apply(groundTruth, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(Array.from(ys)), false));
                                    predictions.push.apply(predictions, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(Array.from(pred)), false));
                                    _this.size += xs.shape[0];
                                    hits += (0, immutable_1.List)(pred).zip((0, immutable_1.List)(ys)).filter(function (_a) {
                                        var _b = (0, tslib_1.__read)(_a, 2), p = _b[0], y = _b[1];
                                        return p === y;
                                    }).size;
                                    var currentAccuracy = hits / _this.size;
                                    _this.graphInformant.updateAccuracy(currentAccuracy);
                                }
                                else {
                                    throw new TypeError('missing feature/label in dataset');
                                }
                            })];
                    case 2:
                        _b.sent();
                        this.logger.success("Obtained validation accuracy of " + this.accuracy());
                        this.logger.success("Visited " + this.visitedSamples() + " samples");
                        return [2 /*return*/, (0, immutable_1.List)(groundTruth).zip((0, immutable_1.List)(predictions)).zip((0, immutable_1.List)(features)).map(function (_a) {
                                var _b = (0, tslib_1.__read)(_a, 2), _c = (0, tslib_1.__read)(_b[0], 2), gt = _c[0], p = _c[1], f = _b[1];
                                return ({ groundTruth: gt, pred: p, features: f });
                            }).toArray()];
                }
            });
        });
    };
    Validator.prototype.predict = function (data) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var batchSize, model, features, predictions;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        batchSize = (_a = this.task.trainingInformation) === null || _a === void 0 ? void 0 : _a.batchSize;
                        if (batchSize === undefined) {
                            throw new TypeError('batch size is undefined');
                        }
                        return [4 /*yield*/, this.getModel()];
                    case 1:
                        model = _b.sent();
                        features = [];
                        predictions = [];
                        return [4 /*yield*/, data.preprocess().dataset.batch(batchSize).forEachAsync(function (e) {
                                var currentFeatures = e.arraySync();
                                if (Array.isArray(currentFeatures)) {
                                    features = (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(features), false), (0, tslib_1.__read)(currentFeatures), false);
                                }
                                else {
                                    throw new TypeError('features array is not correct');
                                }
                                predictions.push.apply(predictions, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(Array.from(model.predict(e, { batchSize: batchSize }).argMax(1).dataSync())), false));
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, (0, immutable_1.List)(predictions).zip((0, immutable_1.List)(features)).map(function (_a) {
                                var _b = (0, tslib_1.__read)(_a, 2), p = _b[0], f = _b[1];
                                return ({ pred: p, features: f });
                            }).toArray()];
                }
            });
        });
    };
    Validator.prototype.getModel = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var _a;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.source !== undefined;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.memory.contains(this.source)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.memory.getModel(this.source)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        if (!(this.client !== undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.client.getLatestModel()];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: throw new Error('cannot identify model');
                }
            });
        });
    };
    Validator.prototype.accuracyData = function () {
        return this.graphInformant.data();
    };
    Validator.prototype.accuracy = function () {
        return this.graphInformant.accuracy();
    };
    Validator.prototype.visitedSamples = function () {
        return this.size;
    };
    return Validator;
}());
exports.Validator = Validator;
