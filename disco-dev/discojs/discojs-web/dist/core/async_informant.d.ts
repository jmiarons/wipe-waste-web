import { AsyncBuffer } from './async_buffer';
export declare class AsyncInformant<T> {
    private readonly asyncBuffer;
    private round;
    private currentNumberOfParticipants;
    private totalNumberOfParticipants;
    private averageNumberOfParticipants;
    constructor(asyncBuffer: AsyncBuffer<T>);
    update(): void;
    private updateRound;
    private updateNumberOfParticipants;
    private updateAverageNumberOfParticipants;
    private updateTotalNumberOfParticipants;
    getCurrentRound(): number;
    getNumberOfParticipants(): number;
    getTotalNumberOfParticipants(): number;
    getAverageNumberOfParticipants(): number;
    getAllStatistics(): Record<'round' | 'currentNumberOfParticipants' | 'totalNumberOfParticipants' | 'averageNumberOfParticipants', number>;
    printAllInfos(): void;
}
