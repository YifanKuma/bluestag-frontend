"use client";
import Section from "./Section";
import GlassCard from "./GlassCard";
import {Play, PhoneCall} from "lucide-react";

export default function DemoBanner() {
    return (
        <Section id="pricing" className="py-12">
            <GlassCard className="p-6 md:p-8">
                <div className="grid items-center gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-2xl font-bold">Hear it live</h3>
                        <p className="mt-2 text-white/70">Listen to a sample call and see how the agent handles
                            branching scenarios.</p>
                        <div className="mt-4 flex flex-wrap gap-3 text-sm">
                            <button
                                className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-400 inline-flex items-center gap-2">
                                <Play className="h-4 w-4"/> Play sample
                            </button>
                            <button
                                className="rounded-xl border border-white/20 px-4 py-2 font-semibold hover:bg-white/5 inline-flex items-center gap-2">
                                <PhoneCall className="h-4 w-4"/> Book a live demo
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="relative h-56 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent">
                            <div className="absolute inset-0 grid place-content-center text-white/60">Audio waveform /
                                Screenshot
                            </div>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </Section>
    );
}
