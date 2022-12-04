"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTasks = exports.pushTask = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var axios_1 = (0, tslib_1.__importDefault)(require("axios"));
var __1 = require("..");
var task_1 = require("./task");
var TASK_ENDPOINT = 'tasks';
function pushTask(url, task, model) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        var _a, _b, _c;
        var _d;
        return (0, tslib_1.__generator)(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = axios_1.default).post;
                    _c = [url.href + TASK_ENDPOINT];
                    _d = {
                        task: task
                    };
                    return [4 /*yield*/, __1.serialization.model.encode(model)];
                case 1:
                    _d.model = _e.sent();
                    return [4 /*yield*/, __1.serialization.weights.encode(__1.WeightsContainer.from(model))];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.weights = _e.sent(),
                            _d)]))];
                case 3:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.pushTask = pushTask;
function fetchTasks(url) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        var response, tasks;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(url.href + TASK_ENDPOINT)];
                case 1:
                    response = _a.sent();
                    tasks = response.data;
                    if (!Array.isArray(tasks) || !tasks.every(task_1.isTask)) {
                        throw new Error('invalid tasks response');
                    }
                    return [2 /*return*/, (0, immutable_1.Map)(tasks.map(function (t) { return [t.taskID, t]; }))];
            }
        });
    });
}
exports.fetchTasks = fetchTasks;
