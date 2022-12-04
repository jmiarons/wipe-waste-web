"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTaskProvider = void 0;
function isTaskProvider(obj) {
    if ('getModel' in obj && typeof obj.getModel === 'function' &&
        'getTask' in obj && typeof obj.getTask === 'function') {
        return true;
    }
    else {
        return false;
    }
}
exports.isTaskProvider = isTaskProvider;
