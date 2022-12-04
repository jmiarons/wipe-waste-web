"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.informant = exports.TrainingInformant = exports.GraphInformant = void 0;
var tslib_1 = require("tslib");
var graph_informant_1 = require("./graph_informant");
Object.defineProperty(exports, "GraphInformant", { enumerable: true, get: function () { return graph_informant_1.GraphInformant; } });
var training_informant_1 = require("./training_informant");
Object.defineProperty(exports, "TrainingInformant", { enumerable: true, get: function () { return training_informant_1.Base; } });
exports.informant = (0, tslib_1.__importStar)(require("./training_informant"));
