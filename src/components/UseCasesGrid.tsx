"use client";
import Section from "./Section";
import GlassCard from "./GlassCard";
import {
    Rocket,
    ShieldCheck,
    Globe,
    Plug,
    Zap,
    Brain,
    ArrowRight,
} from "lucide-react";

export default function WhyChooseBluestag() {
    const items = [
        {
            icon: Rocket,
            title: "Hyper-Efficient Outreach",
            text:
                "Reach hundreds simultaneously with smart autodialing and adaptive conversation flows.",
        },
        {
            icon: ShieldCheck,
            title: "Secure Payments Built-In",
            text:
                "Verified links and encrypted processing directly inside the call for higher conversion.",
        },
        {
            icon: Globe,
            title: "Multilingual by Default",
            text:
                "Natural voice in 20+ major languages so your business sounds local anywhere.",
        },
        {
            icon: Plug,
            title: "No-Code Integrations",
            text:
                "Connect CRM, calendar, and POS in minutes—no developer required.",
        },
        {
            icon: Zap,
            title: "Ultra-Low Latency",
            text:
                "Sub-300ms global latency keeps conversations instant, natural, and human-like.",
        },
        {
            icon: Brain,
            title: "Continuously Learning",
            text:
                "Agents improve tone, intent recognition, and outcomes with every interaction.",
        },
    ];

    return (
        <Section id="why-bluestag" variant="tall">
            <h2 className="text-2xl md:text-3xl font-bold">Why choose Bluestag AI</h2>
            <p className="mt-2 text-white/70 max-w-2xl">
                Real-time voice intelligence, automation, and personalization—wrapped in a modern glass UI.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(({icon: Icon, title, text}) => (
                    <GlassCard key={title} className="group p-6 transition hover:bg-white/[0.08]">
                        <div className="flex items-start gap-4">
                            <div className="rounded-xl border border-white/15 bg-white/10 p-2">
                                <Icon className="h-5 w-5"/>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <p className="mt-1 text-sm text-white/70">{text}</p>
                            </div>
                        </div>
                        <div
                            className="mt-4 flex items-center text-xs text-white/60 opacity-0 transition group-hover:opacity-100">
                            Learn more <ArrowRight className="ml-1 h-3.5 w-3.5"/>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
}