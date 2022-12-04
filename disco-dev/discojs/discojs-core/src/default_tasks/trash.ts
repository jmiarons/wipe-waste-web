import { tf, Task, data, TaskProvider } from '..'

export const trash: TaskProvider = {
  getTask (): Task {
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
        preprocessingFunctions: [data.ImagePreprocessing.Normalize],
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
        scheme: 'Federated', // secure aggregation not yet implemented for federated
        noiseScale: undefined,
        clippingRadius: undefined
      }
    }
  },

  async getModel (): Promise<tf.LayersModel> {
    throw new Error('Not implemented')
  }
}
