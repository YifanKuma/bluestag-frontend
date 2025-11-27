"use client";

import {useEffect} from "react";
import {log} from "@/lib/logger"; // ← your central logging utility

export default function ClientErrorLogger() {
    useEffect(() => {
        // Listen for JS runtime errors
        const onError = (event: ErrorEvent) => {
            log.error("Client runtime error", {
                message: event.message,
                filename: event.filename,
                line: event.lineno,
                col: event.colno,
            });
        };

        // Listen for unhandled promise rejections
        const onReject = (event: PromiseRejectionEvent) => {
            log.error("Unhandled promise rejection", {
                reason: String(event.reason),
                time: new Date().toISOString(),
            });
        };

        window.addEventListener("error", onError);
        window.addEventListener("unhandledrejection", onReject);

        return () => {
            window.removeEventListener("error", onError);
            window.removeEventListener("unhandledrejection", onReject);
        };
    }, []);

    return null;
}
