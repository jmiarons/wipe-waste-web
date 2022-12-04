"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTrainingInformation = void 0;
var model_compile_data_1 = require("./model_compile_data");
function isTrainingInformation(raw) {
    if (typeof raw !== 'object') {
        return false;
    }
    if (raw === null) {
        return false;
    }
    var _a = raw, dataType = _a.dataType, scheme = _a.scheme, epochs = _a.epochs, 
    // roundDuration,
    validationSplit = _a.validationSplit, batchSize = _a.batchSize, modelCompileData = _a.modelCompileData, modelID = _a.modelID, preprocessingFunctions = _a.preprocessingFunctions, inputColumns = _a.inputColumns, outputColumns = _a.outputColumns, IMAGE_H = _a.IMAGE_H, IMAGE_W = _a.IMAGE_W, roundDuration = _a.roundDuration, modelURL = _a.modelURL, learningRate = _a.learningRate, decentralizedSecure = _a.decentralizedSecure, maxShareValue = _a.maxShareValue, minimumReadyPeers = _a.minimumReadyPeers, LABEL_LIST = _a.LABEL_LIST, noiseScale = _a.noiseScale, clippingRadius = _a.clippingRadius;
    if (typeof dataType !== 'string' ||
        typeof modelID !== 'string' ||
        typeof epochs !== 'number' ||
        typeof batchSize !== 'number' ||
        typeof roundDuration !== 'number' ||
        typeof validationSplit !== 'number' ||
        (modelURL !== undefined && typeof modelURL !== 'string') ||
        (noiseScale !== undefined && typeof noiseScale !== 'number') ||
        (clippingRadius !== undefined && typeof clippingRadius !== 'number') ||
        (learningRate !== undefined && typeof learningRate !== 'number') ||
        (decentralizedSecure !== undefined && typeof decentralizedSecure !== 'boolean') ||
        (maxShareValue !== undefined && typeof maxShareValue !== 'number') ||
        (minimumReadyPeers !== undefined && typeof minimumReadyPeers !== 'number')) {
        return false;
    }
    // interdepences on data type
    switch (dataType) {
        case 'image':
            if (typeof IMAGE_H !== 'number' || typeof IMAGE_W !== 'number') {
                return false;
            }
            break;
        case 'tabular':
            if (!(Array.isArray(inputColumns) && inputColumns.every(function (e) { return typeof e === 'string'; }))) {
                return false;
            }
            if (!(Array.isArray(outputColumns) && outputColumns.every(function (e) { return typeof e === 'string'; }))) {
                return false;
            }
            break;
    }
    // interdepences on scheme
    switch (scheme) {
        case 'decentralized':
            break;
        case 'federated':
            break;
        case 'local':
            break;
    }
    if (!(0, model_compile_data_1.isModelCompileData)(modelCompileData)) {
        return false;
    }
    if (LABEL_LIST !== undefined && !(Array.isArray(LABEL_LIST) && LABEL_LIST.every(function (e) { return typeof e === 'string'; }))) {
        return false;
    }
    if (preprocessingFunctions !== undefined && !(Array.isArray(preprocessingFunctions) && preprocessingFunctions.every(function (e) { return typeof e === 'string'; }))) {
        return false;
    }
    return true;
}
exports.isTrainingInformation = isTrainingInformation;
