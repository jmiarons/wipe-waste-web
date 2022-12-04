import { WeightsContainer } from '..';
import { Base } from './base';
export declare class Local extends Base {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    onRoundEndCommunication(_: WeightsContainer): Promise<WeightsContainer>;
    onTrainEndCommunication(): Promise<void>;
}
