"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabularLoader = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var data_1 = require("../data");
var data_loader_1 = require("../data_loader");
// window size from which the dataset shuffling will sample
var BUFFER_SIZE = 1000;
var TabularLoader = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(TabularLoader, _super);
    function TabularLoader(task, delimiter) {
        var _this = _super.call(this, task) || this;
        _this.delimiter = delimiter;
        return _this;
    }
    /**
     * Expects delimiter-separated tabular data made of N columns. The data may be
     * potentially split among several sources. Every source should contain N-1
     * feature columns and 1 single label column.
     * @param source List of File objects, URLs or file system paths.
     * @param config
     * @returns A TF.js dataset built upon read tabular data stored in the given sources.
     */
    TabularLoader.prototype.load = function (source, config) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var columnConfigs, csvConfig, dataset;
            return (0, tslib_1.__generator)(this, function (_a) {
                /**
                 * Prepare the CSV config object based off the given features and labels.
                 * If labels is empty, then the returned dataset is comprised of samples only.
                 * Otherwise, each entry is of the form `{ xs, ys }` with `xs` as features and `ys`
                 * as labels.
                 */
                if ((config === null || config === void 0 ? void 0 : config.features) === undefined) {
                    // TODO @s314cy
                    throw new Error('Not implemented');
                }
                columnConfigs = (0, immutable_1.Map)((0, immutable_1.Set)(config.features).map(function (feature) { return [feature, { required: false, isLabel: false }]; })).merge((0, immutable_1.Set)(config.labels).map(function (label) { return [label, { required: true, isLabel: true }]; }));
                csvConfig = {
                    hasHeader: true,
                    columnConfigs: columnConfigs.toObject(),
                    configuredColumnsOnly: true,
                    delimiter: this.delimiter
                };
                dataset = this.loadTabularDatasetFrom(source, csvConfig).map(function (t) {
                    if (typeof t === 'object') {
                        if (('xs' in t) && ('ys' in t)) {
                            var _a = t, xs = _a.xs, ys = _a.ys;
                            return {
                                xs: Object.values(xs),
                                ys: Object.values(ys)
                            };
                        }
                        else {
                            return Object.values(t);
                        }
                    }
                    throw new TypeError('Expected TensorContainerObject');
                });
                return [2 /*return*/, ((config === null || config === void 0 ? void 0 : config.shuffle) === undefined || (config === null || config === void 0 ? void 0 : config.shuffle)) ? dataset.shuffle(BUFFER_SIZE) : dataset];
            });
        });
    };
    /**
      * Creates the CSV datasets based off the given sources, then fuses them into a single CSV
      * dataset.
      */
    TabularLoader.prototype.loadAll = function (sources, config) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var datasets, dataset, data;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(sources.map(function (source) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.load(source, (0, tslib_1.__assign)((0, tslib_1.__assign)({}, config), { shuffle: false }))];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                    case 1:
                        datasets = _a.sent();
                        dataset = (0, immutable_1.List)(datasets).reduce(function (acc, dataset) { return acc.concatenate(dataset); });
                        dataset = (config === null || config === void 0 ? void 0 : config.shuffle) ? dataset.shuffle(BUFFER_SIZE) : dataset;
                        return [4 /*yield*/, data_1.TabularData.init(dataset, this.task, 
                            // dataset.size does not work for csv datasets
                            // https://github.com/tensorflow/tfjs/issues/5845
                            undefined)
                            // TODO: Implement validation split for tabular data (tricky due to streaming)
                        ];
                    case 2:
                        data = _a.sent();
                        // TODO: Implement validation split for tabular data (tricky due to streaming)
                        return [2 /*return*/, {
                                train: data
                            }];
                }
            });
        });
    };
    return TabularLoader;
}(data_loader_1.DataLoader));
exports.TabularLoader = TabularLoader;
