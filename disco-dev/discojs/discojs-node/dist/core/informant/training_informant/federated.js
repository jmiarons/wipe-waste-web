"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederatedInformant = void 0;
var tslib_1 = require("tslib");
var _1 = require(".");
/**
 * Class that collects information about the status of the training-loop of the model.
 */
var FederatedInformant = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(FederatedInformant, _super);
    function FederatedInformant() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayHeatmap = false;
        return _this;
    }
    /**
     * Update the server statistics with the JSON received from the server
     * For now it's just the JSON, but we might want to keep it as a dictionary
     * @param receivedStatistics statistics received from the server.
     */
    FederatedInformant.prototype.update = function (receivedStatistics) {
        this.currentRound = receivedStatistics.round;
        this.currentNumberOfParticipants = receivedStatistics.currentNumberOfParticipants;
        this.totalNumberOfParticipants = receivedStatistics.totalNumberOfParticipants;
        this.averageNumberOfParticipants = receivedStatistics.averageNumberOfParticipants;
    };
    FederatedInformant.prototype.isFederated = function () {
        return true;
    };
    return FederatedInformant;
}(_1.Base));
exports.FederatedInformant = FederatedInformant;
