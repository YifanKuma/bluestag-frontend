// BackgroundSwitcher.tsx
"use client";
import {useEffect, useRef, useState, useMemo} from "react";
import {motion, useReducedMotion} from "framer-motion";

const GRADIENTS = [
    "radial-gradient(1200px 700px at 50% -200px, #0B1220 0%, #05060B 60%)",
    "linear-gradient(180deg, #0A0F1A 0%, #090B12 50%, #07080C 100%)",
    "linear-gradient(180deg, #0A0A0A 0%, #111111 100%)",
    "radial-gradient(1000px 600px at 70% -150px, #102033 0%, #0A0A0A 65%)",
    "linear-gradient(180deg, #0B0B0B 0%, #0F0F0F 100%)",
];

type NavigatorExtra = Navigator & {
    hardwareConcurrency?: number;
    deviceMemory?: number;
};

const getNav = (): NavigatorExtra | undefined =>
    typeof navigator !== "undefined" ? (navigator as NavigatorExtra) : undefined;

const isSafari = () =>
    typeof navigator !== "undefined" &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const autoLowPerf = (): boolean => {
    if (typeof window === "undefined") return false;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const dpr = window.devicePixelRatio ?? 1;

    const nav = getNav();
    const cores = nav?.hardwareConcurrency ?? 4;
    const memGB = nav?.deviceMemory ?? 4;

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);

    return reduced || isMobile || dpr > 2.5 || cores <= 4 || memGB <= 4 || isSafari();
};

export default function BackgroundSwitcher({lowPerf}: { lowPerf?: boolean }) {
    const [active, setActive] = useState(0);
    const reduce = useReducedMotion();
    const lastStable = useRef(0);
    const debounceT = useRef<number | null>(null);
    const safari = useMemo(isSafari, []);
    const low = (lowPerf ?? autoLowPerf()) === true;

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]"));
        if (!sections.length) return;

        // Looser thresholds in low mode → fewer swaps ⇒ less repaint work
        const thresholds = low ? [0.6] : [0.55, 0.75, 0.95];

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (!visible) return;

                const idx = Number((visible.target as HTMLElement).dataset.bg ?? 0);
                const ratio = visible.intersectionRatio;

                const minRatio = low ? 0.6 : 0.55;
                if (ratio < minRatio || idx === lastStable.current) return;

                if (debounceT.current) window.clearTimeout(debounceT.current);
                debounceT.current = window.setTimeout(() => {
                    lastStable.current = idx;
                    setActive(idx);
                }, low ? 150 : 100);
            },
            {
                root: null,
                // larger margins reduce churn as you scroll
                rootMargin: low ? "-35% 0px -35% 0px" : "-25% 0px -25% 0px",
                threshold: thresholds,
            }
        );

        sections.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [low]);

    // In low mode we only mount the current + neighbors (less overdraw)
    const indicesToRender = new Set([active]);
    if (!low) {
        if (active - 1 >= 0) indicesToRender.add(active - 1);
        if (active + 1 < GRADIENTS.length) indicesToRender.add(active + 1);
    }

    return (
        <div className="fixed inset-0 z-0" aria-hidden>
            {GRADIENTS.map((bg, i) =>
                indicesToRender.has(i) ? (
                    <motion.div
                        key={i}
                        className="absolute inset-0"
                        style={{
                            backgroundImage: bg,
                            backgroundSize: "cover",
                            contain: "paint", // limit invalidation region
                            willChange: active === i ? "opacity" : "auto",
                        }}
                        initial={{opacity: i === 0 ? 1 : 0}}
                        animate={{opacity: active === i ? 1 : 0}}
                        transition={{
                            duration: reduce ? 0 : safari ? (low ? 0.35 : 0.5) : low ? 0.4 : 0.7,
                            ease: "easeInOut",
                        }}
                    />
                ) : null
            )}
        </div>
    );
}