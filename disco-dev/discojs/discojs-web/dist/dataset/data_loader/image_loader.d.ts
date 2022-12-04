import { tf, data } from '../..';
export declare class WebImageLoader extends data.ImageLoader<File> {
    readImageFrom(source: File): Promise<tf.Tensor3D>;
}
