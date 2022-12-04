"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDataExample = void 0;
var immutable_1 = require("immutable");
function isDataExample(raw) {
    if (typeof raw !== 'object') {
        return false;
    }
    if (raw === null) {
        return false;
    }
    if (!(0, immutable_1.Set)(Object.keys(raw)).equals(immutable_1.Set.of('columnName', 'columnData'))) {
        return false;
    }
    var _a = raw, columnName = _a.columnName, columnData = _a.columnData;
    if (typeof columnName !== 'string' ||
        (typeof columnData !== 'string' && typeof columnData !== 'number')) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var _ = { columnName: columnName, columnData: columnData };
    return true;
}
exports.isDataExample = isDataExample;
