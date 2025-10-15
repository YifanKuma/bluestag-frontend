"use client";

import {motion, useMotionValue, useSpring} from "framer-motion";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

// 🎨 Define colors per route
const PAGE_COLORS: Record<string, string> = {
    "/": "bg-sky-500/25",             // Home – light blue
    "/ai-services": "bg-violet-500/25", // AI Services – violet
    "/industries": "bg-cyan-400/25",   // Industries – cyan
    "/pricing": "bg-amber-400/25",     // Pricing – gold
    "/resources": "bg-indigo-400/25",  // Resources – indigo
    "/contact": "bg-teal-400/25",      // Contact – teal
};

export default function CursorGlow() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);

    // Get the correct color class for current route
    const colorClass =
        PAGE_COLORS[pathname] || "bg-sky-500/25"; // fallback to default blue

    // Cursor tracking
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const smoothX = useSpring(x, {stiffness: 80, damping: 20});
    const smoothY = useSpring(y, {stiffness: 80, damping: 20});

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            if (!visible) setVisible(true);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [visible, x, y]);

    return (
        visible && (
            <motion.div
                className={`absolute top-0 left-0 w-[400px] h-[400px] rounded-full ${colorClass} blur-[120px] transition-colors duration-700`}
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        )
    );
}