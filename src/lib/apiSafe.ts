import {NextResponse} from "next/server";
import {log} from "@/lib/logger";

/**
 * Universal API wrapper for safety and consistent error handling.
 * Usage: export const POST = apiSafe(async (req) => { ... })
 */
export function apiSafe(
    handler: (req: Request) => Promise<NextResponse> | NextResponse,
    routeName?: string
) {
    return async (req: Request): Promise<NextResponse> => {
        const stamp = new Date().toISOString();

        try {
            // Execute the actual handler
            return await handler(req);
        } catch (err: unknown) {
            // ✅ Safe error type narrowing
            const error = err instanceof Error ? err : new Error(String(err));

            // 🔥 Log the failure
            await log.error("API route failed", {
                route: routeName,
                message: error.message ?? "Unknown error",
                stack: error.stack,
                time: stamp,
            });

            // ⚡ Return a consistent safe response
            return NextResponse.json(
                {ok: false, error: "Internal server error"},
                {status: 500}
            );
        }
    };
}
