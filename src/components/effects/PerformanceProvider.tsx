"use client";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {detectLowPowerDevice, PerfMode} from "@/utils/perf";

type PerfCtx = {
    mode: PerfMode;
    setMode: (m: PerfMode) => void;
};

const Ctx = createContext<PerfCtx | null>(null);

export function usePerfMode() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("usePerfMode must be used within <PerformanceProvider/>");
    return ctx;
}

export default function PerformanceProvider({children}: { children: React.ReactNode }) {
    const [mode, setMode] = useState<PerfMode>("high"); // ✅ start deterministic

    // ✅ Detect only on client after hydration
    useEffect(() => {
        const low = detectLowPowerDevice();
        if (low) setMode("low");
    }, []);

    // Optional FPS watchdog: demote to "low" if sustained jank
    useEffect(() => {
        if (mode === "low") {
            return; // ✅ returns undefined, not null
        }

        let rafId: number | null = null;
        let last = performance.now();
        let below50fpsSamples = 0;
        const SAMPLE_TARGET = 60; // ~1s at 60fps

        const tick = () => {
            const now = performance.now();
            const dt = now - last;
            last = now;

            if (dt > 20) below50fpsSamples++;
            if (below50fpsSamples > SAMPLE_TARGET) {
                setMode("low"); // auto-demote
                return;
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        // ✅ always return a function, not null
        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, [mode]);


    const value = useMemo(() => ({mode, setMode}), [mode]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
