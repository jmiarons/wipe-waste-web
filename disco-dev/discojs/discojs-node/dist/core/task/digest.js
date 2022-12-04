"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDigest = void 0;
function isDigest(raw) {
    if (typeof raw !== 'object') {
        return false;
    }
    if (raw === null) {
        return false;
    }
    var _a = raw, algorithm = _a.algorithm, value = _a.value;
    if (!(typeof algorithm === 'string' &&
        typeof value === 'string')) {
        return false;
    }
    return true;
}
exports.isDigest = isDigest;
