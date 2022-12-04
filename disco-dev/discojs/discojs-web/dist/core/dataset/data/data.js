"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
var tslib_1 = require("tslib");
var Data = /** @class */ (function () {
    function Data(dataset, task, size) {
        this.dataset = dataset;
        this.task = task;
        this.size = size;
    }
    Data.init = function (dataset, task, size) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                throw new Error('abstract');
            });
        });
    };
    return Data;
}());
exports.Data = Data;
