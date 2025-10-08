"use client";
import {useEffect, useState} from "react";
import {motion, useMotionValue, useSpring} from "framer-motion";

export default function CustomCursor() {
    // track mouse
    const mx = useMotionValue(-100);
    const my = useMotionValue(-100);

    // smooth trailing
    const x = useSpring(mx, {stiffness: 500, damping: 40, mass: 0.6});
    const y = useSpring(my, {stiffness: 500, damping: 40, mass: 0.6});

    const [variant, setVariant] = useState<"default" | "link" | "down">("default");
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        // respect reduced motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setEnabled(false);
            return;
        }

        const move = (e: MouseEvent) => {
            mx.set(e.clientX);
            my.set(e.clientY);
            // hover detection for links/buttons or opt-in targets
            const t = e.target as HTMLElement | null;
            if (t && (t.closest("a,button,[role='button'],[data-cursor='link']"))) {
                setVariant((v) => (v === "down" ? "down" : "link"));
            } else if (variant !== "down") {
                setVariant("default");
            }
        };
        const down = () => setVariant("down");
        const up = () => setVariant("default");

        window.addEventListener("mousemove", move);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);
        window.addEventListener("mouseleave", () => mx.set(-100)); // hide offscreen

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
            window.removeEventListener("mouseleave", () => mx.set(-100));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!enabled) return null;

    const styles =
        "pointer-events-none fixed z-[9999] rounded-full will-change-transform " +
        "-translate-x-1/2 -translate-y-1/2";

    const base = "backdrop-blur bg-white/60 border border-white/80 shadow-lg";
    const link = "bg-blue-500/20 border-blue-400/70";
    const downS = "bg-white border-white shadow-xl";

    const size =
        variant === "default" ? 16 :
            variant === "link" ? 36 :
                20; // "down"

    const cls =
        variant === "default" ? base :
            variant === "link" ? `${base} ${link}` :
                `${base} ${downS}`;

    return (
        <motion.div
            aria-hidden
            className={`${styles} ${cls}`}
            style={{x, y, width: size, height: size}}
            transition={{type: "spring", stiffness: 500, damping: 40, mass: 0.6}}
        />
    );
}