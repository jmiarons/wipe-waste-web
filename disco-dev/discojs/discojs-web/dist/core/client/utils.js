"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = exports.MAX_WAIT_PER_ROUND = void 0;
var tslib_1 = require("tslib");
// Time to wait for the others in milliseconds.
exports.MAX_WAIT_PER_ROUND = 10000;
function timeout(ms) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return reject(new Error('timeout')); }, ms);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.timeout = timeout;
