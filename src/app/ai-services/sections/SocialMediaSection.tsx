"use client";

import {motion, useInView} from "framer-motion";
import {useEffect, useMemo, useRef, useState} from "react";
import {SocialMediaData, TemplateEntry} from "@/types/social-media";

/* ------------------------------------------------------------------
   CountUp (unchanged)
------------------------------------------------------------------- */
function CountUp({
                     end,
                     duration = 1.0,
                     suffix = "",
                     prefix = ""
                 }: {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
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

/* ------------------------------------------------------------------
   UI utilities (unchanged)
------------------------------------------------------------------- */
function Sparkline({active = true}: { active?: boolean }) {
    return (
        <div className="flex h-8 items-end gap-[3px] opacity-90">
            {Array.from({length: 18}).map((_, i) => {
                const base = 25 + ((i * 7) % 55);
                return (
                    <motion.div
                        key={i}
                        initial={{height: base}}
                        animate={
                            active
                                ? {height: [base * 0.6, base * 1.2, base * 0.85]}
                                : {height: base}
                        }
                        transition={{
                            duration: 1 + (i % 5) * 0.1,
                            repeat: active ? Infinity : 0,
                            ease: "easeInOut"
                        }}
                        className="w-[6px] rounded bg-cyan-400/30"
                    />
                );
            })}
        </div>
    );
}

function Chip({label}: { label: string }) {
    return (
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {label}
    </span>
    );
}

/* ------------------------------------------------------------------
   MAIN COMPONENT — NOW FULLY DYNAMIC
------------------------------------------------------------------- */
export default function SocialMediaSectionAlt({data}: { data: SocialMediaData }) {
    const [template, setTemplate] = useState(data.templates[0]?.key ?? "launch");
    const [hoverPause, setHoverPause] = useState(false);

    // Auto-rotate templates
    useEffect(() => {
        const id = setInterval(() => {
            if (hoverPause) return;

            setTemplate(t => {
                const idx = data.templates.findIndex(x => x.key === t);
                const next = data.templates[(idx + 1) % data.templates.length];
                return next.key;
            });
        }, 4200);
        return () => clearInterval(id);
    }, [hoverPause, data.templates]);

    // Build template lookup map
    const templateMap = useMemo(() => {
        const m: Record<string, TemplateEntry> = {};
        data.templates.forEach(t => (m[t.key] = t));
        return m;
    }, [data.templates]);

    const activeTemplate = templateMap[template];

    return (
        <section id="social" className="relative mt-16">
            {/* left glow */}
            <motion.div
                aria-hidden
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 1}}
                className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
            />

            {/* right glow */}
            <motion.div
                aria-hidden
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 1, delay: .1}}
                className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
            />

            {/* HEADER */}
            <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/90">
                    {data.subtitle}
                </p>

                <h2 className="mt-2 text-2xl md:text-4xl font-bold">
                    {data.title}
                </h2>

                <p className="mt-3 text-white/70 max-w-3xl">
                    {data.description}
                </p>

                {/* KPI */}
                <div className="mt-5 flex flex-wrap gap-2">
                    {data.kpis.map(k => (
                        <span
                            key={k.label}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs"
                        >
                            <span className="text-cyan-300 font-semibold">
                                <CountUp
                                    end={k.value}
                                    prefix={k.prefix ?? ""}
                                    suffix={k.suffix ?? ""}
                                />
                            </span>{" "}
                            {k.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* BODY — SAME UI */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT SIDE - STEPS + TEMPLATES */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3">
                        <Chip label="AI Planner"/>
                        <Chip label="Best-Time Publish"/>
                        <Chip label="Cross-Channel Sync"/>
                    </div>

                    <div className="mt-5 relative pl-6">
                        <div
                            className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-white/10 rounded-full"
                        />

                        {data.steps.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{opacity: 0, y: 8}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: .35, delay: i * 0.05}}
                                className="relative mb-4"
                            >
                                <div
                                    className="absolute -left-[13px] mt-1 h-3 w-3 rounded-full bg-cyan-400/70 ring-4 ring-cyan-400/10"
                                />

                                <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                                    <p className="text-sm font-semibold">{s.title}</p>
                                    <p className="text-xs text-white/70">{s.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* TEMPLATE SWITCHER */}
                    <div className="mt-6">
                        <p className="text-xs uppercase tracking-wider text-white/60">Campaign templates</p>

                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {data.templates.map(t => (
                                <button
                                    key={t.key}
                                    onMouseEnter={() => setHoverPause(true)}
                                    onMouseLeave={() => setHoverPause(false)}
                                    onClick={() => setTemplate(t.key)}
                                    className={[
                                        "rounded-xl border px-3 py-2 text-sm",
                                        template === t.key
                                            ? "border-cyan-400/50 bg-cyan-400/10"
                                            : "border-white/10 bg-black/30 hover:bg-white/10"
                                    ].join(" ")}
                                >
                                    {t.title}
                                </button>
                            ))}
                        </div>

                        {/* Template detail */}
                        {activeTemplate && (
                            <motion.div
                                key={activeTemplate.key}
                                initial={{opacity: 0, y: 6}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: .3}}
                                className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4"
                            >
                                <p className="text-base font-semibold">{activeTemplate.title}</p>
                                <p className="mt-1 text-sm text-white/70">
                                    {activeTemplate.description}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {activeTemplate.chips.map(c => (
                                        <Chip key={c} label={c}/>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE – PERFORMANCE PANEL */}
                <div
                    onMouseEnter={() => setHoverPause(true)}
                    onMouseLeave={() => setHoverPause(false)}
                    className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.08),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-white/70">Live Performance</p>
                        <span className="text-[11px] text-cyan-300/80">
              auto-refresh
            </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {data.performance_stats.map((s, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-white/10 bg-black/30 p-4"
                            >
                                <p className="text-xs text-white/70">{s.label}</p>
                                <p className="mt-1 text-xl font-extrabold text-cyan-300">
                                    <CountUp
                                        end={s.value}
                                        prefix={s.prefix ?? ""}
                                        suffix={s.suffix ?? ""}
                                    />
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Channels */}
                    <div className="mt-5">
                        <p className="text-xs uppercase tracking-wider text-white/60">Channels</p>

                        <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs text-white/80">
                            {data.channels.map((c, i) => (
                                <div
                                    key={c.name}
                                    className={[
                                        "rounded-lg border px-3 py-2",
                                        c.highlighted
                                            ? "border-cyan-400/30 bg-cyan-400/10"
                                            : "border-white/10 bg-black/30"
                                    ].join(" ")}
                                >
                                    {c.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sparkline */}
                    <div className="mt-5">
                        <Sparkline active/>
                    </div>

                    {/* JSON preview */}
                    <motion.div
                        initial={{opacity: 0, y: 8}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: .35, delay: .05}}
                        className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0"
                    >
                        <div
                            className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-2 text-[12px]"
                        >
                            <span className="h-2 w-2 rounded-full bg-red-400/70"/>
                            <span className="h-2 w-2 rounded-full bg-yellow-400/70"/>
                            <span className="h-2 w-2 rounded-full bg-green-400/70"/>
                            <span className="ml-3 text-white/60">{template}_campaign.json</span>
                            <span className="ml-auto text-cyan-300/80">readonly</span>
                        </div>

                        <pre className="whitespace-pre-wrap px-4 py-4 text-[13px] leading-6 text-cyan-100/90">
{data.json_preview}
                        </pre>
                    </motion.div>

                    {/* CTA Row */}
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            className="rounded-xl border border-cyan-400/60 bg-cyan-400/10 px-4 py-2 text-sm hover:bg-cyan-400/15">
                            Start a Launch
                        </button>

                        <button
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                            Plan a Flash Sale
                        </button>

                        <button
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                            See Demo
                        </button>
                    </div>
                </div>
            </div>

            <p className="mt-6 text-white/60 text-sm max-w-3xl">
                Bluestag combines AI planning, creative generation, and performance optimisation to help you
                launch once, learn fast, and scale what converts — across every channel.
            </p>
        </section>
    );
}
