// BlueGlowBackground.tsx
"use client";

import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {useEffect, useMemo, useRef, useState} from "react";

/* ───────────────── Types & helpers ───────────────── */
type NavigatorExtra = Navigator & {
    maxTouchPoints?: number;
    hardwareConcurrency?: number;
    deviceMemory?: number;
};

const getNav = (): NavigatorExtra | undefined =>
    typeof navigator !== "undefined" ? (navigator as NavigatorExtra) : undefined;

const isSafari = () =>
    typeof navigator !== "undefined" &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const isTouch = () => {
    if (typeof window === "undefined") return false;
    const nav = getNav();
    return "ontouchstart" in window || (nav?.maxTouchPoints ?? 0) > 0;
};

function autoLowPerf(): boolean {
    if (typeof window === "undefined") return false;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const nav = getNav();

    const cores = nav?.hardwareConcurrency ?? 4;
    // `deviceMemory` is non-standard but widely supported; keep graceful fallback.
    const memGB = nav?.deviceMemory ?? 4;
    const dpr = window.devicePixelRatio ?? 1;

    return (
        reduced ||
        isTouch() ||
        isSafari() ||
        cores <= 4 ||
        memGB <= 4 ||
        dpr > 2.5 // very high DPR phones often struggle with large glows
    );
}

/* ───────────────── Types ───────────────── */
type Light = {
    id: string;
    size: number;
    x: number; // %
    y: number; // %
    duration: number;
    delay: number;
    parallax: number;
};

function rngId(): string {
    return Math.random().toString(36).slice(2);
}

/* ───────────────── Lights generator ───────────────── */
function generateLights(opts: {
    count: number;
    min: number;
    max: number;
    parallaxMin: number;
    parallaxMax: number;
}): Light[] {
    const {count, min, max, parallaxMin, parallaxMax} = opts;
    return Array.from({length: count}).map(() => ({
        id: rngId(),
        size: min + Math.random() * (max - min),
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 4,
        parallax: parallaxMin + Math.random() * (parallaxMax - parallaxMin),
    }));
}

/* ───────────────── Blob ───────────────── */
function ParallaxBlob({
                          light,
                          sx,
                          sy,
                          animated,
                      }: {
    light: Light;
    sx: MotionValue<number>;
    sy: MotionValue<number>;
    animated: boolean;
}) {
    const driftX = useTransform(sx, (v) => v * light.parallax);
    const driftY = useTransform(sy, (v) => v * light.parallax);

    return (
        <motion.div
            className="absolute"
            style={{
                x: driftX,
                y: driftY,
                left: `${light.x}%`,
                top: `${light.y}%`,
                translateX: "-50%",
                translateY: "-50%",
                width: light.size,
                height: light.size,
            }}
        >
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(56,189,248,0.26) 0%, rgba(56,189,248,0) 70%)",
                }}
                animate={
                    animated
                        ? {x: ["-2%", "2%", "-2%"], y: ["-3%", "3%", "-3%"], opacity: [0.9, 1, 0.9]}
                        : undefined
                }
                transition={
                    animated
                        ? {
                            duration: light.duration,
                            delay: light.delay,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut",
                        }
                        : undefined
                }
            />
        </motion.div>
    );
}

/* ───────────────── Component ───────────────── */
export default function BlueGlowBackground({lowPerf}: { lowPerf?: boolean }) {
    const safari = useMemo(isSafari, []);
    const [paused, setPaused] = useState(false);

    // Decide performance mode: explicit prop wins; otherwise auto-detect.
    const low = (lowPerf ?? autoLowPerf()) === true;

    const [lights, setLights] = useState<Light[] | null>(null);
    useEffect(() => {
        // Smaller/fewer lights in low mode (and on Safari)
        const count = low ? (safari ? 2 : 3) : 6;
        const min = low ? 220 : 300;
        const max = low ? 320 : 700;
        const parallaxMin = low ? 10 : 18;
        const parallaxMax = low ? 22 : 36;

        setLights(generateLights({count, min, max, parallaxMin, parallaxMax}));
    }, [low, safari]);

    // Shared cursor parallax (pointer is better than mouse; we skip on touch)
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, {stiffness: 40, damping: 12, mass: 0.6});
    const sy = useSpring(my, {stiffness: 40, damping: 12, mass: 0.6});

    const rafId = useRef<number | null>(null);

    useEffect(() => {
        // No cursor tracking for reduced-motion or touch devices
        const reduced =
            typeof window !== "undefined" &&
            (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false);

        if (reduced || isTouch()) return;

        const onMove = (e: PointerEvent) => {
            if (rafId.current != null) return;
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const px = e.clientX;
            const py = e.clientY;

            rafId.current = requestAnimationFrame(() => {
                mx.set((px - cx) / cx);
                my.set((py - cy) / cy);
                rafId.current = null;
            });
        };

        window.addEventListener("pointermove", onMove, {passive: true});
        return () => {
            window.removeEventListener("pointermove", onMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [mx, my]);

    // Pause animations when tab is hidden (saves battery/GPU)
    useEffect(() => {
        const onVis = () => setPaused(document.visibilityState === "hidden");
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    const animationsEnabled = !low && !paused;

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
            {lights?.map((l) => (
                <ParallaxBlob key={l.id} light={l} sx={sx} sy={sy} animated={animationsEnabled}/>
            ))}
        </div>
    );
}