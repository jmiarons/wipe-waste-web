"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedDB = void 0;
var tslib_1 = require("tslib");
/**
 * Helper functions used to load and save TFJS models from IndexedDB. The
 * working model is the model currently being trained for a task. Saved models
 * are models that were explicitly saved to IndexedDB. The two working/ and saved/
 * folders are invisible to the user. The user only interacts with the saved/
 * folder via the model library. The working/ folder is only used by the backend.
 * The working model is loaded from IndexedDB for training (model.fit) only.
 */
var immutable_1 = require("immutable");
var path_1 = (0, tslib_1.__importDefault)(require("path"));
var __1 = require("..");
var IndexedDB = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(IndexedDB, _super);
    function IndexedDB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexedDB.prototype.pathFor = function (source) {
        if (typeof source === 'string') {
            return source;
        }
        if (source.type === undefined || source.taskID === undefined || source.name === undefined) {
            throw new TypeError('source incomplete');
        }
        var version = (source.version === undefined || source.version === 0)
            ? ''
            : source.version;
        return "indexeddb://" + path_1.default.join(source.type, source.taskID, source.name) + "@" + version;
    };
    IndexedDB.prototype.infoFor = function (source) {
        if (typeof source !== 'string') {
            return source;
        }
        var _a = (0, tslib_1.__read)(source.split('/').splice(2), 3), stringType = _a[0], taskID = _a[1], fullName = _a[2];
        var type = stringType === 'working' ? __1.ModelType.WORKING : __1.ModelType.SAVED;
        var _b = (0, tslib_1.__read)(fullName.split('@'), 2), name = _b[0], versionSuffix = _b[1];
        var version = versionSuffix === undefined ? 0 : Number(versionSuffix);
        return { type: type, taskID: taskID, name: name, version: version };
    };
    IndexedDB.prototype.getModelMetadata = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var models;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __1.tf.io.listModels()];
                    case 1:
                        models = _a.sent();
                        return [2 /*return*/, models[this.pathFor(source)]];
                }
            });
        });
    };
    IndexedDB.prototype.contains = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getModelMetadata(source)];
                    case 1: return [2 /*return*/, (_a.sent()) !== undefined];
                }
            });
        });
    };
    IndexedDB.prototype.getModel = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __1.tf.loadLayersModel(this.pathFor(source))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IndexedDB.prototype.deleteModel = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __1.tf.io.removeModel(this.pathFor(source))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexedDB.prototype.loadModel = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var src;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src = this.infoFor(source);
                        if (src.type === __1.ModelType.WORKING) {
                            // Model is already loaded
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, __1.tf.io.copyModel(this.pathFor(src), this.pathFor((0, tslib_1.__assign)((0, tslib_1.__assign)({}, src), { type: __1.ModelType.WORKING, version: 0 })))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Saves the working model to the source.
     * @param source the destination
     * @param model the model
     */
    IndexedDB.prototype.updateWorkingModel = function (source, model) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var src;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src = this.infoFor(source);
                        if (src.type !== undefined && src.type !== __1.ModelType.WORKING) {
                            throw new Error('expected working model');
                        }
                        // Enforce version 0 to always keep a single working model at a time
                        return [4 /*yield*/, model.save(this.pathFor((0, tslib_1.__assign)((0, tslib_1.__assign)({}, src), { type: __1.ModelType.WORKING, version: 0 })))];
                    case 1:
                        // Enforce version 0 to always keep a single working model at a time
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
   * Creates a saved copy of the working model corresponding to the source.
   * @param source the source
   */
    IndexedDB.prototype.saveWorkingModel = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var src, dst, _a;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        src = this.infoFor(source);
                        if (src.type !== undefined && src.type !== __1.ModelType.WORKING) {
                            throw new Error('expected working model');
                        }
                        _a = this.pathFor;
                        return [4 /*yield*/, this.duplicateSource((0, tslib_1.__assign)((0, tslib_1.__assign)({}, src), { type: __1.ModelType.SAVED }))];
                    case 1:
                        dst = _a.apply(this, [_b.sent()]);
                        return [4 /*yield*/, __1.tf.io.copyModel(this.pathFor((0, tslib_1.__assign)((0, tslib_1.__assign)({}, src), { type: __1.ModelType.WORKING })), dst)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, dst];
                }
            });
        });
    };
    IndexedDB.prototype.saveModel = function (source, model) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var src, dst, _a;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        src = this.infoFor(source);
                        if (src.type !== undefined && src.type !== __1.ModelType.SAVED) {
                            throw new Error('expected saved model');
                        }
                        _a = this.pathFor;
                        return [4 /*yield*/, this.duplicateSource((0, tslib_1.__assign)((0, tslib_1.__assign)({}, src), { type: __1.ModelType.SAVED }))];
                    case 1:
                        dst = _a.apply(this, [_b.sent()]);
                        return [4 /*yield*/, model.save(dst)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, dst];
                }
            });
        });
    };
    /**
   * Downloads the model corresponding to the source.
   * @param source the source
   */
    IndexedDB.prototype.downloadModel = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var src;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src = this.infoFor(source);
                        return [4 /*yield*/, __1.tf.io.copyModel(this.pathFor(source), "downloads://" + src.taskID + "_" + src.name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IndexedDB.prototype.latestDuplicate = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var paths, _a, latest;
            var _this = this;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof source !== 'string') {
                            source = this.pathFor((0, tslib_1.__assign)((0, tslib_1.__assign)({}, source), { version: 0 }));
                        }
                        _a = immutable_1.Map;
                        return [4 /*yield*/, __1.tf.io.listModels()];
                    case 1:
                        paths = _a.apply(void 0, [_b.sent()]);
                        if (!paths.has(source)) {
                            return [2 /*return*/, undefined];
                        }
                        latest = (0, immutable_1.Map)(paths)
                            .keySeq()
                            .toList()
                            .map(function (p) { return _this.infoFor(p).version; })
                            .max();
                        if (latest === undefined) {
                            return [2 /*return*/, 0];
                        }
                        return [2 /*return*/, latest];
                }
            });
        });
    };
    IndexedDB.prototype.duplicateSource = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var latestDuplicate;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.latestDuplicate(source)];
                    case 1:
                        latestDuplicate = _a.sent();
                        source = this.infoFor(source);
                        if (latestDuplicate === undefined) {
                            return [2 /*return*/, source];
                        }
                        return [2 /*return*/, (0, tslib_1.__assign)((0, tslib_1.__assign)({}, source), { version: latestDuplicate + 1 })];
                }
            });
        });
    };
    return IndexedDB;
}(__1.Memory));
exports.IndexedDB = IndexedDB;
