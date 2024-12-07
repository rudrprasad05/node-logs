export declare class Logger {
    private logFile;
    constructor();
    private logMessage;
    info(message: string): void;
    debug(message: string): void;
    error(message: string): void;
    http(message: string, ip: string): void;
    close(): void;
}
