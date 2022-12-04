"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabularData = void 0;
var tslib_1 = require("tslib");
var data_1 = require("./data");
var TabularData = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(TabularData, _super);
    function TabularData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabularData.init = function (dataset, task, size) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var e_1;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dataset.iterator()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error('Data input format is not compatible with the chosen task');
                    case 3: return [2 /*return*/, new TabularData(dataset, task, size)];
                }
            });
        });
    };
    TabularData.prototype.batch = function () {
        var batchSize = this.task.trainingInformation.batchSize;
        var newDataset = batchSize === undefined ? this.dataset : this.dataset.batch(batchSize);
        return new TabularData(newDataset, this.task, this.size);
    };
    TabularData.prototype.preprocess = function () {
        return this;
    };
    return TabularData;
}(data_1.Data));
exports.TabularData = TabularData;
