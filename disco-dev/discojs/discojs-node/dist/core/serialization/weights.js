"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.isEncoded = void 0;
var tslib_1 = require("tslib");
var msgpack = (0, tslib_1.__importStar)(require("msgpack-lite"));
var __1 = require("..");
function isSerialized(raw) {
    if (typeof raw !== 'object' || raw === null) {
        return false;
    }
    if (!('shape' in raw && 'data' in raw)) {
        return false;
    }
    var _a = raw, shape = _a.shape, data = _a.data;
    if (!(Array.isArray(shape) && shape.every(function (e) { return typeof e === 'number'; })) ||
        !(Array.isArray(data) && data.every(function (e) { return typeof e === 'number'; }))) {
        return false;
    }
    // eslint-disable-next-line
    var _ = { shape: shape, data: data };
    return true;
}
function isEncoded(raw) {
    return Array.isArray(raw) && raw.every(function (e) { return typeof e === 'number'; });
}
exports.isEncoded = isEncoded;
function encode(weights) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        var serialized;
        var _this = this;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(weights.weights.map(function (t) { return (0, tslib_1.__awaiter)(_this, void 0, void 0, function () {
                        var _a;
                        var _b;
                        return (0, tslib_1.__generator)(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = {
                                        shape: t.shape
                                    };
                                    _a = [[]];
                                    return [4 /*yield*/, t.data()];
                                case 1: return [2 /*return*/, (_b.data = tslib_1.__spreadArray.apply(void 0, _a.concat([tslib_1.__read.apply(void 0, [_c.sent()]), false])),
                                        _b)];
                            }
                        });
                    }); }))];
                case 1:
                    serialized = _a.sent();
                    return [2 /*return*/, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(msgpack.encode(serialized).values()), false)];
            }
        });
    });
}
exports.encode = encode;
function decode(encoded) {
    var raw = msgpack.decode(encoded);
    if (!(Array.isArray(raw) && raw.every(isSerialized))) {
        throw new Error('expected to decode an array of serialized weights');
    }
    return new __1.WeightsContainer(raw.map(function (w) { return __1.tf.tensor(w.data, w.shape); }));
}
exports.decode = decode;
