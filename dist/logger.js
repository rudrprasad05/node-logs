"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Log level constants
const INFO = "INFO";
const DEBUG = "DEBUG";
const ERROR = "ERROR";
const HTTP = "HTTP";
class Logger {
    constructor() {
        const logDir = path_1.default.join(process.cwd(), "logs");
        // Ensure the logs directory exists
        if (!fs_1.default.existsSync(logDir)) {
            fs_1.default.mkdirSync(logDir, { recursive: true });
        }
        // Generate the log filename based on the current date
        const logFilename = path_1.default.join(logDir, `${new Date().toISOString().slice(0, 10)}.log`);
        this.logFile = fs_1.default.createWriteStream(logFilename, { flags: "a" });
    }
    logMessage(level, message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${level} - ${message}\n`;
        // Write to log file and print to console
        this.logFile.write(logMessage);
        console.log(logMessage.trim());
    }
    info(message) {
        this.logMessage(INFO, message);
    }
    debug(message) {
        this.logMessage(DEBUG, message);
    }
    error(message) {
        this.logMessage(ERROR, message);
    }
    http(message, ip) {
        this.logMessage(HTTP, `${message} - IP: ${ip}`);
    }
    close() {
        this.logFile.end();
    }
}
exports.Logger = Logger;
