"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncInformant = void 0;
var AsyncInformant = /** @class */ (function () {
    function AsyncInformant(asyncBuffer) {
        this.asyncBuffer = asyncBuffer;
        this.round = 0;
        this.currentNumberOfParticipants = 0;
        this.totalNumberOfParticipants = 0;
        this.averageNumberOfParticipants = 0;
        this.asyncBuffer.registerObserver(this);
    }
    // Update functions
    AsyncInformant.prototype.update = function () {
        // DEBUG
        console.log('Before update');
        this.printAllInfos();
        this.updateRound();
        this.updateNumberOfParticipants();
        // DEBUG
        console.log('After update');
        this.printAllInfos();
    };
    AsyncInformant.prototype.updateRound = function () {
        this.round = this.asyncBuffer.round;
    };
    AsyncInformant.prototype.updateNumberOfParticipants = function () {
        this.currentNumberOfParticipants = this.asyncBuffer.buffer.size;
        this.updateTotalNumberOfParticipants(this.currentNumberOfParticipants);
        this.updateAverageNumberOfParticipants();
    };
    AsyncInformant.prototype.updateAverageNumberOfParticipants = function () {
        this.averageNumberOfParticipants = this.totalNumberOfParticipants / this.round;
    };
    AsyncInformant.prototype.updateTotalNumberOfParticipants = function (currentNumberOfParticipants) {
        this.totalNumberOfParticipants += currentNumberOfParticipants;
    };
    // Getter functions
    AsyncInformant.prototype.getCurrentRound = function () {
        return this.round;
    };
    AsyncInformant.prototype.getNumberOfParticipants = function () {
        return this.currentNumberOfParticipants;
    };
    AsyncInformant.prototype.getTotalNumberOfParticipants = function () {
        return this.totalNumberOfParticipants;
    };
    AsyncInformant.prototype.getAverageNumberOfParticipants = function () {
        return this.averageNumberOfParticipants;
    };
    AsyncInformant.prototype.getAllStatistics = function () {
        return {
            round: this.getCurrentRound(),
            currentNumberOfParticipants: this.getNumberOfParticipants(),
            totalNumberOfParticipants: this.getTotalNumberOfParticipants(),
            averageNumberOfParticipants: this.getAverageNumberOfParticipants()
        };
    };
    // Debug
    AsyncInformant.prototype.printAllInfos = function () {
        console.log('task : ', this.asyncBuffer.taskID);
        console.log('round : ', this.getCurrentRound());
        console.log('participants : ', this.getNumberOfParticipants());
        console.log('total : ', this.getTotalNumberOfParticipants());
        console.log('average : ', this.getAverageNumberOfParticipants());
    };
    return AsyncInformant;
}());
exports.AsyncInformant = AsyncInformant;
