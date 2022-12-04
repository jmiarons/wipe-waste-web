"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedDB = exports.data = void 0;
var tslib_1 = require("tslib");
exports.data = (0, tslib_1.__importStar)(require("./dataset/data_loader"));
var memory_1 = require("./memory");
Object.defineProperty(exports, "IndexedDB", { enumerable: true, get: function () { return memory_1.IndexedDB; } });
