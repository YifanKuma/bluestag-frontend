// CursorGlow.tsx
"use client";

import {motion, useMotionValue, useSpring} from "framer-motion";
import {useEffect, useMemo, useRef} from "react";
import {usePathname} from "next/navigation";

/** ---------- utils (typed, no `any`) ---------- */
type NavigatorWithMemory = Navigator & { deviceMemory?: number };
const nav = (typeof navigator !== "undefined" ? (navigator as NavigatorWithMemory) : undefined);

const isSafari = () =>
    typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const isMobile = () =>
    typeof navigator !== "undefined" &&
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");

function autoLowPerf(): boolean {
    if (typeof window === "undefined") return false;
    const reduced = !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const dpr = window.devicePixelRatio || 1;
    const cores = nav?.hardwareConcurrency ?? 4;       // hardwareConcurrency is standard
    const memGB = nav?.deviceMemory ?? 4;              // optional, typed above
    return reduced || isMobile() || isSafari() || dpr > 2.5 || cores <= 4 || memGB <= 4;
}

/** ---------- color map ---------- */
const COLOR_MAP: Array<[prefix: string, color: string]> = [
    ["/ai-services", "rgba(139,92,246,0.28)"],
    ["/industries", "rgba(34,211,238,0.28)"],
    ["/pricing", "rgba(251,191,36,0.28)"],
    ["/resources", "rgba(99,102,241,0.28)"],
    ["/contact", "rgba(45,212,191,0.28)"],
    ["/", "rgba(14,165,233,0.28)"],
];

export default function CursorGlow({lowPerf}: { lowPerf?: boolean }) {
    const pathname = usePathname();

    const color = useMemo(() => {
        const match = COLOR_MAP.find(([p]) => pathname?.startsWith(p));
        return match?.[1] || COLOR_MAP[COLOR_MAP.length - 1][1];
    }, [pathname]);

    const low = (lowPerf ?? autoLowPerf()) === true;
    const enabled = !low;

    /** ---------- hooks must be called unconditionally ---------- */
        // Motion values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const opacity = useMotionValue(0);

    // Springs
    const sx = useSpring(x, {stiffness: 90, damping: 20});
    const sy = useSpring(y, {stiffness: 90, damping: 20});
    const so = useSpring(opacity, {stiffness: 200, damping: 30});

    // rAF throttle + inactivity fade
    const rafId = useRef<number | null>(null);
    const idleTimer = useRef<number | null>(null);
    const lastX = useRef(0);
    const lastY = useRef(0);

    useEffect(() => {
        if (!enabled) return;               // <- bail inside effect, not before hooks

        let lastTs = 0;

        const scheduleHide = () => {
            if (idleTimer.current) window.clearTimeout(idleTimer.current);
            idleTimer.current = window.setTimeout(() => opacity.set(0), 1500);
        };

        const onMove = (e: PointerEvent) => {
            lastX.current = e.clientX;
            lastY.current = e.clientY;

            if (so.get() < 1) opacity.set(1);

            if (rafId.current == null) {
                rafId.current = requestAnimationFrame((ts) => {
                    lastTs = ts; // frame-skip hook if you want; simple set is fine
                    x.set(lastX.current);
                    y.set(lastY.current);
                    rafId.current = null;
                });
            }

            scheduleHide();
        };

        const onVisibility = () => {
            if (document.visibilityState === "hidden") opacity.set(0);
        };

        window.addEventListener("pointermove", onMove, {passive: true});
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("visibilitychange", onVisibility);
            if (rafId.current != null) cancelAnimationFrame(rafId.current);
            if (idleTimer.current != null) clearTimeout(idleTimer.current);
        };
    }, [enabled, opacity, so, x, y]);

    /** ---------- render ---------- */
    if (!enabled) return null;            // return after hooks are declared

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed top-0 left-0"
            style={{
                x: sx,
                y: sy,
                opacity: so,
                translateX: "-50%",
                translateY: "-50%",
                width: "clamp(160px, 24vmin, 340px)",
                height: "clamp(160px, 24vmin, 340px)",
                background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
                willChange: "transform, opacity",
                zIndex: 4,
            }}
        />
    );
}