"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreprocessImage = exports.ImagePreprocessing = void 0;
var __1 = require("../..");
var ImagePreprocessing;
(function (ImagePreprocessing) {
    ImagePreprocessing["Normalize"] = "normalize";
    ImagePreprocessing["Resize"] = "resize";
})(ImagePreprocessing = exports.ImagePreprocessing || (exports.ImagePreprocessing = {}));
function getPreprocessImage(task) {
    var preprocessImage = function (tensorContainer) {
        var _a, _b;
        // TODO unsafe cast, tfjs does not provide the right interface
        var info = task.trainingInformation;
        var _c = tensorContainer, xs = _c.xs, ys = _c.ys;
        if ((_a = info.preprocessingFunctions) === null || _a === void 0 ? void 0 : _a.includes(ImagePreprocessing.Normalize)) {
            xs = xs.div(__1.tf.scalar(255));
        }
        if (((_b = info.preprocessingFunctions) === null || _b === void 0 ? void 0 : _b.includes(ImagePreprocessing.Resize)) &&
            info.IMAGE_H !== undefined &&
            info.IMAGE_W !== undefined) {
            xs = __1.tf.image.resizeBilinear(xs, [
                info.IMAGE_H, info.IMAGE_W
            ]);
        }
        return {
            xs: xs,
            ys: ys
        };
    };
    return preprocessImage;
}
exports.getPreprocessImage = getPreprocessImage;
