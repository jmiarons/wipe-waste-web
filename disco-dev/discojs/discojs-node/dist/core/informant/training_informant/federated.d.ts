import { Base } from '.';
/**
 * Class that collects information about the status of the training-loop of the model.
 */
export declare class FederatedInformant extends Base {
    displayHeatmap: boolean;
    /**
     * Update the server statistics with the JSON received from the server
     * For now it's just the JSON, but we might want to keep it as a dictionary
     * @param receivedStatistics statistics received from the server.
     */
    update(receivedStatistics: Record<string, number>): void;
    isFederated(): boolean;
}
