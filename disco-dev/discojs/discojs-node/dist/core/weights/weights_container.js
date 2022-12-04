"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightsContainer = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var __1 = require("..");
var WeightsContainer = /** @class */ (function () {
    function WeightsContainer(weights) {
        this._weights = (0, immutable_1.List)(weights).map(function (w) {
            return w instanceof __1.tf.Tensor ? w : __1.tf.tensor(w);
        });
    }
    Object.defineProperty(WeightsContainer.prototype, "weights", {
        get: function () {
            return this._weights.toArray();
        },
        enumerable: false,
        configurable: true
    });
    WeightsContainer.prototype.add = function (other) {
        return this.mapWith(other, __1.tf.add);
    };
    WeightsContainer.prototype.sub = function (other) {
        return this.mapWith(other, __1.tf.sub);
    };
    WeightsContainer.prototype.mapWith = function (other, fn) {
        return new WeightsContainer(this._weights
            .zip(other._weights)
            .map(function (_a) {
            var _b = (0, tslib_1.__read)(_a, 2), w1 = _b[0], w2 = _b[1];
            return fn(w1, w2);
        }));
    };
    WeightsContainer.prototype.map = function (fn) {
        return new WeightsContainer(this._weights.map(fn));
    };
    WeightsContainer.prototype.reduce = function (fn) {
        return this._weights.reduce(fn);
    };
    WeightsContainer.prototype.get = function (index) {
        return this._weights.get(index);
    };
    WeightsContainer.prototype.frobeniusNorm = function () {
        return Math.sqrt(this.map(function (w) { return w.square().sum(); }).reduce(function (a, b) { return a.add(b); }).dataSync()[0]);
    };
    WeightsContainer.of = function () {
        var weights = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            weights[_i] = arguments[_i];
        }
        return new this(weights);
    };
    WeightsContainer.from = function (model) {
        return new this(model.weights.map(function (w) { return w.read(); }));
    };
    WeightsContainer.add = function (a, b) {
        return new this(a).add(new this(b));
    };
    WeightsContainer.sub = function (a, b) {
        return new this(a).sub(new this(b));
    };
    return WeightsContainer;
}());
exports.WeightsContainer = WeightsContainer;
