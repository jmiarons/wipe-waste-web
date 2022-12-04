"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeTabularLoader = void 0;
var tslib_1 = require("tslib");
var __1 = require("../..");
var NodeTabularLoader = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(NodeTabularLoader, _super);
    function NodeTabularLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeTabularLoader.prototype.loadTabularDatasetFrom = function (source, csvConfig) {
        var prefix = 'file://';
        if (source.slice(0, 7) !== prefix) {
            source = prefix + source;
        }
        return __1.tf.data.csv(source, csvConfig);
    };
    return NodeTabularLoader;
}(__1.data.TabularLoader));
exports.NodeTabularLoader = NodeTabularLoader;
