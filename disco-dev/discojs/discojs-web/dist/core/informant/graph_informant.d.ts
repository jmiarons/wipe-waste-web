import { List } from 'immutable';
export declare class GraphInformant {
    static readonly NB_EPOCHS_ON_GRAPH = 10;
    private currentAccuracy;
    private accuracyDataSeries;
    constructor();
    updateAccuracy(accuracy: number): void;
    data(): List<number>;
    accuracy(): number;
}
