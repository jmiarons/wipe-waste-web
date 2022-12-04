import { Base } from '.';
export declare class DecentralizedInformant extends Base {
    update(statistics: Record<string, number>): void;
    isDecentralized(): boolean;
}
