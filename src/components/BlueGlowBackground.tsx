"use client";

import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {useEffect, useState} from "react";

type Light = {
    id: string;
    size: number;
    x: number;   // %
    y: number;   // %
    duration: number;
    delay: number;
    parallax: number; // px drift
};

function generateLights(count = 6): Light[] {
    return Array.from({length: count}).map(() => ({
        id: Math.random().toString(36).slice(2),
        size: 300 + Math.random() * 400,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 4,
        parallax: 18 + Math.random() * 36,
    }));
}

function ParallaxBlob({
                          light,
                          sx,
                          sy,
                      }: {
    light: Light;
    sx: MotionValue<number>;
    sy: MotionValue<number>;
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
                className="absolute inset-0 rounded-full blur-[120px]"
                style={{
                    background:
                        "radial-gradient(circle, rgba(56,189,248,0.28) 0%, rgba(56,189,248,0.0) 70%)",
                }}
                animate={{x: ["-2%", "2%", "-2%"], y: ["-3%", "3%", "-3%"], opacity: [0.9, 1, 0.9]}}
                transition={{
                    duration: light.duration,
                    delay: light.delay,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }}
            />
        </motion.div>
    );
}

export default function BlueGlowBackground() {
    // Create lights only on client (prevents SSR/CSR mismatch)
    const [lights, setLights] = useState<Light[] | null>(null);
    useEffect(() => {
        setLights(generateLights(6));
    }, []);

    // Mouse normalized -1..1
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, {stiffness: 40, damping: 12, mass: 0.6});
    const sy = useSpring(my, {stiffness: 40, damping: 12, mass: 0.6});

    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (reduce || isTouch) return;

        const onMove = (e: MouseEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            mx.set((e.clientX - cx) / cx);
            my.set((e.clientY - cy) / cy);
        };
        window.addEventListener("mousemove", onMove, {passive: true});
        return () => window.removeEventListener("mousemove", onMove);
    }, [mx, my]);

    // Layer sits at z-0 (below logo, below cursor glow, above gradients)
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
            {lights?.map((l) => <ParallaxBlob key={l.id} light={l} sx={sx} sy={sy}/>)}
        </div>
    );
}