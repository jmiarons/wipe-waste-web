import { Logger } from './logger';
/**
 * Same properties as Toaster but on the console
 *
 * @class Logger
 */
export declare class ConsoleLogger extends Logger {
    /**
     * Logs success message on the console (in green)
     * @param {String} message - message to be displayed
     */
    success(message: string): void;
    /**
     * Logs error message on the console (in red)
     * @param message - message to be displayed
     */
    error(message: string): void;
}
