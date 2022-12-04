"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSummary = void 0;
function isSummary(raw) {
    if (typeof raw !== 'object') {
        return false;
    }
    if (raw === null) {
        return false;
    }
    var _a = raw, preview = _a.preview, overview = _a.overview;
    if (!(typeof preview === 'string' && typeof overview === 'string')) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var _ = { preview: preview, overview: overview };
    return true;
}
exports.isSummary = isSummary;
