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

/* ───────────────── Mini bars (animated) */
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

/* ───────────────── Pill chip */
function Chip({label}: { label: string }) {
    return (
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {label}
    </span>
    );
}

/* ───────────────── Code preview */
const codeSample = `{
  "type": "product_launch",
  "channels": ["facebook","instagram","tiktok","linkedin","youtube"],
  "cadence": ["teaser","countdown","launch","retarget"],
  "ab_test": {"copy":true,"creative":true,"cta":true},
  "kpis": ["ctr","add_to_cart","conversions"],
  "budget_split": "60% prospecting / 40% retargeting"
}`;

export default function SocialMediaSectionAlt() {
    const [template, setTemplate] = useState<"launch" | "flash" | "seasonal" | "awareness">("launch");
    const [hoverPause, setHoverPause] = useState(false);
    const perfRef = useRef<HTMLDivElement | null>(null);

    // auto-cycle templates (pause on hover)
    useEffect(() => {
        const id = setInterval(() => {
            if (hoverPause) return;
            setTemplate((t) =>
                t === "launch" ? "flash" : t === "flash" ? "seasonal" : t === "seasonal" ? "awareness" : "launch"
            );
        }, 4200);
        return () => clearInterval(id);
    }, [hoverPause]);

    const templateCopy = useMemo(() => ({
        launch: {
            title: "Product Launch",
            desc: "Teasers → countdown → launch-day drops → retargeting. Auto-scheduled for peak hours.",
            chips: ["9:16 Reels", "1:1 Posts", "Stories", "YouTube Shorts", "LinkedIn Announcements"]
        },
        flash: {
            title: "Flash Sale",
            desc: "Short, high-intent promos with expiry timers, coupon CTAs, and urgency creatives.",
            chips: ["Limited-time", "Auto-expiry", "Price Overlay", "Cart Recovery", "UTM: sale"]
        },
        seasonal: {
            title: "Seasonal Campaign",
            desc: "Holiday packs and themed visuals generated on-brand across every channel.",
            chips: ["Theme Packs", "Hashtag Sets", "Carousel Sets", "Video Bumpers", "Story Frames"]
        },
        awareness: {
            title: "Brand Awareness",
            desc: "Narrative-led videos and carousels to grow reach, followers, and engagement.",
            chips: ["Hook Scripts", "B-roll Notes", "Caption Variants", "Hashtag SEO", "Creator Collabs"]
        }
    }), []);

    const steps = [
        {k: "Brief", d: "Import your product, goals & dates"},
        {k: "Plan", d: "AI builds timeline, copy & assets"},
        {k: "Publish", d: "Best-time posts across channels"},
        {k: "Optimise", d: "A/B picks winners automatically"},
        {k: "Convert", d: "Track CTR → carts → sales"}
    ];

    return (
        <section id="social" className="relative mt-16">
            {/* ambient glows */}
            <motion.div
                aria-hidden
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true, margin: "-10% 0px"}}
                transition={{duration: 1}}
                className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
            />
            <motion.div
                aria-hidden
                initial={{opacity: 0, scale: 0.95}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true, margin: "-10% 0px"}}
                transition={{duration: 1, delay: .1}}
                className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
            />

            {/* Header */}
            <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/90">
                    Campaigns • Product Launches • Sales
                </p>
                <h2 className="mt-2 text-2xl md:text-4xl font-bold">
                    Orchestrate multi-channel campaigns that turn followers into customers
                </h2>
                <p className="mt-3 text-white/70 max-w-3xl">
                    Plan, create, schedule, and optimise across <strong>Facebook, Instagram, TikTok, LinkedIn, and YouTube</strong>.
                    From teasers to retargeting, Bluestag automates the entire lifecycle and reports the metrics that matter.
                </p>

                {/* KPI badges */}
                <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
            <span className="text-cyan-300 font-semibold"><CountUp end={22} suffix="%"/></span> avg CTR lift (A/B)
          </span>
                    <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
            <span className="text-cyan-300 font-semibold"><CountUp end={31} suffix="%"/></span> add-to-cart uplift
          </span>
                    <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
            <span className="text-cyan-300 font-semibold"><CountUp end={14}/></span> days pre-scheduled
          </span>
                    <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
            <span className="text-cyan-300 font-semibold"><CountUp end={4} suffix="×"/></span> faster campaign build
          </span>
                </div>
            </div>

            {/* Body: Left planner / Right performance */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT: Planner + Templates */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    {/* Timeline */}
                    <div className="flex items-center gap-3">
                        <Chip label="AI Planner"/>
                        <Chip label="Best-Time Publish"/>
                        <Chip label="Cross-Channel Sync"/>
                    </div>

                    <div className="mt-5">
                        <div className="relative pl-6">
                            {/* vertical guide line */}
                            <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />
                            {steps.map((s, i) => (
                                <motion.div
                                    key={s.k}
                                    initial={{opacity: 0, y: 8}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true, margin: "-10% 0px"}}
                                    transition={{duration: .35, delay: i * 0.05}}
                                    className="relative mb-4"
                                >
                                    <div className="absolute -left-[13px] mt-1 h-3 w-3 rounded-full bg-cyan-400/70 ring-4 ring-cyan-400/10" />
                                    <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                                        <p className="text-sm font-semibold">{s.k}</p>
                                        <p className="text-xs text-white/70">{s.d}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Templates switcher */}
                    <div className="mt-6">
                        <p className="text-xs uppercase tracking-wider text-white/60">Campaign templates</p>
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {([
                                ["launch","Launch"],
                                ["flash","Flash Sale"],
                                ["seasonal","Seasonal"],
                                ["awareness","Awareness"],
                            ] as const).map(([k, label]) => (
                                <button
                                    key={k}
                                    onMouseEnter={() => setHoverPause(true)}
                                    onMouseLeave={() => setHoverPause(false)}
                                    onClick={() => setTemplate(k)}
                                    className={[
                                        "rounded-xl border px-3 py-2 text-sm",
                                        template === k ? "border-cyan-400/50 bg-cyan-400/10" : "border-white/10 bg-black/30 hover:bg-white/10"
                                    ].join(" ")}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Template details */}
                        <motion.div
                            key={template}
                            initial={{opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: .3}}
                            className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4"
                        >
                            <p className="text-base font-semibold">{templateCopy[template].title}</p>
                            <p className="mt-1 text-sm text-white/70">{templateCopy[template].desc}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {templateCopy[template].chips.map((c) => <Chip key={c} label={c} />)}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT: Live performance */}
                <div
                    ref={perfRef}
                    onMouseEnter={() => setHoverPause(true)}
                    onMouseLeave={() => setHoverPause(false)}
                    className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.08),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-white/70">Live Performance (last 7 days)</p>
                        <span className="text-[11px] text-cyan-300/80">auto-refresh</span>
                    </div>

                    {/* Stat blocks */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {[
                            ["CTR", <><span className="align-baseline">↑ </span><CountUp end={18} suffix="%"/></>],
                            ["Add-to-Cart", <><span className="align-baseline">↑ </span><CountUp end={31} suffix="%"/></>],
                            ["Conversions", <><span className="align-baseline">↑ </span><CountUp end={12} suffix="%"/></>],
                            ["CPP (ads)", <>$<CountUp end={3} /></>],
                        ].map(([k, v]) => (
                            <div key={k as string} className="rounded-xl border border-white/10 bg-black/30 p-4">
                                <p className="text-xs text-white/70">{k}</p>
                                <p className="mt-1 text-xl font-extrabold text-cyan-300">{v}</p>
                            </div>
                        ))}
                    </div>

                    {/* Channel tiles */}
                    <div className="mt-5">
                        <p className="text-xs uppercase tracking-wider text-white/60">Channels</p>
                        <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs text-white/80">
                            {["Facebook","Instagram","TikTok","LinkedIn","YouTube","X"].map((c, i) => (
                                <div
                                    key={c}
                                    className={[
                                        "rounded-lg border px-3 py-2",
                                        i % 2 === 0 ? "border-cyan-400/30 bg-cyan-400/10" : "border-white/10 bg-black/30"
                                    ].join(" ")}
                                >
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Animated bars */}
                    <div className="mt-5">
                        <Sparkline active />
                    </div>

                    {/* JSON preview */}
                    <motion.div
                        initial={{opacity: 0, y: 8}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, margin: "-10% 0px"}}
                        transition={{duration: .35, delay: .05}}
                        className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0"
                    >
                        <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-2 text-[12px]">
                            <span className="h-2 w-2 rounded-full bg-red-400/70"/>
                            <span className="h-2 w-2 rounded-full bg-yellow-400/70"/>
                            <span className="h-2 w-2 rounded-full bg-green-400/70"/>
                            <span className="ml-3 text-white/60">{template}_campaign.json</span>
                            <span className="ml-auto text-cyan-300/80">readonly</span>
                        </div>
                        <pre className="whitespace-pre-wrap px-4 py-4 text-[13px] leading-6 text-cyan-100/90">
{codeSample}
            </pre>
                    </motion.div>

                    {/* CTA Row */}
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button className="rounded-xl border border-cyan-400/60 bg-cyan-400/10 px-4 py-2 text-sm hover:bg-cyan-400/15">
                            Start a Launch
                        </button>
                        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                            Plan a Flash Sale
                        </button>
                        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                            See Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer line */}
            <p className="mt-6 text-white/60 text-sm max-w-3xl">
                Bluestag combines AI planning, creative generation, and performance optimisation to help you
                launch once, learn fast, and scale what converts — across every channel.
            </p>
        </section>
    );
}