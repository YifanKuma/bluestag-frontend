"use client";

import {motion, Variants} from "framer-motion";

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 16},
    show: {opacity: 1, y: 0, transition: {duration: 0.5, ease: "easeOut"} as never},
};

const container: Variants = {
    hidden: {},
    show: {transition: {staggerChildren: 0.08}},
};

import {
    ShieldCheck,
    Server,
    Headset,
    KeySquare,
    CheckCircle2,
    ArrowRight,
    Boxes,
    ShoppingCart,
    BadgeCheck,
    Monitor,
    Smartphone,
    RotateCcw,
} from "lucide-react";

const features = [
    {
        icon: Boxes,
        title: "IT Asset Management",
        desc: "Track hardware & software lifecycle, warranties, refresh plans, and ownership."
    },
    {
        icon: ShoppingCart,
        title: "IT Procurement Services",
        desc: "Source and supply devices & licenses with vendor quotes, staging, and delivery."
    },
    {
        icon: BadgeCheck,
        title: "IT Licensing Management",
        desc: "Stay compliant with renewals, right-sizing, usage audits, and vendor governance."
    },
    {
        icon: Headset,
        title: "Help Desk Services",
        desc: "Friendly support with SLAs, ticketing, remote assistance, and on-site escalation."
    },
    {
        icon: Monitor,
        title: "Desktop Management",
        desc: "Builds & baselines, patching, AV/EDR, device health, and policy enforcement."
    },
    {
        icon: Server,
        title: "Server Management",
        desc: "Monitoring, patch windows, capacity planning, and performance optimisation."
    },
    {
        icon: ShieldCheck,
        title: "Security Management",
        desc: "Hardening, MFA/SSO, threat alerts, audit trails, and policy governance."
    },
    {
        icon: Smartphone,
        title: "Mobility Management",
        desc: "MDM/Intune profiles, app controls, compliance, lost-device lock & wipe."
    },
    {
        icon: RotateCcw,
        title: "Disaster Recovery Management",
        desc: "RPO/RTO planning, off-site backups, recovery runbooks, and regular test restores."
    },
];

const highlights = [
    {kpi: "99.9%", label: "Uptime target"},
    {kpi: "<15m", label: "P1 response"},
    {kpi: "Fixed", label: "Monthly price"},
    {kpi: "AU-wide", label: "Bris → Adel"},
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
                    Comprehensive managed IT — support, maintenance & governance
                </h2>
                <p className="mt-3 text-white/70">
                    All-inclusive support to keep your devices, networks, and apps running smoothly — so your team can
                    focus on the work that matters.
                </p>

                {/* CTA */}
                <div className="mt-6 flex items-center justify-center gap-3">
                    <a
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/15"
                    >
                        Book a consultation{" "}
                        <ArrowRight className="h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5"/>
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
                {highlights.map((h) => (
                    <motion.div
                        key={h.label}
                        variants={fadeUp}
                        className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm"
                    >
                        <p className="text-2xl font-extrabold">{h.kpi}</p>
                        <p className="mt-1 text-xs text-white/70">{h.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Feature grid (more transparency) */}
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.2}}
                className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        variants={fadeUp}
                        className="group rounded-2xl border border-white/10
                       bg-white/10 p-5 backdrop-blur-md
                       shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                       transition hover:border-white/20 hover:bg-white/15 hover:backdrop-blur-lg"
                    >
                        <div className="flex items-start gap-3">
                            <f.icon className="h-5 w-5 shrink-0 text-white/90" aria-hidden/>
                            <div>
                                <h3 className="font-semibold">{f.title}</h3>
                                <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                            </div>
                        </div>

                        {/* subtle progress line */}
                        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
                            <motion.div
                                initial={{width: "0%"}}
                                whileInView={{width: "100%"}}
                                viewport={{once: true}}
                                transition={{duration: 1 + i * 0.05, ease: "easeOut"}}
                                className="h-full bg-gradient-to-r from-white/30 to-emerald-300/40"
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
                className="mx-auto mt-10 max-w-3xl rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-200 backdrop-blur-sm"
            >
                We tailor bundles for startups to mid-market (e.g., “Secure-First”, “Cloud-Native”, “Compliance-Ready”)
                and integrate with your existing tools (Microsoft 365, Google Workspace, Okta, Slack, Jira, Datadog).
            </motion.div>
        </section>
    );
}