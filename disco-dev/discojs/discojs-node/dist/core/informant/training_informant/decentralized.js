"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecentralizedInformant = void 0;
var tslib_1 = require("tslib");
var _1 = require(".");
var DecentralizedInformant = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(DecentralizedInformant, _super);
    function DecentralizedInformant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DecentralizedInformant.prototype.update = function (statistics) {
        this.currentRound += 1;
        this.currentNumberOfParticipants = statistics.currentNumberOfParticipants;
        this.totalNumberOfParticipants += this.currentNumberOfParticipants;
        this.averageNumberOfParticipants = this.totalNumberOfParticipants / this.currentRound;
    };
    DecentralizedInformant.prototype.isDecentralized = function () {
        return true;
    };
    return DecentralizedInformant;
}(_1.Base));
exports.DecentralizedInformant = DecentralizedInformant;
