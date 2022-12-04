"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebTabularLoader = void 0;
var tslib_1 = require("tslib");
var __1 = require("../..");
var WebTabularLoader = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(WebTabularLoader, _super);
    function WebTabularLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebTabularLoader.prototype.loadTabularDatasetFrom = function (source, csvConfig) {
        return new __1.tf.data.CSVDataset(new __1.tf.data.FileDataSource(source), csvConfig);
    };
    return WebTabularLoader;
}(__1.data.TabularLoader));
exports.WebTabularLoader = WebTabularLoader;
