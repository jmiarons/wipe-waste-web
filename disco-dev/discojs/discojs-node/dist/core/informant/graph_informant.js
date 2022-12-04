"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphInformant = void 0;
var immutable_1 = require("immutable");
var GraphInformant = /** @class */ (function () {
    function GraphInformant() {
        this.currentAccuracy = 0;
        this.accuracyDataSeries = (0, immutable_1.Repeat)(0, GraphInformant.NB_EPOCHS_ON_GRAPH).toList();
    }
    GraphInformant.prototype.updateAccuracy = function (accuracy) {
        this.accuracyDataSeries = this.accuracyDataSeries.shift().push(accuracy);
        this.currentAccuracy = accuracy;
    };
    GraphInformant.prototype.data = function () {
        return this.accuracyDataSeries;
    };
    GraphInformant.prototype.accuracy = function () {
        return this.currentAccuracy;
    };
    GraphInformant.NB_EPOCHS_ON_GRAPH = 10;
    return GraphInformant;
}());
exports.GraphInformant = GraphInformant;
