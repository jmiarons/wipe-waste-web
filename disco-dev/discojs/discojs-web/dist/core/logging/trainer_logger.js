"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerLogger = exports.TrainerLog = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var __1 = require("..");
var _1 = require(".");
var TrainerLog = /** @class */ (function () {
    function TrainerLog() {
        this.epochs = (0, immutable_1.List)();
        this.trainAccuracy = (0, immutable_1.List)();
        this.validationAccuracy = (0, immutable_1.List)();
        this.loss = (0, immutable_1.List)();
    }
    TrainerLog.prototype.add = function (epoch, logs) {
        this.epochs = this.epochs.push(epoch);
        if (logs !== undefined) {
            this.trainAccuracy = this.trainAccuracy.push(logs.acc);
            this.validationAccuracy = this.validationAccuracy.push(logs.val_acc);
            this.loss = this.loss.push(logs.loss);
        }
    };
    return TrainerLog;
}());
exports.TrainerLog = TrainerLog;
/**
 *
 * @class TrainerLogger
 */
var TrainerLogger = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(TrainerLogger, _super);
    // TODO: pass savaTrainerLog as false in browser, used for benchmarking
    function TrainerLogger(saveTrainerLog) {
        if (saveTrainerLog === void 0) { saveTrainerLog = true; }
        var _this = _super.call(this) || this;
        _this.saveTrainerLog = saveTrainerLog;
        _this.log = new TrainerLog();
        return _this;
    }
    TrainerLogger.prototype.onEpochEnd = function (epoch, logs) {
        var _a, _b, _c;
        // save logs
        if (this.saveTrainerLog) {
            this.log.add(epoch, logs);
        }
        // console output
        var msg = "Epoch: " + epoch + "\nTrain: " + ((_a = logs === null || logs === void 0 ? void 0 : logs.acc) !== null && _a !== void 0 ? _a : 'undefined') + "\nValidation:" + ((_b = logs === null || logs === void 0 ? void 0 : logs.val_acc) !== null && _b !== void 0 ? _b : 'undefined') + "\nLoss:" + ((_c = logs === null || logs === void 0 ? void 0 : logs.loss) !== null && _c !== void 0 ? _c : 'undefined');
        this.success("On epoch end:\n" + msg + "\n");
    };
    /**
     *  Display ram usage
     */
    TrainerLogger.prototype.ramUsage = function () {
        this.success("Training RAM usage is  = " + __1.tf.memory().numBytes * 0.000001 + " MB");
        this.success("Number of allocated tensors  = " + __1.tf.memory().numTensors);
    };
    return TrainerLogger;
}(_1.ConsoleLogger));
exports.TrainerLogger = TrainerLogger;
