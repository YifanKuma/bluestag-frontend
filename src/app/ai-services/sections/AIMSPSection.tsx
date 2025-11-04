"use client";

import React, {useMemo, useState} from "react";
import {motion, Variants} from "framer-motion";
import Link from "next/link"; // ✅ use Next Link for SPA routing
import {
    ArrowRight, Activity, Cpu, Shield, Database, Layers, Headset, Gauge, Workflow, CheckCircle2, Sparkles,
} from "lucide-react";

/* ── Motion presets ────────────────────────────── */
const fadeUp: Variants = {
    hidden: {opacity: 0, y: 12},
    show: {opacity: 1, y: 0, transition: {duration: 0.45, ease: "easeOut"} as never},
};
const container: Variants = {hidden: {}, show: {transition: {staggerChildren: 0.08}}};

/* ── KPI highlights ───────────────────────────── */
const highlights = [
    {kpi: "99.9%", label: "Uptime target"},
    {kpi: "<15m", label: "P1 response"},
    {kpi: "Fixed", label: "Monthly price"},
    {kpi: "AU-wide", label: "Bris → Adel"},
];

/* ── Feature groups ───────────────────────────── */
type CapKey =
    | "monitoring"
    | "predictive"
    | "security"
    | "backup"
    | "licensing"
    | "helpdesk"
    | "dashboard"
    | "automation";

type IconType = React.ComponentType<{ className?: string }>;

type CapGroup = {
    key: CapKey;
    label: string;
    icon: IconType;
    accent: string;
    bullets: string[];
};

const CAP_GROUPS: CapGroup[] = [
    {
        key: "monitoring",
        label: "AI-Powered Monitoring",
        icon: Activity,
        accent: "from-emerald-400/20",
        bullets: [
            "Real-time performance tracking for CPU, RAM, disk, and network usage.",
            "AI models detect unusual activity, degradation, or performance drops before users even notice.",
            "Proactive optimization to keep systems running at peak efficiency.",
        ],
    },
    {
        key: "predictive",
        label: "Predictive Maintenance",
        icon: Cpu,
        accent: "from-cyan-400/20",
        bullets: [
            "AI algorithms forecast potential hardware failures, patch issues, and security risks.",
            "Automatic self-healing scripts resolve known problems before escalation.",
            "Early alerts for ageing components, storage bottlenecks, or patch non-compliance.",
        ],
    },
    {
        key: "security",
        label: "Security & Compliance",
        icon: Shield,
        accent: "from-rose-400/20",
        bullets: [
            "Monitors antivirus, firewall, and system health status.",
            "Detects unapproved software or risky configurations.",
            "AI-driven alerts for potential security anomalies and compliance gaps.",
        ],
    },
    {
        key: "backup",
        label: "Backup & Recovery Monitoring",
        icon: Database,
        accent: "from-violet-400/20",
        bullets: [
            "Tracks backup completion, failures, and recovery readiness.",
            "AI Guardian can automatically raise a ticket if backups fail repeatedly or fall behind schedule.",
        ],
    },
    {
        key: "licensing",
        label: "License & Asset Tracking",
        icon: Layers,
        accent: "from-amber-400/20",
        bullets: [
            "Intelligent license management across Microsoft 365, Adobe, and other SaaS tools.",
            "AI-based usage analysis to suggest optimization or reclaim underused licenses.",
        ],
    },
    {
        key: "helpdesk",
        label: "AI Helpdesk Integration",
        icon: Headset,
        accent: "from-sky-400/20",
        bullets: [
            "Built-in ticketing and virtual assistant system.",
            "Users can raise tickets or ask for help directly through the tool.",
            "AI Guardian auto-generates tickets if it detects performance or security incidents.",
            "MSP technicians can remote in to troubleshoot instantly.",
        ],
    },
    {
        key: "dashboard",
        label: "Smart Dashboard & Alerts",
        icon: Gauge,
        accent: "from-emerald-300/20",
        bullets: [
            "Unified AI-powered dashboard with live system status, alerts, and health scoring.",
            "Predictive analytics visualized — CPU trends, patch success rates, risk index, etc.",
            "Multi-tenant view for MSPs with drill-down into each client environment.",
        ],
    },
    {
        key: "automation",
        label: "Workflow Automations",
        icon: Workflow,
        accent: "from-indigo-400/20",
        bullets: [
            "Integration-ready with n8n, ServiceNow, Jira, Slack, Microsoft Teams, and more.",
            "Automates ticket escalation, maintenance scheduling, and status reporting.",
            "Streamlines routine IT operations with zero manual effort.",
        ],
    },
];

/* ── Helpers ───────────────────────────── */
function Bullet({text}: { text: string }) {
    return (
        <div className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400/90"/>
            <p className="text-sm text-white/85">{text}</p>
        </div>
    );
}

function GlassCard({children, accent}: { children: React.ReactNode; accent: string }) {
    return (
        <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
            <div aria-hidden
                 className={`absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl bg-gradient-to-br ${accent}`}/>
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function polarToXY(radius: number, angleDeg: number) {
    const a = (angleDeg - 90) * (Math.PI / 180);
    return {x: radius * Math.cos(a), y: radius * Math.sin(a)};
}

/* ── MAIN COMPONENT ───────────────────────────── */
export default function AIGuardianSection() {
    const [activeKey, setActiveKey] = useState<CapKey>("monitoring");
    const active = useMemo(() => CAP_GROUPS.find(g => g.key === activeKey)!, [activeKey]);

    const nodes = useMemo(() => {
        const R = 170;
        const step = 360 / CAP_GROUPS.length;
        return CAP_GROUPS.map((g, idx) => {
            const {x, y} = polarToXY(R, idx * step);
            return {g, x, y};
        });
    }, []);

    return (
        <section className="relative">
            <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 via-sky-950/10 to-transparent"/>

            {/* ───────────────── INTRO CARD */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.25}}
                            className="mx-auto max-w-6xl mb-16">
                <div
                    className="relative grid grid-cols-1 items-center gap-10 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0a0f1a]/90 to-[#0f172a]/80 p-8 sm:grid-cols-2 sm:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.4)]">
                    <div aria-hidden
                         className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl"/>
                    <div aria-hidden
                         className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-emerald-400/10 blur-[90px]"/>

                    {/* LEFT COPY */}
                    <div className="relative z-10 space-y-4">
                        <motion.h3 variants={fadeUp} className="text-3xl sm:text-4xl font-bold leading-tight">
                            Meet <span className="text-cyan-400">AI Guardian</span> — <br/>Where <span
                            className="text-cyan-400">AI Manages IT.</span>
                        </motion.h3>

                        <motion.p variants={fadeUp} className="text-white/70 leading-relaxed">
                            Unlike traditional MSP tools that wait for problems, <span
                            className="text-cyan-400 font-medium">AI Guardian</span> thinks ahead.
                            Powered by intelligent automation, <span
                            className="text-cyan-400 font-medium">AI Guardian</span> runs quietly on every endpoint —
                            constantly learning, predicting, and acting to keep your systems secure, fast, and
                            compliant.
                        </motion.p>

                        <motion.p variants={fadeUp} className="text-white/60">
                            The future of IT management is here — and it’s <span
                            className="text-cyan-400 font-medium">AI-driven</span>.
                        </motion.p>

                        <motion.div variants={fadeUp}
                                    className="my-4 h-px w-24 bg-gradient-to-r from-cyan-400/50 to-transparent rounded-full"/>

                        <motion.h4 variants={fadeUp} className="text-xl font-semibold">What is AI Guardian?</motion.h4>
                        <motion.p variants={fadeUp} className="text-white/70 leading-relaxed">
                            <span className="text-cyan-400 font-medium">AI Guardian</span> is an intelligent endpoint
                            management platform designed for
                            <span className="text-cyan-400 font-medium"> Managed Service Providers (MSPs) </span> and
                            <span className="text-cyan-400 font-medium"> business IT teams</span>.
                            It combines <span className="text-cyan-400 font-medium">Agentic AI</span>, <span
                            className="text-cyan-400 font-medium">predictive analytics</span>, and
                            <span className="text-cyan-400 font-medium"> automated workflows</span> to monitor, heal,
                            and protect every computer in your network — without human intervention.
                        </motion.p>

                        {/* ✅ Use Link inside a motion wrapper (instead of <motion.a href>) */}
                        <motion.div variants={fadeUp}>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-300 hover:bg-cyan-400/20 transition shadow-[0_0_15px_rgba(6,182,212,0.2)] mt-6"
                            >
                                Book a Demo <ArrowRight className="h-4 w-4"/>
                            </Link>
                        </motion.div>
                    </div>

                    {/* RIGHT — Animated AI Core */}
                    <div className="relative z-10 flex justify-center items-center">
                        <div
                            className="relative w-72 h-72 flex items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-400/5">
                            <motion.div
                                className="absolute w-64 h-64 rounded-full border border-cyan-400/40"
                                animate={{rotate: 360}}
                                transition={{repeat: Infinity, duration: 22, ease: "linear"}}
                            />
                            <motion.div
                                className="absolute w-60 h-60 rounded-full border-t border-cyan-400/30"
                                animate={{rotate: -360}}
                                transition={{repeat: Infinity, duration: 18, ease: "linear"}}
                            />
                            <motion.div className="absolute animate-ping w-56 h-56 rounded-full bg-cyan-400/10"/>
                            <div className="relative text-center">
                                <h4 className="text-lg font-semibold text-cyan-300">AI Core</h4>
                                <p className="text-xs text-white/70">Agentic Brain</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ───────────────── KPI CHIPS */}
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{once: true, amount: 0.2}}
                        className="mx-auto mt-10 grid max-w-4xl grid-cols-2 sm:grid-cols-4 gap-3">
                {highlights.map(h => (
                    <motion.div key={h.label} variants={fadeUp}
                                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1120]/80 to-[#1e293b]/70 p-4 text-center backdrop-blur shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        <p className="text-2xl font-extrabold text-white">{h.kpi}</p>
                        <p className="text-xs text-white/70 mt-1">{h.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* ───────────────── Radial Feature Map */}
            <RadialFeatures active={active} setActiveKey={setActiveKey} nodes={nodes}/>

            {/* ───────────────── WHY BUSINESSES LOVE + CTA */}
            <WhyLoveGuardian/>
        </section>
    );
}

/* ── Radial subsection ───────────────────────────── */
function RadialFeatures({
                            active, setActiveKey, nodes
                        }: {
    active: CapGroup;
    setActiveKey: React.Dispatch<React.SetStateAction<CapKey>>;
    nodes: { g: CapGroup; x: number; y: number }[];
}) {
    return (
        <section className="mx-auto max-w-6xl mt-16">
            <motion.h3 variants={fadeUp} initial="hidden" whileInView="show" viewport={{once: true}}
                       className="text-xl sm:text-2xl font-semibold tracking-tight">
                AI Guardian Capabilities
            </motion.h3>

            <div className="mt-8 hidden md:grid grid-cols-5 gap-8">
                {/* Orbit left */}
                <div className="col-span-2 flex items-center justify-end">
                    <div className="relative h-[460px] w-[460px]">
                        <div className="absolute inset-0 rounded-full border border-white/10"/>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div
                                className="relative h-28 w-28 rounded-full border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl"/>
                                <span className="text-sm font-semibold text-cyan-300">AI Core</span>
                                <span
                                    className="absolute top-1/2 left-0 right-0 translate-y-3 text-center text-[10px] text-white/80">
                  Agentic Brain
                </span>
                            </div>
                        </div>

                        {nodes.map(({g, x, y}) => (
                            <motion.button
                                key={g.key}
                                onClick={() => setActiveKey(g.key)}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.97}}
                                className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur-sm hover:bg-cyan-400/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                                style={{left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`}}
                            >
                                <div className="flex items-center gap-2">
                                    <g.icon className="h-4 w-4 text-cyan-300"/>
                                    <span>{g.label}</span>
                                </div>
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[200px] origin-left bg-gradient-to-r from-cyan-400/40 to-transparent"
                                    style={{transform: `rotate(${Math.atan2(y, x) * 180 / Math.PI}deg)`}}
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Detail right */}
                <div className="col-span-3">
                    <motion.div key={active.key} initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.35}}>
                        <GlassCard accent={active.accent}>
                            <div className="flex items-center gap-2 mb-3">
                                <active.icon className="h-5 w-5 text-cyan-300"/>
                                <h4 className="text-lg sm:text-xl font-semibold">{active.label}</h4>
                            </div>
                            <div className="space-y-2">
                                {active.bullets.map((b, i) => <Bullet key={i} text={b}/>)}
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ── WHY BUSINESSES LOVE + CTA ───────────────────────────── */
function WhyLoveGuardian() {
    const reasons = [
        "AI that acts, not reacts — predicts and resolves issues before downtime.",
        "24/7 vigilance — always monitoring, always learning.",
        "Complete visibility — real-time dashboard, health scores, and smart alerts.",
        "Reduced IT workload — let AI handle routine checks, tickets, and updates.",
        "MSP-ready — multi-client management, reporting, and remote access built-in.",
    ];

    return (
        <motion.section
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{once: true, amount: 0.3}}
            className="relative mt-28 mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10
      bg-gradient-to-br from-[#0a0f1a]/90 via-[#0f172a]/80 to-[#08121c]/90 p-12 text-center backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.45)]"
        >
            {/* glowing background layers */}
            <div aria-hidden className="absolute -top-32 -left-32 h-96 w-96 bg-cyan-500/10 blur-[120px]"/>
            <div aria-hidden className="absolute -bottom-40 -right-40 h-96 w-96 bg-emerald-400/10 blur-[120px]"/>

            {/* header */}
            <motion.div variants={fadeUp} className="relative z-10 mb-10">
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-medium mb-4">
                    <Sparkles className="h-4 w-4 text-cyan-300"/>
                    Why Businesses Love AI Guardian
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
                    <span className="text-cyan-400">AI that works like your best engineer —</span> only faster, smarter,
                    and tireless.
                </h3>
                <p className="text-white/70 mt-4 max-w-3xl mx-auto">
                    Thousands of businesses rely on <span className="text-cyan-400 font-medium">AI Guardian</span> to
                    predict, protect, and perform — all day, every day.
                </p>
            </motion.div>

            {/* reason cards */}
            <motion.div variants={container}
                        className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-left justify-items-center">
                {reasons.map((r, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                        whileHover={{scale: 1.03, transition: {duration: 0.3}}}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm hover:bg-cyan-400/10 transition w-full max-w-sm shadow-[0_0_25px_rgba(6,182,212,0.05)]"
                    >
                        <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5"/>
                        <p className="text-sm text-white/85 leading-relaxed">{r}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* integrated CTA (Link, not <a>) */}
            <motion.div variants={fadeUp} className="relative z-10 mt-14 flex flex-col items-center justify-center">
                <p className="text-white/70 mb-4 text-sm sm:text-base">
                    Ready to experience <span className="text-cyan-400 font-medium">AI-driven IT management?</span>
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30
          bg-cyan-400/10 px-6 py-2.5 text-sm font-semibold text-cyan-300
          hover:bg-cyan-400/20 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition"
                >
                    Book a Demo <ArrowRight className="h-4 w-4"/>
                </Link>
            </motion.div>
        </motion.section>
    );
}