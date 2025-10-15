"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";

const GRADIENTS = [
    "radial-gradient(1200px 700px at 50% -200px, #0B1220 0%, #05060B 60%)",
    "linear-gradient(180deg, #0A0F1A 0%, #090B12 50%, #07080C 100%)",
    "linear-gradient(180deg, #0A0A0A 0%, #111111 100%)",
    "radial-gradient(1000px 600px at 70% -150px, #102033 0%, #0A0A0A 65%)",
    "linear-gradient(180deg, #0B0B0B 0%, #0F0F0F 100%)",
];

export default function BackgroundSwitcher() {
    const [active, setActive] = useState(0);
    const [reduce, setReduce] = useState(false); // state so transitions react to changes
    const lastStable = useRef(0);
    const debounceT = useRef<number | null>(null);

    useEffect(() => {
        const m = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduce(m.matches);
        const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
        m.addEventListener?.("change", onChange);
        return () => m.removeEventListener?.("change", onChange);
    }, []);

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]"));
        if (!sections.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (!visible) return;

                const idx = Number((visible.target as HTMLElement).dataset.bg ?? 0);
                const ratio = visible.intersectionRatio;

                if (ratio < 0.6 || idx === lastStable.current) return;

                if (debounceT.current) window.clearTimeout(debounceT.current);
                debounceT.current = window.setTimeout(() => {
                    lastStable.current = idx;
                    setActive(idx);
                }, 120);
            },
            {
                root: null,
                rootMargin: "-30% 0px -30% 0px",
                threshold: [0.6, 0.7, 0.8, 0.9],
            }
        );

        sections.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    // Base at z-0 (bottom-most visual layer)
    return (
        <div className="fixed inset-0 z-0" aria-hidden>
            {GRADIENTS.map((bg, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: bg,
                        backgroundSize: "cover",
                        backgroundAttachment: "fixed",
                        willChange: "opacity",
                    }}
                    initial={{opacity: i === 0 ? 1 : 0}}
                    animate={{opacity: active === i ? 1 : 0}}
                    transition={{
                        duration: reduce ? 0 : 0.7,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}