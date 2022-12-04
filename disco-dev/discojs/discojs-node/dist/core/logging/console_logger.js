"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
var tslib_1 = require("tslib");
var chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
var logger_1 = require("./logger");
/**
 * Same properties as Toaster but on the console
 *
 * @class Logger
 */
var ConsoleLogger = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ConsoleLogger, _super);
    function ConsoleLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Logs success message on the console (in green)
     * @param {String} message - message to be displayed
     */
    ConsoleLogger.prototype.success = function (message) {
        console.log(chalk_1.default.green(message));
    };
    /**
     * Logs error message on the console (in red)
     * @param message - message to be displayed
     */
    ConsoleLogger.prototype.error = function (message) {
        console.log(chalk_1.default.red(message));
    };
    return ConsoleLogger;
}(logger_1.Logger));
exports.ConsoleLogger = ConsoleLogger;
