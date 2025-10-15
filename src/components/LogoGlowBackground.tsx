"use client";

import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import {useEffect, useRef, useState} from "react";

export default function LogoGlowBackground() {
    // ✅ Client-only render to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return <LogoGlowContent/>;
}

function LogoGlowContent() {
    // 🌀 Respect reduced-motion preference
    const prefersReduced = useRef(false);
    useEffect(() => {
        prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    // 🖱️ Gentle cursor parallax
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useSpring(mx, {stiffness: 40, damping: 18, mass: 0.6});
    const y = useSpring(my, {stiffness: 40, damping: 18, mass: 0.6});
    const rotate = useTransform(x, [-40, 40], [-6, 6]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (prefersReduced.current) return;
            mx.set((e.clientX - window.innerWidth / 2) / 20);
            my.set((e.clientY - window.innerHeight / 2) / 20);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [mx, my]);

    return (
        <motion.div
            aria-hidden
            style={{x, y, rotate}}
            className="fixed inset-0 z-[50] pointer-events-none flex items-center justify-center"
        >
            {/* ✨ Responsive logo container */}
            <div
                className="
          relative
          w-[80vmin] sm:w-[90vmin] md:w-[100vmin] lg:w-[110vmin] xl:w-[130vmin]
          h-auto
          opacity-30
          flex items-center justify-center
          transition-all duration-700 ease-in-out
        "
            >
                {/* 🌊 Soft glowing background pulse */}
                <motion.div
                    className="absolute inset-0 bg-blue-400/40 blur-[160px] rounded-full"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.35, 0.55, 0.35],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* 🦌 Bluestag logo */}
                <img
                    src="/logo.png"
                    alt="Bluestag AI Logo"
                    draggable={false}
                    className="relative w-full h-auto object-contain select-none
                     blur-[0.5px] [filter:drop-shadow(0_0_90px_rgba(59,130,246,0.8))]"
                />
            </div>
        </motion.div>
    );
}