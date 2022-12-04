"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var immutable_1 = require("immutable");
var graph_informant_1 = require("../graph_informant");
var Base = /** @class */ (function () {
    function Base(task, nbrMessagesToShow) {
        if (nbrMessagesToShow === void 0) { nbrMessagesToShow = 10; }
        this.task = task;
        this.nbrMessagesToShow = nbrMessagesToShow;
        // written feedback
        this.messages = (0, immutable_1.List)();
        // graph feedback
        this.trainingGraphInformant = new graph_informant_1.GraphInformant();
        this.validationGraphInformant = new graph_informant_1.GraphInformant();
        // statistics
        this.currentRound = 0;
        this.currentNumberOfParticipants = 0;
        this.totalNumberOfParticipants = 0;
        this.averageNumberOfParticipants = 0;
    }
    Base.prototype.addMessage = function (msg) {
        if (this.messages.size >= this.nbrMessagesToShow) {
            this.messages = this.messages.shift();
        }
        this.messages = this.messages.push(msg);
    };
    Base.prototype.getMessages = function () {
        return this.messages.toArray();
    };
    Base.prototype.round = function () {
        return this.currentRound;
    };
    Base.prototype.participants = function () {
        return this.currentNumberOfParticipants;
    };
    Base.prototype.totalParticipants = function () {
        return this.totalNumberOfParticipants;
    };
    Base.prototype.averageParticipants = function () {
        return this.averageNumberOfParticipants;
    };
    Base.prototype.updateTrainingGraph = function (accuracy) {
        this.trainingGraphInformant.updateAccuracy(accuracy);
    };
    Base.prototype.updateValidationGraph = function (accuracy) {
        this.validationGraphInformant.updateAccuracy(accuracy);
    };
    Base.prototype.trainingAccuracy = function () {
        return this.trainingGraphInformant.accuracy();
    };
    Base.prototype.validationAccuracy = function () {
        return this.validationGraphInformant.accuracy();
    };
    Base.prototype.trainingAccuracyData = function () {
        return this.trainingGraphInformant.data();
    };
    Base.prototype.validationAccuracyData = function () {
        return this.validationGraphInformant.data();
    };
    Base.prototype.isDecentralized = function () {
        return false;
    };
    Base.prototype.isFederated = function () {
        return false;
    };
    Base.isTrainingInformant = function (raw) {
        if (typeof raw !== 'object') {
            return false;
        }
        if (raw === null) {
            return false;
        }
        // TODO
        var requiredFields = (0, immutable_1.Set)();
        if (!(requiredFields.every(function (field) { return field in raw; }))) {
            return false;
        }
        return true;
    };
    return Base;
}());
exports.Base = Base;
