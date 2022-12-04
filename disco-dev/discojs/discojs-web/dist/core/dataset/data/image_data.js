"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageData = void 0;
var tslib_1 = require("tslib");
var preprocessing_1 = require("./preprocessing");
var data_1 = require("./data");
var ImageData = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ImageData, _super);
    function ImageData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageData.init = function (dataset, task, size) {
        var _a;
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var sample, shape, e_1;
            return (0, tslib_1.__generator)(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!((_a = task.trainingInformation.preprocessingFunctions) === null || _a === void 0 ? void 0 : _a.includes(preprocessing_1.ImagePreprocessing.Resize))) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dataset.take(1).toArray()];
                    case 2:
                        sample = (_b.sent())[0];
                        // TODO: We suppose the presence of labels
                        // TODO: Typing (discojs-node/src/dataset/data_loader/image_loader.spec.ts)
                        if (!(typeof sample === 'object' && sample !== null)) {
                            throw new Error();
                        }
                        shape = void 0;
                        if ('xs' in sample && 'ys' in sample) {
                            shape = sample.xs.shape;
                        }
                        else {
                            shape = sample.shape;
                        }
                        if (!(shape[0] === task.trainingInformation.IMAGE_W &&
                            shape[1] === task.trainingInformation.IMAGE_H)) {
                            throw new Error();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        throw new Error('Data input format is not compatible with the chosen task');
                    case 4: return [2 /*return*/, new ImageData(dataset, task, size)];
                }
            });
        });
    };
    ImageData.prototype.batch = function () {
        var batchSize = this.task.trainingInformation.batchSize;
        var newDataset = batchSize === undefined ? this.dataset : this.dataset.batch(batchSize);
        return new ImageData(newDataset, this.task, this.size);
    };
    ImageData.prototype.preprocess = function () {
        var newDataset = this.dataset;
        var preprocessImage = (0, preprocessing_1.getPreprocessImage)(this.task);
        newDataset = newDataset.map(function (x) { return preprocessImage(x); });
        return new ImageData(newDataset, this.task, this.size);
    };
    return ImageData;
}(data_1.Data));
exports.ImageData = ImageData;
