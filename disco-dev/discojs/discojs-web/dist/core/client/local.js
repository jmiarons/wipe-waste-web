"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Local = void 0;
var tslib_1 = require("tslib");
var base_1 = require("./base");
// does pretty much nothing
var Local = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Local, _super);
    function Local() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Local.prototype.connect = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    Local.prototype.disconnect = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    Local.prototype.onRoundEndCommunication = function (_) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, _];
            });
        });
    };
    Local.prototype.onTrainEndCommunication = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () { return (0, tslib_1.__generator)(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return Local;
}(base_1.Base));
exports.Local = Local;
