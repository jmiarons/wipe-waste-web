"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geotags = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
var immutable_1 = require("immutable");
var label_type_1 = require("../task/label_type");
exports.geotags = {
    getTask: function () {
        return {
            taskID: 'geotags',
            displayInformation: {
                taskTitle: 'GeoTags',
                summary: {
                    preview: 'In this challenge, we predict the geo-location of a photo given its pixels in terms of a cell number of a grid built on top of Switzerland',
                    overview: 'The geotags dataset is a collection of images with geo-location information used to train a machine learning algorithm to predict the location of a photo given its pixels.'
                },
                limitations: 'The training data is limited to images of size 224x224.',
                tradeoffs: 'Training success strongly depends on label distribution',
                dataFormatInformation: 'Images should be of .png format and of size 224x224. <br> The label file should be .csv, where each row contains a file_name, class.  The class is the cell number of a the given grid of Switzerland. ',
                labelDisplay: {
                    labelType: label_type_1.LabelTypeEnum.POLYGON_MAP,
                    mapBaseUrl: 'https://disco-polygon.web.app/'
                }
            },
            trainingInformation: {
                modelID: 'geotags-model',
                epochs: 10,
                roundDuration: 10,
                validationSplit: 0.2,
                batchSize: 10,
                modelCompileData: {
                    optimizer: 'adam',
                    loss: 'categoricalCrossentropy',
                    metrics: ['accuracy']
                },
                dataType: 'image',
                IMAGE_H: 224,
                IMAGE_W: 224,
                preprocessingFunctions: [__1.data.ImagePreprocessing.Resize],
                LABEL_LIST: (0, immutable_1.Range)(0, 140).map(String).toArray(),
                scheme: 'Federated',
                noiseScale: undefined,
                clippingRadius: 20,
                decentralizedSecure: true,
                minimumReadyPeers: 3,
                maxShareValue: 100
            }
        };
    },
    getModel: function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            var pretrainedModel, numLayers, model;
            return (0, tslib_1.__generator)(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __1.tf.loadLayersModel('https://storage.googleapis.com/epfl-disco-models/geotags/v2/model.json')];
                    case 1:
                        pretrainedModel = _a.sent();
                        numLayers = pretrainedModel.layers.length;
                        pretrainedModel.layers.forEach(function (layer) { layer.trainable = false; });
                        pretrainedModel.layers[numLayers - 1].trainable = true;
                        model = __1.tf.sequential({
                            layers: [
                                __1.tf.layers.inputLayer({ inputShape: [224, 224, 3] }),
                                __1.tf.layers.rescaling({ scale: 1 / 127.5, offset: -1 }),
                                pretrainedModel
                            ]
                        });
                        return [2 /*return*/, model];
                }
            });
        });
    }
};
