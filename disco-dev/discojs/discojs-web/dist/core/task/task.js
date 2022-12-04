"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTask = exports.isTaskID = void 0;
var display_information_1 = require("./display_information");
var training_information_1 = require("./training_information");
var digest_1 = require("./digest");
function isTaskID(obj) {
    return typeof obj === 'string';
}
exports.isTaskID = isTaskID;
function isTask(raw) {
    if (typeof raw !== 'object') {
        return false;
    }
    if (raw === null) {
        return false;
    }
    var _a = raw, taskID = _a.taskID, digest = _a.digest, displayInformation = _a.displayInformation, trainingInformation = _a.trainingInformation;
    if (typeof taskID !== 'string') {
        return false;
    }
    if (digest !== undefined && !(0, digest_1.isDigest)(digest)) {
        return false;
    }
    if (!(0, display_information_1.isDisplayInformation)(displayInformation)) {
        return false;
    }
    if (!(0, training_information_1.isTrainingInformation)(trainingInformation)) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var _ = { taskID: taskID, displayInformation: displayInformation, trainingInformation: trainingInformation };
    return true;
}
exports.isTask = isTask;
