"use client";

import {motion, AnimatePresence, useInView} from "framer-motion";
import type {Variants} from "framer-motion";
import {useEffect, useRef, useState} from "react";

// ───────────────────────────────── CountUp (numeric only)
function CountUp({end, duration = 1.0, suffix = "", prefix = ""}: {
    end: number; duration?: number; suffix?: string; prefix?: string;
}) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const inView = useInView(ref, {once: true, margin: "-20% 0px"});
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const start = performance.now();
        const step = (t: number) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            setVal(Math.round(end * p));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, end, duration]);

    return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ───────────────────────────────── Variants
const cardVariants: Variants = {
    hidden: {opacity: 0, y: 8},
    show: {opacity: 1, y: 0, transition: {duration: 0.45, ease: "easeOut"}},
};

const pulseVariants: Variants = {
    idle: {scale: 1, opacity: 0.35},
    active: {
        scale: [1, 1.15, 1],
        opacity: [0.35, 0.6, 0.35],
        transition: {duration: 1.2, repeat: Infinity, ease: "easeInOut"}
    }
};

type Stat = {
    id: number;
    heading: string;
    numeric?: { value: number; suffix?: string; prefix?: string };
    sub: string;
    explainerTitle: string;
    bullets: string[];
    hintBars?: boolean;
};

// ───────────────────────────────── Data
const STATS: Stat[] = [
    {
        id: 0,
        heading: "5×",
        numeric: {value: 5, suffix: "×"},
        sub: "Concurrent calls handled",
        explainerTitle: "Parallel calling for real throughput",
        bullets: [
            "Dials multiple contacts at once and prioritises whoever picks up first.",
            "Auto-retries no-answers; hands warm leads to your calendar.",
            "Ideal for outreach bursts, confirmations, and wait-list callbacks."
        ],
        hintBars: true,
    },
    {
        id: 1,
        heading: "24/7",
        sub: "Always available",
        explainerTitle: "Never miss a call again",
        bullets: [
            "Captures after-hours leads and issues with scripted triage.",
            "Overnight follow-ups keep pipelines moving while you sleep.",
            "Public holidays and weekends covered automatically."
        ],
        hintBars: false,
    },
    {
        id: 2,
        heading: "99%",
        numeric: {value: 99, suffix: "%"},
        sub: "Natural-voice accuracy",
        explainerTitle: "Human-like prosody & AU accent handling",
        bullets: [
            "Neural TTS + ASR tuned for Australian accents and slang.",
            "Barge-in & turn-taking so callers can interrupt naturally.",
            "Context memory across the call for fewer repeats."
        ],
        hintBars: true,
    },
    {
        id: 3,
        heading: "Seconds",
        sub: "to first response",
        explainerTitle: "Instant answers, zero hold music",
        bullets: [
            "Detects intent in ~600–900 ms and responds immediately.",
            "No queues during peaks—capacity scales elastically.",
            "Transfers to humans with a full call summary when needed."
        ],
        hintBars: false,
    },
];

// ───────────────────────────────── Small visual: animated “process bars”
function MiniBars({active}: { active: boolean }) {
    return (
        <div className="mt-3 h-8 w-full flex items-end gap-1 opacity-80">
            {[0.35, 0.6, 0.8, 0.5, 0.7].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{height: `${h * 100}%`}}
                    animate={active ? {height: [`${h * 60}%`, `${h * 100}%`, `${h * 70}%`]} : {height: `${h * 80}%`}}
                    transition={{duration: 1 + i * 0.15, repeat: active ? Infinity : 0, ease: "easeInOut"}}
                    className="flex-1 rounded bg-cyan-400/25"
                />
            ))}
        </div>
    );
}

// ───────────────────────────────── Component
export default function VoiceAISection() {
    const [active, setActive] = useState<number>(0);

    // Auto-cycle through stats every 4s (pauses on hover)
    const wrapRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        let paused = false;
        const el = wrapRef.current;
        const onEnter = () => {
            paused = true;
        };
        const onLeave = () => {
            paused = false;
        };
        el?.addEventListener("mouseenter", onEnter);
        el?.addEventListener("mouseleave", onLeave);

        const id = setInterval(() => {
            if (!paused) setActive((a) => (a + 1) % STATS.length);
        }, 4000);

        return () => {
            clearInterval(id);
            el?.removeEventListener("mouseenter", onEnter);
            el?.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <section className="relative mt-16" ref={wrapRef}>
            {/* soft glow */}
            <motion.div
                aria-hidden
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true, margin: "-10% 0px"}}
                transition={{duration: 1}}
                className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
            />

            <p className="text-xs uppercase tracking-widest text-cyan-300/90">Why Voice AI</p>
            <h2 className="mt-2 text-2xl md:text-4xl font-bold">
                Transform customer engagement with human-sounding automation
            </h2>
            <p className="mt-3 text-white/70 max-w-3xl">
                Bluestag Voice AI helps Australian businesses handle more calls, stay available 24/7,
                and deliver consistent customer experiences — all in a natural, human-like voice that callers trust.
            </p>

            {/* Stat cards */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map((s, i) => {
                    const isActive = active === s.id;
                    return (
                        <motion.button
                            key={s.id}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{once: true, margin: "-10% 0px"}}
                            transition={{delay: i * 0.06}}
                            onClick={() => setActive(s.id)}
                            onFocus={() => setActive(s.id)}
                            className={`relative rounded-2xl border p-5 text-center backdrop-blur-md transition
                ${isActive ? "border-cyan-400/60 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                        >
                            {/* pulsing halo when active */}
                            <motion.span
                                aria-hidden
                                variants={pulseVariants}
                                animate={isActive ? "active" : "idle"}
                                className="absolute inset-0 rounded-2xl ring-2 ring-cyan-400/20"
                            />
                            <div className="relative text-2xl md:text-3xl font-bold text-cyan-300">
                                {s.numeric ? <CountUp end={s.numeric.value} suffix={s.numeric.suffix}
                                                      prefix={s.numeric.prefix}/> : s.heading}
                            </div>
                            <div className="relative mt-1 text-sm text-white/70">{s.sub}</div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Explainer panel */}
            <div className="mt-6">
                <AnimatePresence mode="wait">
                    {STATS.map((s) =>
                        s.id === active ? (
                            <motion.div
                                key={s.id}
                                initial={{opacity: 0, y: 8, height: 0}}
                                animate={{opacity: 1, y: 0, height: "auto"}}
                                exit={{opacity: 0, y: -6, height: 0}}
                                transition={{duration: 0.35}}
                                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
                            >
                                <div className="grid md:grid-cols-3 gap-6 items-start">
                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-semibold">{s.explainerTitle}</h3>
                                        <ul className="mt-3 space-y-2 text-white/80 text-sm list-disc pl-5">
                                            {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                        </ul>
                                    </div>

                                    {/* tiny illustrative animation */}
                                    <div className="md:col-span-1">
                                        {s.hintBars ? (
                                            <MiniBars active/>
                                        ) : (
                                            <motion.div
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                transition={{duration: 0.6}}
                                                className="h-20 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-transparent flex items-center justify-center"
                                            >
                                                <motion.div
                                                    initial={{x: -8, opacity: 0.4}}
                                                    animate={{x: [-8, 8, -8], opacity: [0.4, 1, 0.4]}}
                                                    transition={{duration: 1.6, repeat: Infinity, ease: "easeInOut"}}
                                                    className="text-xs uppercase tracking-widest text-cyan-300"
                                                >
                                                    live response
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : null
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}