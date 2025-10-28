"use client";

import {motion} from "framer-motion";
import {ArrowRight} from "lucide-react";
import Section from "./Section";
import Tag from "./Tag";
import GlassCard from "./GlassCard";
import RotatingTyped from "./RotatingTyped";

export default function Hero() {
    return (
        <div className="relative overflow-hidden">
            {/* Background gradients (non-blocking for clicks) */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl"/>
                <div className="absolute left-[15%] top-[50%] h-64 w-64 rounded-full bg-sky-500/20 blur-3xl"/>
                <div className="absolute right-[10%] top-[40%] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"/>
            </div>

            <Section id="home" variant="full" className="text-center">
                <Tag>BLUESTAG · AI Voice for Aussie SMBs</Tag>

                {/* Animated Title with typed words on the second line */}
                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
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
                typingMs={90}
                backspaceMs={40}
                holdMs={900}
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

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href="contact"
                        className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-cyan-400 transition"
                    >
                        Talk to us for demo
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                    </a>
                </div>

                {/* KPI Strip */}
                <div className="mt-12 grid w-full max-w-4xl mx-auto grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                        {kpi: "Human-Free", label: "Fully automated voice workflows"},
                        {kpi: "High Performance", label: "Fast, reliable, and scalable AI operations"},
                        {kpi: "Secure", label: "Enterprise-grade data protection & privacy"},
                        {kpi: "Better Service", label: "Consistent, 24/7 customer engagement"},
                    ].map((s) => (
                        <GlassCard key={s.label} className="p-4 text-center">
                            <p className="text-lg sm:text-xl font-extrabold">{s.kpi}</p>
                            <p className="mt-1 text-xs text-white/70">{s.label}</p>
                        </GlassCard>
                    ))}
                </div>
            </Section>
        </div>
    );
}