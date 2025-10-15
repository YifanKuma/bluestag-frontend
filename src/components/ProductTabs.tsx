"use client";
import Link from "next/link";
import {useState} from "react";
import Section from "./Section";
import GlassCard from "./GlassCard";
import {
    PhoneCall,
    CreditCard,
    Headphones,
    Cpu,
    Zap,
    Play,
    Megaphone,
    Check,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import {INDUSTRIES} from "@/app/industries/data";

export default function ProductTabs() {
    const [activeTab, setActiveTab] = useState<"voice" | "campaign">("voice");

    return (
        <Section id="voice-ai" variant="tall">
            {/* --- Tab Selector --- */}
            <div
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur">
                <button
                    onClick={() => setActiveTab("voice")}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        activeTab === "voice" ? "bg-cyan-500 text-slate-900" : "hover:bg-white/5"
                    }`}
                >
                    Voice AI
                </button>
                <button
                    onClick={() => setActiveTab("campaign")}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        activeTab === "campaign" ? "bg-cyan-500 text-slate-900" : "hover:bg-white/5"
                    }`}
                >
                    Social Campaign Builder{" "}
                    <span className="ml-1 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px]">
            Coming soon
          </span>
                </button>
            </div>

            {/* --- Tabs Content --- */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {activeTab === "voice" && (
                    <>
                        {/* === Voice AI Section (no screenshot) === */}
                        <GlassCard className="lg:col-span-2 p-6">
                            <h3 className="text-2xl font-bold">Autonomous calling with live transfer</h3>
                            <p className="mt-2 text-white/70">
                                Call up to <strong>5 contacts concurrently</strong>. Detect intent, collect payments,
                                and escalate to humans when needed.
                            </p>

                            <ul className="mt-4 space-y-2 text-sm text-white/80">
                                {[
                                    {icon: PhoneCall, text: "Outbound & inbound with smart routing"},
                                    {icon: CreditCard, text: "Secure payment collection in-call"},
                                    {icon: Headphones, text: "Tier-1 customer service and FAQs"},
                                    {icon: Sparkles, text: "Smart customer interaction automation"},
                                ].map(({icon: Icon, text}) => (
                                    <li key={text} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4"/> {text}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 flex items-center gap-3 text-xs text-white/70">
                                <Cpu className="h-4 w-4"/> On-device + cloud | <Zap className="h-4 w-4"/> Realtime
                            </div>

                            <div className="mt-6">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400"
                                >
                                    Contact for Demo <Play className="h-4 w-4"/>
                                </Link>
                            </div>
                        </GlassCard>

                        {/* === Industry Links (all from industries/data.ts) === */}
                        <GlassCard className="p-6">
                            <h4 className="text-lg font-semibold">Built for Australian SMB workflows</h4>
                            <div
                                className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 text-sm">
                                {INDUSTRIES.map((ind) => (
                                    <Link
                                        key={ind.id}
                                        href={`/industries?industry=${ind.slug ?? ind.id}`}
                                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-cyan-500/10 transition-all"
                                    >
                                        <ind.icon className="h-4 w-4 text-cyan-400"/>
                                        <span>{ind.title}</span>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-4 text-xs text-white/60">
                                Native AU English voices, local latency, and compliance-first design.
                            </div>
                        </GlassCard>
                    </>
                )}

                {activeTab === "campaign" && (
                    <>
                        <GlassCard className="lg:col-span-2 p-6">
                            <h3 className="text-2xl font-bold">AI Social Campaign Builder</h3>
                            <p className="mt-2 text-white/70">
                                Generate, schedule, and track cross-platform campaigns. Turn phone insights into
                                content.
                            </p>

                            <ul className="mt-4 space-y-2 text-sm text-white/80">
                                {[
                                    "Auto-generate copy from call transcripts",
                                    "One-click posts to Meta, TikTok, LinkedIn",
                                    "Performance analytics with lead attribution",
                                ].map((t) => (
                                    <li key={t} className="flex items-center gap-2">
                                        <Check className="h-4 w-4"/> {t}
                                    </li>
                                ))}
                            </ul>

                            <div
                                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm">
                                Join waitlist <ChevronRight className="h-4 w-4"/>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 grid place-content-center">
                            <Megaphone className="h-10 w-10"/>
                            <p className="mt-3 text-sm text-white/70">Launching soon • 2026</p>
                        </GlassCard>
                    </>
                )}
            </div>
        </Section>
    );
}