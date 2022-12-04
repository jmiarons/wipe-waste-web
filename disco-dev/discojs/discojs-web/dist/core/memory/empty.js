"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empty = void 0;
var tslib_1 = require("tslib");
var base_1 = require("./base");
var Empty = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Empty, _super);
    function Empty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Empty.prototype.getModelMetadata = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    Empty.prototype.contains = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    Empty.prototype.getModel = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                throw new Error('empty');
            });
        });
    };
    Empty.prototype.loadModel = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                throw new Error('empty');
            });
        });
    };
    Empty.prototype.updateWorkingModel = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Empty.prototype.saveWorkingModel = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    Empty.prototype.saveModel = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    Empty.prototype.deleteModel = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Empty.prototype.downloadModel = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                throw new Error('empty');
            });
        });
    };
    Empty.prototype.pathFor = function () {
        throw new Error('empty');
    };
    Empty.prototype.infoFor = function () {
        throw new Error('empty');
    };
    Empty.prototype.duplicateSource = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    return Empty;
}(base_1.Memory));
exports.Empty = Empty;
