import { informant, MetadataID, WeightsContainer } from '../..';
import { Base } from '../base';
import { EventConnection } from '../event_connection';
/**
 * Class that deals with communication with the centralized server when training
 * a specific task in the federated setting.
 */
export declare class Client extends Base {
    private readonly clientID;
    private readonly peer;
    private round;
    protected _server?: EventConnection;
    private serverRound?;
    private serverWeights?;
    private receivedStatistics?;
    private metadataMap?;
    get server(): EventConnection;
    private connectServer;
    /**
     * Initialize the connection to the server. TODO: In the case of FeAI,
     * should return the current server-side round for the task.
     */
    connect(): Promise<void>;
    /**
     * Disconnection process when user quits the task.
     */
    disconnect(): Promise<void>;
    private sendMessage;
    postWeightsToServer(weights: WeightsContainer): Promise<void>;
    getLatestServerRound(): Promise<number | undefined>;
    pullRoundAndFetchWeights(): Promise<WeightsContainer | undefined>;
    pullServerStatistics(trainingInformant: informant.FederatedInformant): Promise<void>;
    postMetadata(metadataID: MetadataID, metadata: string): Promise<void>;
    getMetadataMap(metadataId: MetadataID): Promise<Map<string, unknown> | undefined>;
    onRoundEndCommunication(updatedWeights: WeightsContainer, staleWeights: WeightsContainer, _: number, trainingInformant: informant.FederatedInformant): Promise<WeightsContainer>;
    onTrainEndCommunication(): Promise<void>;
}
