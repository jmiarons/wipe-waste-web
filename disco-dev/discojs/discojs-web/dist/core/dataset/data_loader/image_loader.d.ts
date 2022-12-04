import { tf } from '../..';
import { Dataset } from '../dataset';
import { DataSplit } from '../data';
import { DataLoader, DataConfig } from '../data_loader';
/**
 * TODO @s314cy:
 * Load labels and correctly match them with their respective images, with the following constraints:
 * 1. Images are given as 1 image/1 file
 * 2. Labels are given as multiple labels/1 file, each label file can contain a different amount of labels
 */
export declare abstract class ImageLoader<Source> extends DataLoader<Source> {
    abstract readImageFrom(source: Source): Promise<tf.Tensor3D>;
    load(image: Source, config?: DataConfig): Promise<Dataset>;
    private buildDataset;
    loadAll(images: Source[], config?: DataConfig): Promise<DataSplit>;
    shuffle(array: number[]): void;
}
