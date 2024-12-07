import { Request, Response, NextFunction } from "express";
import { Logger } from "./logger";
export declare const loggingMiddleware: (logger: Logger) => (req: Request, res: Response, next: NextFunction) => void;
