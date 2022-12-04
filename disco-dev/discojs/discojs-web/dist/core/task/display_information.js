"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDisplayInformation = void 0;
var summary_1 = require("./summary");
var data_example_1 = require("./data_example");
function isDisplayInformation(raw) {
    if (typeof raw !== 'object') {
        return false;
    }
    if (raw === null) {
        return false;
    }
    var _a = raw, dataExample = _a.dataExample, dataExampleImage = _a.dataExampleImage, dataExampleText = _a.dataExampleText, dataFormatInformation = _a.dataFormatInformation, headers = _a.headers, limitations = _a.limitations, model = _a.model, summary = _a.summary, taskTitle = _a.taskTitle, tradeoffs = _a.tradeoffs;
    if (typeof taskTitle !== 'string' ||
        (dataExampleText !== undefined && typeof dataExampleText !== 'string') ||
        (dataFormatInformation !== undefined && typeof dataFormatInformation !== 'string') ||
        (tradeoffs !== undefined && typeof tradeoffs !== 'string') ||
        (model !== undefined && typeof model !== 'string') ||
        (dataExampleImage !== undefined && typeof dataExampleImage !== 'string') ||
        (limitations !== undefined && typeof limitations !== 'string')) {
        return false;
    }
    if (summary !== undefined && !(0, summary_1.isSummary)(summary)) {
        return false;
    }
    if (dataExample !== undefined && !(Array.isArray(dataExample) &&
        dataExample.every(data_example_1.isDataExample))) {
        return false;
    }
    if (headers !== undefined && !(Array.isArray(headers) &&
        headers.every(function (e) { return typeof e === 'string'; }))) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var _ = {
        taskTitle: taskTitle,
        summary: summary,
        tradeoffs: tradeoffs,
        dataFormatInformation: dataFormatInformation,
        dataExampleText: dataExampleText,
        model: model,
        dataExample: dataExample,
        headers: headers,
        dataExampleImage: dataExampleImage,
        limitations: limitations
    };
    return true;
}
exports.isDisplayInformation = isDisplayInformation;
