"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModelCompileData = void 0;
function isModelCompileData(raw) {
    if (typeof raw !== 'object') {
        return false;
    }
    if (raw === null) {
        return false;
    }
    var _a = raw, optimizer = _a.optimizer, loss = _a.loss, metrics = _a.metrics;
    if (typeof optimizer !== 'string' ||
        typeof loss !== 'string') {
        return false;
    }
    if (!(Array.isArray(metrics) &&
        metrics.every(function (e) { return typeof e === 'string'; }))) {
        return false;
    }
    return true;
}
exports.isModelCompileData = isModelCompileData;
