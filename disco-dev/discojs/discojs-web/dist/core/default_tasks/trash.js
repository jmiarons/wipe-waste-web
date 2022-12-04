"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trash = void 0;
var tslib_1 = require("tslib");
var __1 = require("..");
exports.trash = {
    getTask: function () {
        return {
            taskID: 'trash',
            displayInformation: {
                taskTitle: 'Trash Bins',
                summary: {
                    preview: 'Detect the kind of trash',
                    overview: 'Detect trash type based on provided images'
                },
                limitations: 'The training data is limited to small images of size 250x250.',
                tradeoffs: 'Training success strongly depends on label distribution',
                dataFormatInformation: '',
                dataExampleText: 'Below you find an example',
                dataExampleImage: 'https://storage.googleapis.com/deai-313515.appspot.com/example_training_data/simple_face-example.png'
            },
            trainingInformation: {
                modelID: 'trash-model',
                epochs: 1,
                modelURL: 'http://localhost:9005/model.json',
                roundDuration: 1,
                validationSplit: 0.1,
                batchSize: 1,
                preprocessingFunctions: [__1.data.ImagePreprocessing.Normalize],
                learningRate: 0.01,
                modelCompileData: {
                    optimizer: 'adam',
                    loss: 'categoricalCrossentropy',
                    metrics: ['accuracy']
                },
                dataType: 'image',
                IMAGE_H: 256,
                IMAGE_W: 256,
                LABEL_LIST: ['Aluminium', 'Carton', 'Glass', 'Organic Waste', 'Other Plastics', 'Paper and Cardboard', 'Plastic', 'Textiles', 'Wood'],
                scheme: 'Federated',
                noiseScale: undefined,
                clippingRadius: undefined
            }
        };
    },
    getModel: function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                throw new Error('Not implemented');
            });
        });
    }
};
