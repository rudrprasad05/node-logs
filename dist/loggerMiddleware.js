"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
function getIPAddress(req) {
    const xForwardedFor = req.headers["x-forwarded-for"];
    if (typeof xForwardedFor === "string") {
        return xForwardedFor.split(",")[0];
    }
    const ip = req.socket.remoteAddress || "";
    return ip === "::1" ? "127.0.0.1" : ip;
}
const loggingMiddleware = (logger) => (req, res, next) => {
    const ip = getIPAddress(req);
    logger.http(`${req.method} ${req.url}`, ip);
    next();
};
exports.loggingMiddleware = loggingMiddleware;
