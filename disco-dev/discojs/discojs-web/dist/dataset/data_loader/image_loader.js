"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebImageLoader = void 0;
var tslib_1 = require("tslib");
var __1 = require("../..");
var WebImageLoader = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(WebImageLoader, _super);
    function WebImageLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebImageLoader.prototype.readImageFrom = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var _a, _b;
            return (0, tslib_1.__generator)(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = __1.tf.browser).fromPixels;
                        return [4 /*yield*/, createImageBitmap(source)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    return WebImageLoader;
}(__1.data.ImageLoader));
exports.WebImageLoader = WebImageLoader;
