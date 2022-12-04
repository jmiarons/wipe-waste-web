"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.isEncoded = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var msgpack_lite_1 = (0, tslib_1.__importDefault)(require("msgpack-lite"));
function isEncoded(raw) {
    return Array.isArray(raw) && raw.every(function (r) { return typeof r === 'number'; });
}
exports.isEncoded = isEncoded;
function encode(model) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        var saved;
        var _this = this;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        void model.save({
                            save: function (artifacts) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                                return (0, tslib_1.__generator)(this, function (_a) {
                                    resolve(artifacts);
                                    return [2 /*return*/, {
                                            modelArtifactsInfo: {
                                                dateSaved: new Date(),
                                                modelTopologyType: 'JSON'
                                            }
                                        }];
                                });
                            }); }
                        });
                    })];
                case 1:
                    saved = _a.sent();
                    return [2 /*return*/, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(msgpack_lite_1.default.encode(saved).values()), false)];
            }
        });
    });
}
exports.encode = encode;
function decode(encoded) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        var raw;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    raw = msgpack_lite_1.default.decode(encoded);
                    return [4 /*yield*/, __1.tf.loadLayersModel({
                            load: function () { return raw; }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.decode = decode;
