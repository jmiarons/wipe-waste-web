export declare function isDataExample(raw: unknown): raw is DataExample;
export interface DataExample {
    columnName: string;
    columnData: string | number;
}
