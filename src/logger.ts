import fs from "fs";
import path from "path";

// Log level constants
const INFO = "INFO";
const DEBUG = "DEBUG";
const ERROR = "ERROR";
const HTTP = "HTTP";

export class Logger {
  private logFile: fs.WriteStream;

  constructor() {
    const logDir = path.join(process.cwd(), "logs");

    // Ensure the logs directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Generate the log filename based on the current date
    const logFilename = path.join(
      logDir,
      `${new Date().toISOString().slice(0, 10)}.log`
    );
    this.logFile = fs.createWriteStream(logFilename, { flags: "a" });
  }

  private logMessage(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${level} - ${message}\n`;

    // Write to log file and print to console
    this.logFile.write(logMessage);
    console.log(logMessage.trim());
  }

  public info(message: string): void {
    this.logMessage(INFO, message);
  }

  public debug(message: string): void {
    this.logMessage(DEBUG, message);
  }

  public error(message: string): void {
    this.logMessage(ERROR, message);
  }

  public http(message: string, ip: string): void {
    this.logMessage(HTTP, `${message} - IP: ${ip}`);
  }

  public close(): void {
    this.logFile.end();
  }
}
