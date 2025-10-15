"use client";

import {motion, useInView} from "framer-motion";
import {useEffect, useMemo, useRef, useState} from "react";

/* ───────────────── CountUp (numeric only) */
function CountUp({
                     end, duration = 1.0, suffix = "", prefix = ""
                 }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
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

/* ───────────────── Small sparkline bars */
function Sparkline({active = true}: { active?: boolean }) {
    return (
        <div className="flex h-8 items-end gap-[3px] opacity-90">
            {Array.from({length: 18}).map((_, i) => {
                const base = 25 + ((i * 7) % 55);
                return (
                    <motion.div
                        key={i}
                        initial={{height: base}}
                        animate={active ? {height: [base * 0.6, base * 1.2, base * 0.85]} : {height: base}}
                        transition={{duration: 1 + (i % 5) * 0.1, repeat: active ? Infinity : 0, ease: "easeInOut"}}
                        className="w-[6px] rounded bg-cyan-400/30"
                    />
                );
            })}
        </div>
    );
}

/* ───────────────── Tech pill */
function Chip({label}: { label: string }) {
    return (
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {label}
    </span>
    );
}

/* ───────────────── Code block (static) */
const codeSample = `{
  "campaign": "Winter Launch",
  "channels": ["instagram", "linkedin", "x"],
  "schedule": "best_time:auto",
  "utm": { "source": "bluestag", "medium": "social", "campaign": "winter_launch" },
  "assets": [{ "type": "image", "variant": "A/B" }],
  "goals": { "ctr": "↑", "conversions": "↑" }
}`;

export default function SocialMediaSection() {
    const [activeCard, setActiveCard] = useState<0 | 1 | 2>(0);
    const wrapRef = useRef<HTMLDivElement | null>(null);

    // auto rotate panels (pause on hover)
    useEffect(() => {
        let paused = false;
        const el = wrapRef.current;
        const enter = () => {
            paused = true;
        };
        const leave = () => {
            paused = false;
        };
        el?.addEventListener("mouseenter", enter);
        el?.addEventListener("mouseleave", leave);
        const id = setInterval(() => {
            if (!paused) setActiveCard((c) => ((c + 1) % 3) as 0 | 1 | 2);
        }, 4200);
        return () => {
            clearInterval(id);
            el?.removeEventListener("mouseenter", enter);
            el?.removeEventListener("mouseleave", leave);
        };
    }, []);

    const headings = useMemo(() => [
        {title: "AI Content Engine", desc: "Brief → multi-channel posts in your brand voice."},
        {title: "Autopilot Scheduler", desc: "Plan a month in minutes with best-time publish."},
        {title: "Analytics & A/B", desc: "Track CTR/conversions and promote winners."},
    ], []);

    return (
        <section id="social" className="relative mt-16" ref={wrapRef}>
            {/* ambient glow */}
            <motion.div
                aria-hidden
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true, margin: "-10% 0px"}}
                transition={{duration: 1}}
                className="pointer-events-none absolute -top-12 -left-12 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
            />

            <p className="text-xs uppercase tracking-widest text-cyan-300/90">Social Media Management</p>
            <h2 className="mt-2 text-2xl md:text-4xl font-bold">A tech stack for content that grows itself</h2>
            <p className="mt-3 text-white/70 max-w-3xl">
                Bluestag runs your social like an engineering system — content generation, scheduling, and analytics
                wired
                together with automation and guardrails. Less grunt work, more growth.
            </p>

            {/* Tech chips */}
            <div className="mt-4 flex flex-wrap gap-2">
                <Chip label="AI Drafts"/>
                <Chip label="A/B Variants"/>
                <Chip label="Best-Time Publish"/>
                <Chip label="Auto-UTM"/>
                <Chip label="Multi-channel"/>
                <Chip label="Team Approvals"/>
            </div>

            {/* KPI strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    {k: <CountUp end={10} suffix="×"/>, l: "Faster output"},
                    {k: <CountUp end={37} suffix="%"/>, l: "Avg. engagement lift"},
                    {k: <CountUp end={14}/>, l: "Days scheduled ahead"},
                    {k: <CountUp end={2} suffix="min"/>, l: "Setup time per post"},
                ].map((s, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                        <div className="text-xl font-extrabold text-cyan-300">{s.k}</div>
                        <div className="mt-1 text-xs text-white/70">{s.l}</div>
                    </div>
                ))}
            </div>

            {/* Three tech panels */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
                {/* Panel 1 — AI Content */}
                <motion.button
                    onClick={() => setActiveCard(0)}
                    initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, margin: "-10% 0px"}} transition={{duration: .45}}
                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left
                      ${activeCard === 0 ? "border-cyan-400/60 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                >
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-lg font-semibold">{headings[0].title}</h3>
                        <span className="text-[11px] text-cyan-300/80">module</span>
                    </div>
                    <p className="mt-1 text-white/70 text-sm">{headings[0].desc}</p>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {["Instagram", "LinkedIn", "X"].map((c) => (
                            <div key={c}
                                 className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-center text-xs text-white/80">
                                {c}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <Sparkline active={activeCard === 0}/>
                    </div>

                    {/* neon border when active */}
                    {activeCard === 0 && (
                        <motion.span
                            layoutId="tech-border"
                            className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-cyan-400/30"
                        />
                    )}
                </motion.button>

                {/* Panel 2 — Scheduler */}
                <motion.button
                    onClick={() => setActiveCard(1)}
                    initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, margin: "-10% 0px"}} transition={{duration: .45, delay: .06}}
                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left
                      ${activeCard === 1 ? "border-cyan-400/60 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                >
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-lg font-semibold">{headings[1].title}</h3>
                        <span className="text-[11px] text-cyan-300/80">module</span>
                    </div>
                    <p className="mt-1 text-white/70 text-sm">{headings[1].desc}</p>

                    <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] text-white/70">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                            <div key={d} className={`rounded-md border px-2 py-2
                   ${i === 2 || i === 5 ? "border-cyan-400/30 bg-cyan-400/10" : "border-white/10 bg-black/30"}`}>
                                {d}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <Sparkline active={activeCard === 1}/>
                    </div>

                    {activeCard === 1 && (
                        <motion.span layoutId="tech-border"
                                     className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-cyan-400/30"/>
                    )}
                </motion.button>

                {/* Panel 3 — Analytics */}
                <motion.button
                    onClick={() => setActiveCard(2)}
                    initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, margin: "-10% 0px"}} transition={{duration: .45, delay: .12}}
                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left
                      ${activeCard === 2 ? "border-cyan-400/60 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                >
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-lg font-semibold">{headings[2].title}</h3>
                        <span className="text-[11px] text-cyan-300/80">module</span>
                    </div>
                    <p className="mt-1 text-white/70 text-sm">{headings[2].desc}</p>

                    <div className="mt-3 space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">CTR</span>
                            <span className="font-semibold text-cyan-300">↑ <CountUp end={18} suffix="%"/></span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Saves</span>
                            <span className="font-semibold text-cyan-300"><CountUp end={240}/></span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white/70">Conversions</span>
                            <span className="font-semibold text-cyan-300">↑ <CountUp end={12} suffix="%"/></span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Sparkline active={activeCard === 2}/>
                    </div>

                    {activeCard === 2 && (
                        <motion.span layoutId="tech-border"
                                     className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-cyan-400/30"/>
                    )}
                </motion.button>
            </div>

            {/* Code preview tile */}
            <motion.div
                initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: "-10% 0px"}} transition={{duration: .45, delay: .15}}
                className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0"
            >
                <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-2 text-[12px]">
                    <span className="h-2 w-2 rounded-full bg-red-400/70"/>
                    <span className="h-2 w-2 rounded-full bg-yellow-400/70"/>
                    <span className="h-2 w-2 rounded-full bg-green-400/70"/>
                    <span className="ml-3 text-white/60">autopilot.json</span>
                    <span className="ml-auto text-cyan-300/80">readonly</span>
                </div>
                <pre className="whitespace-pre-wrap px-4 py-4 text-[13px] leading-6 text-cyan-100/90">
{codeSample}
        </pre>
            </motion.div>
        </section>
    );
}