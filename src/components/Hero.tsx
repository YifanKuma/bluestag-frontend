"use client";

import {motion, useReducedMotion} from "framer-motion";
import {ArrowRight} from "lucide-react";
import Section from "./Section";
import Tag from "./Tag";
import GlassCard from "./GlassCard";
import RotatingTyped from "./RotatingTyped";
import {useMemo} from "react";
import Link from "next/link"; // ✅ Added import

function isSafariUA() {
    if (typeof navigator === "undefined") return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function isMobileUA() {
    if (typeof navigator === "undefined") return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function Hero() {
    const prefersReduced = useReducedMotion();
    const isSafari = useMemo(isSafariUA, []);
    const isMobile = useMemo(isMobileUA, []);

    // Treat Safari/mobile/reduced-motion as low-perf
    const lowPerf = prefersReduced || isSafari || isMobile;

    // ✅ Avoid creating a new stacking context on Safari (lets global logo/glows show)
    const wrapperStyle = isSafari
        ? {willChange: "opacity"}
        : {transform: "translateZ(0)", willChange: "transform, opacity"};

    return (
        <div className="relative overflow-hidden" style={wrapperStyle}>
            {/* Background “glow” with gradients only (no blur) */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className="absolute left-1/2 top-24 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full"
                    style={{
                        background:
                            "radial-gradient(closest-side, rgba(56,189,248,0.22), rgba(56,189,248,0) 70%)",
                    }}
                />
                <div
                    className="absolute left-[15%] top-[50%] h-64 w-64 rounded-full"
                    style={{
                        background:
                            "radial-gradient(closest-side, rgba(14,165,233,0.20), rgba(14,165,233,0) 70%)",
                    }}
                />
                <div
                    className="absolute right-[10%] top-[40%] h-72 w-72 rounded-full"
                    style={{
                        background:
                            "radial-gradient(closest-side, rgba(59,130,246,0.20), rgba(59,130,246,0) 70%)",
                    }}
                />
            </div>

            <Section id="home" variant="full" className="text-center">
                <Tag>BLUESTAG · AI Voice for Aussie SMBs</Tag>

                {/* Title */}
                <motion.h1
                    initial={prefersReduced ? false : {opacity: 0, y: 18}}
                    animate={prefersReduced ? undefined : {opacity: 1, y: 0}}
                    transition={{duration: lowPerf ? 0.3 : 0.45, ease: "easeOut"}}
                    className="mt-6 font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl"
                >
                    <span>Modern Voice AI that</span>
                    <span
                        className="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                        <RotatingTyped
                            words={[
                                "books meetings",
                                "qualifies leads",
                                "closes deals",
                                "supports customers",
                            ]}
                            typingMs={lowPerf ? 110 : 90}
                            backspaceMs={lowPerf ? 50 : 40}
                            holdMs={lowPerf ? 800 : 900}
                            loop
                            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400"
                            cursor="|"
                        />
                    </span>
                </motion.h1>

                <p className="mt-5 max-w-2xl mx-auto text-white/70">
                    Automate calls — sales, payments, customer support, and even real estate lead qualification.
                    Purpose-built for Australian small businesses.
                </p>

                {/* ✅ FIXED CTA */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-cyan-400 transition"
                    >
                        Talk to us for demo
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                    </Link>
                </div>

                {/* KPI Strip */}
                <div className="mt-12 grid w-full max-w-4xl mx-auto grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                        {kpi: "Human-Free", label: "Fully automated voice workflows"},
                        {kpi: "High Performance", label: "Fast, reliable, and scalable AI operations"},
                        {kpi: "Secure", label: "Enterprise-grade data protection & privacy"},
                        {kpi: "Better Service", label: "Consistent, 24/7 customer engagement"},
                    ].map((s) => (
                        <GlassCard
                            key={s.label}
                            className="p-4 text-center"
                            safariLite
                        >
                            <p className="text-lg sm:text-xl font-extrabold">{s.kpi}</p>
                            <p className="mt-1 text-xs text-white/70">{s.label}</p>
                        </GlassCard>
                    ))}
                </div>
            </Section>
        </div>
    );
}
