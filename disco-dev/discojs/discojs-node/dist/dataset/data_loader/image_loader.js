"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeImageLoader = void 0;
var tslib_1 = require("tslib");
var fs_1 = (0, tslib_1.__importDefault)(require("fs"));
var __1 = require("../..");
var NodeImageLoader = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(NodeImageLoader, _super);
    function NodeImageLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeImageLoader.prototype.readImageFrom = function (source) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, __1.tf.node.decodeImage(fs_1.default.readFileSync(source))];
            });
        });
    };
    return NodeImageLoader;
}(__1.data.ImageLoader));
exports.NodeImageLoader = NodeImageLoader;
