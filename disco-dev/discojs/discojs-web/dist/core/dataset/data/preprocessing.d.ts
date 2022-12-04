import { tf, Task } from '../..';
declare type PreprocessImage = (image: tf.TensorContainer) => tf.TensorContainer;
export declare type Preprocessing = ImagePreprocessing;
export interface ImageTensorContainer extends tf.TensorContainerObject {
    xs: tf.Tensor3D | tf.Tensor4D;
    ys: tf.Tensor1D | number | undefined;
}
export declare enum ImagePreprocessing {
    Normalize = "normalize",
    Resize = "resize"
}
export declare function getPreprocessImage(task: Task): PreprocessImage;
export {};
