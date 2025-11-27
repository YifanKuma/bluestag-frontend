// src/app/api/log/route.ts
import {NextResponse} from "next/server";
import {apiSafe} from "@/lib/apiSafe";

// ✅ Ensure this API is runtime-only (not statically built)
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Define the expected log payload structure
interface LogRequestBody {
    level?: string;
    message?: string;
    meta?: Record<string, unknown>;
}

// ✅ POST /api/log
export const POST = apiSafe(async (req: Request) => {
    const stamp = new Date().toISOString();

    let data: LogRequestBody | null = null;
    try {
        data = (await req.json()) as LogRequestBody;
    } catch {
        console.warn(`[${stamp}] ⚠️ Received malformed JSON at /api/log`);
        return NextResponse.json(
            {ok: false, error: "Invalid JSON payload"},
            {status: 400}
        );
    }

    const {level = "INFO", message = "No message", meta} = data;

    // 🧾 Structured server log output
    console.log(`[${stamp}] ${level.toUpperCase()}: ${message}`);
    if (meta && typeof meta === "object") {
        console.dir(meta, {depth: 3});
    }

    return NextResponse.json({ok: true});
}, "/api/log");

// ✅ GET /api/log
export const GET = apiSafe(async () =>
    NextResponse.json({ok: true, message: "Logging endpoint active"})
);
