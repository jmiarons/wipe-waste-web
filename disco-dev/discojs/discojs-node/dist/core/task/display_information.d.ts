import { Summary } from './summary';
import { DataExample } from './data_example';
import { LabelType } from './label_type';
export declare function isDisplayInformation(raw: unknown): raw is DisplayInformation;
export interface DisplayInformation {
    taskTitle?: string;
    summary?: Summary;
    tradeoffs?: string;
    dataFormatInformation?: string;
    dataExampleText?: string;
    model?: string;
    dataExample?: DataExample[];
    headers?: string[];
    dataExampleImage?: string;
    limitations?: string;
    labelDisplay?: LabelType;
}
