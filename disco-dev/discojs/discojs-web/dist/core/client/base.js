"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var tslib_1 = require("tslib");
var axios_1 = (0, tslib_1.__importDefault)(require("axios"));
var __1 = require("..");
var Base = /** @class */ (function () {
    function Base(url, task) {
        this.url = url;
        this.task = task;
        this.connected = false;
    }
    Base.prototype.getLatestModel = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var url, response;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL('', this.url.href);
                        if (!url.pathname.endsWith('/')) {
                            url.pathname += '/';
                        }
                        url.pathname += "tasks/" + this.task.taskID + "/model.json";
                        return [4 /*yield*/, axios_1.default.get(url.href)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, __1.serialization.model.decode(response.data)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Base;
}());
exports.Base = Base;
