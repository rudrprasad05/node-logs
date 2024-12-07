import { Request, Response, NextFunction } from "express";
import { Logger } from "./logger";

function getIPAddress(req: Request): string {
  const xForwardedFor = req.headers["x-forwarded-for"];
  if (typeof xForwardedFor === "string") {
    return xForwardedFor.split(",")[0];
  }
  const ip = req.socket.remoteAddress || "";
  return ip === "::1" ? "127.0.0.1" : ip;
}

export const loggingMiddleware =
  (logger: Logger) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const ip = getIPAddress(req);
    logger.http(`${req.method} ${req.url}`, ip);
    next();
  };
