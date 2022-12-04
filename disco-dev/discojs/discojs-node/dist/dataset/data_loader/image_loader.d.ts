import { tf, data } from '../..';
export declare class NodeImageLoader extends data.ImageLoader<string> {
    readImageFrom(source: string): Promise<tf.Tensor3D>;
}
