"use client";

import {motion, useMotionValue, useTransform} from "framer-motion";
import {useEffect} from "react";

export default function ClientCursorGlow() {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mx.set(e.clientX);
            my.set(e.clientY);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [mx, my]);

    const bgX = useTransform(mx, (v) => `${v}px`);
    const bgY = useTransform(my, (v) => `${v}px`);

    return (
        <motion.div
            aria-hidden
            style={{left: bgX, top: bgY}}
            className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 w-[45vmin] h-[45vmin] rounded-full bg-sky-400/15 blur-3xl z-[4]"
        />
    );
}