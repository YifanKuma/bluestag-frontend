"use client";

import {motion, Variants} from "framer-motion";

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 16},
    show: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5, ease: "easeOut"} as never, // <-- cast fixes strict type issue
    },
};

const container: Variants = {
    hidden: {},
    show: {
        transition: {staggerChildren: 0.08},
    },
};

import {
    ShieldCheck,
    Server,
    Cloud,
    Headset,
    ActivitySquare,
    Cpu,
    DatabaseBackup,
    FileCog,
    KeySquare,
    CheckCircle2,
    ArrowRight
} from "lucide-react";

const features = [
    {
        icon: ActivitySquare,
        title: "24/7 Monitoring",
        desc: "Proactive alerts, uptime SLAs, health checks on servers, endpoints & network."
    },
    {
        icon: FileCog,
        title: "Patch & Updates",
        desc: "OS, drivers, firmware and app patching with maintenance windows and rollbacks."
    },
    {
        icon: DatabaseBackup,
        title: "Backup & DR",
        desc: "Snapshot + offsite backups, immutability options, tested recovery runbooks."
    },
    {
        icon: Cloud,
        title: "Cloud & M365",
        desc: "Tenant hardening, cost-optimised compute/storage, identity & access governance."
    },
    {
        icon: Cpu,
        title: "Endpoint Management",
        desc: "Zero-touch provisioning, profiles, compliance baselines, EDR integrations."
    },
    {
        icon: ShieldCheck,
        title: "Security & Compliance",
        desc: "Hardening, SIEM alerts, MFA/SSO, audit trails, policy-as-code guardrails."
    },
    {
        icon: Headset,
        title: "Helpdesk & On-call",
        desc: "Tiered support with SLAs, runbooks, escalation, and clear comms templates."
    },
    {
        icon: Server,
        title: "Network & Infra",
        desc: "LAN/WAN, SD-WAN, Wi-Fi, VPN, firewall as code, capacity & resilience."
    },
];

const highlights = [
    {kpi: "99.9%", label: "Uptime target"},
    {kpi: "<15m", label: "P1 response"},
    {kpi: "30–60%", label: "Cloud savings (optimised)"},
    {kpi: "AES-256", label: "Backup at-rest"},
];

export default function ManagedITSection() {
    return (
        <section className="relative">
            {/* subtle gradient frame */}
            <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent"/>

            {/* Header */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className="mx-auto max-w-4xl text-center"
            >
        <span
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide">
          <KeySquare className="h-3.5 w-3.5"/> Managed IT Services
        </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
                    Proactive, secure, and scalable IT — managed end-to-end
                </h2>
                <p className="mt-3 text-white/70">
                    We monitor, patch, secure, and support your stack so your team can focus on the work that matters.
                </p>

                {/* CTA */}
                <div className="mt-6 flex items-center justify-center gap-3">
                    <a
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/15"
                    >
                        Book a consultation <ArrowRight
                        className="h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5"/>
                    </a>
                    <a
                        href="/pricing"
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium hover:bg-white/5"
                    >
                        See pricing
                    </a>
                </div>
            </motion.div>

            {/* KPI chips */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.2}}
                className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
            >
                {highlights.map(h => (
                    <motion.div
                        key={h.label}
                        variants={fadeUp}
                        className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    >
                        <p className="text-2xl font-extrabold">{h.kpi}</p>
                        <p className="mt-1 text-xs text-white/70">{h.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Feature grid */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.2}}
                className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        variants={fadeUp}
                        className="group rounded-2xl border border-white/10 bg-[#0B0B0B]/70 p-5 backdrop-blur-sm transition hover:border-white/20 hover:bg-[#0F0F0F]"
                    >
                        <div className="flex items-start gap-3">
                            <f.icon className="h-5 w-5 shrink-0" aria-hidden/>
                            <div>
                                <h3 className="font-semibold">{f.title}</h3>
                                <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                            </div>
                        </div>

                        {/* subtle “explain” animation strip */}
                        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
                            <motion.div
                                initial={{width: "0%"}}
                                whileInView={{width: "100%"}}
                                viewport={{once: true}}
                                transition={{duration: 1 + i * 0.05, ease: "easeOut"}}
                                className="h-full bg-white/30"
                            />
                        </div>

                        {/* tiny assurance row */}
                        <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                            <CheckCircle2 className="h-3.5 w-3.5"/>
                            Production-ready runbooks & SLAs
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom note */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.3}}
                className="mx-auto mt-10 max-w-3xl rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-200"
            >
                We can tailor bundles for startups to mid-market (e.g., “Secure-First”, “Cloud-Native”, or
                “Compliance-Ready”)
                and integrate with your existing tools (M365, Google Workspace, Okta, Slack, Jira, Datadog, etc.).
            </motion.div>
        </section>
    );
}