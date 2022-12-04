"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerLog = exports.ConsoleLogger = exports.Logger = void 0;
var logger_1 = require("./logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logger_1.Logger; } });
var console_logger_1 = require("./console_logger");
Object.defineProperty(exports, "ConsoleLogger", { enumerable: true, get: function () { return console_logger_1.ConsoleLogger; } });
var trainer_logger_1 = require("./trainer_logger");
Object.defineProperty(exports, "TrainerLog", { enumerable: true, get: function () { return trainer_logger_1.TrainerLog; } });
