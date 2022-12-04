import { MetadataID } from '../..';
import { weights } from '../../serialization';
import { type } from '../messages';
export declare type MessageFederated = postWeightsToServer | latestServerRound | pullServerStatistics | postMetadata | getMetadataMap | messageGeneral;
export interface messageGeneral {
    type: type;
}
export interface postWeightsToServer {
    type: type.postWeightsToServer;
    weights: weights.Encoded;
    round: number;
}
export interface latestServerRound {
    type: type.latestServerRound;
    weights: weights.Encoded;
    round: number;
}
export interface pullServerStatistics {
    type: type.pullServerStatistics;
    statistics: Record<string, number>;
}
export interface postMetadata {
    type: type.postMetadata;
    clientId: string;
    taskId: string;
    round: number;
    metadataId: string;
    metadata: string;
}
export interface getMetadataMap {
    type: type.getMetadataMap;
    clientId: string;
    taskId: string;
    round: number;
    metadataId: MetadataID;
    metadataMap?: Array<[string, string | undefined]>;
}
export declare function isMessageFederated(o: unknown): o is MessageFederated;
