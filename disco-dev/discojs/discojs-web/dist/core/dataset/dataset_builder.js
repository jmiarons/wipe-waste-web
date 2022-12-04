"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetBuilder = void 0;
var tslib_1 = require("tslib");
var DatasetBuilder = /** @class */ (function () {
    function DatasetBuilder(dataLoader, task) {
        this.dataLoader = dataLoader;
        this.task = task;
        this._sources = [];
        this.labelledSources = new Map();
        this.built = false;
    }
    Object.defineProperty(DatasetBuilder.prototype, "sources", {
        get: function () {
            return this._sources.length > 0 ? this._sources : Array.from(this.labelledSources.values()).flat();
        },
        enumerable: false,
        configurable: true
    });
    DatasetBuilder.prototype.addFiles = function (sources, label) {
        if (this.built) {
            this.resetBuiltState();
        }
        if (label === undefined) {
            this._sources = this._sources.concat(sources);
        }
        else {
            var currentSources = this.labelledSources.get(label);
            if (currentSources === undefined) {
                this.labelledSources.set(label, sources);
            }
            else {
                this.labelledSources.set(label, currentSources.concat(sources));
            }
        }
    };
    DatasetBuilder.prototype.clearFiles = function (label) {
        if (this.built) {
            this.resetBuiltState();
        }
        if (label === undefined) {
            this._sources = [];
        }
        else {
            this.labelledSources.delete(label);
        }
    };
    // If files are added or removed, then this should be called since the latest
    // version of the dataset_builder has not yet been built.
    DatasetBuilder.prototype.resetBuiltState = function () {
        this.built = false;
    };
    DatasetBuilder.prototype.getLabels = function () {
        // We need to duplicate the labels as we need one for each soure.
        // Say for label A we have sources [img1, img2, img3], then we
        // need labels [A, A, A].
        var labels = [];
        Array.from(this.labelledSources.values()).forEach(function (sources, index) {
            var sourcesLabels = Array.from({ length: sources.length }, function (_) { return index.toString(); });
            labels = labels.concat(sourcesLabels);
        });
        return labels.flat();
    };
    DatasetBuilder.prototype.build = function (config) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var dataTuple, defaultConfig, defaultConfig, sources;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Require that at leat one source collection is non-empty, but not both
                        if ((this._sources.length > 0) === (this.labelledSources.size > 0)) {
                            throw new Error('Please provide dataset input files');
                        }
                        if (!(this._sources.length > 0)) return [3 /*break*/, 2];
                        defaultConfig = {};
                        if (config === null || config === void 0 ? void 0 : config.inference) {
                            // Inferring model, no labels needed
                            defaultConfig = (0, tslib_1.__assign)({ features: this.task.trainingInformation.inputColumns, shuffle: false }, config);
                        }
                        else {
                            // Labels are contained in the given sources
                            defaultConfig = (0, tslib_1.__assign)({ features: this.task.trainingInformation.inputColumns, labels: this.task.trainingInformation.outputColumns, shuffle: false }, config);
                        }
                        return [4 /*yield*/, this.dataLoader.loadAll(this._sources, defaultConfig)];
                    case 1:
                        dataTuple = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        defaultConfig = (0, tslib_1.__assign)({ labels: this.getLabels(), shuffle: false }, config);
                        sources = Array.from(this.labelledSources.values()).flat();
                        return [4 /*yield*/, this.dataLoader.loadAll(sources, defaultConfig)];
                    case 3:
                        dataTuple = _a.sent();
                        _a.label = 4;
                    case 4:
                        // TODO @s314cy: Support .csv labels for image datasets (supervised training or testing)
                        this.built = true;
                        return [2 /*return*/, dataTuple];
                }
            });
        });
    };
    DatasetBuilder.prototype.isBuilt = function () {
        return this.built;
    };
    DatasetBuilder.prototype.size = function () {
        return Math.max(this._sources.length, this.labelledSources.size);
    };
    return DatasetBuilder;
}());
exports.DatasetBuilder = DatasetBuilder;
