"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalInformant = void 0;
var tslib_1 = require("tslib");
var _1 = require(".");
var LocalInformant = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(LocalInformant, _super);
    function LocalInformant(task, nbrMessagesToShow) {
        var _this = _super.call(this, task, nbrMessagesToShow) || this;
        _this.currentNumberOfParticipants = 1;
        _this.averageNumberOfParticipants = 1;
        _this.totalNumberOfParticipants = 1;
        return _this;
    }
    LocalInformant.prototype.update = function (statistics) {
        this.currentRound = statistics.currentRound;
    };
    return LocalInformant;
}(_1.Base));
exports.LocalInformant = LocalInformant;
