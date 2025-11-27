// src/lib/logger.ts
const isServer = typeof window === "undefined";

type LogMeta = Record<string, unknown>;

export const log = {
    async error(message: string, meta?: LogMeta) {
        if (isServer) {
            console.error("[SERVER ERROR]", message, meta ?? "");
        } else {
            console.error("[CLIENT ERROR]", message, meta ?? "");
        }
    },
    async warn(message: string, meta?: LogMeta) {
        if (isServer) {
            console.warn("[WARN]", message, meta ?? "");
        } else {
            console.warn("[CLIENT WARN]", message, meta ?? "");
        }
    },
    async info(message: string, meta?: LogMeta) {
        if (isServer) {
            console.info("[INFO]", message, meta ?? "");
        } else {
            console.info("[CLIENT INFO]", message, meta ?? "");
        }
    },
};
