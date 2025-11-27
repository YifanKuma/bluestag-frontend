"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ────────────── Safari Helper ────────────── */
const isSafari = () =>
    typeof navigator !== "undefined" &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/* ────────────── Types ────────────── */
type Light = {
    id: string;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    parallax: number;
};

const rngId = () => Math.random().toString(36).slice(2);

/* ────────────── Full-Power Light Generator ────────────── */
function generateLights(): Light[] {
    const count = 6; // FULL effects always
    const min = 300;
    const max = 700;
    const parallaxMin = 18;
    const parallaxMax = 36;

    return Array.from({ length: count }).map(() => ({
        id: rngId(),
        size: min + Math.random() * (max - min),
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 4,
        parallax: parallaxMin + Math.random() * (parallaxMax - parallaxMin),
    }));
}

/* ────────────── Blob ────────────── */
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
                        ? { x: ["-2%", "2%", "-2%"], y: ["-3%", "3%", "-3%"], opacity: [0.9, 1, 0.9] }
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

/* ────────────── Component ────────────── */
export default function BlueGlowBackground() {
    const [lights, setLights] = useState<Light[] | null>(null);
    const [paused, setPaused] = useState(false);

    // Generate full-power lights once
    useEffect(() => {
        setLights(generateLights());
    }, []);

    /* Mouse tracking */
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 40, damping: 12, mass: 0.6 });
    const sy = useSpring(my, { stiffness: 40, damping: 12, mass: 0.6 });

    const rafId = useRef<number | null>(null);

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            if (rafId.current != null) return;

            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            rafId.current = requestAnimationFrame(() => {
                mx.set((e.clientX - cx) / cx);
                my.set((e.clientY - cy) / cy);
                rafId.current = null;
            });
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [mx, my]);

    /* Pause when tab hidden */
    useEffect(() => {
        const onVis = () => setPaused(document.visibilityState === "hidden");
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    const animationsEnabled = !paused;

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
            {lights?.map((l) => (
                <ParallaxBlob key={l.id} light={l} sx={sx} sy={sy} animated={animationsEnabled} />
            ))}
        </div>
    );
}
