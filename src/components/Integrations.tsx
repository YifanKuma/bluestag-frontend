"use client";
import Section from "./Section";
import GlassCard from "./GlassCard";
import {Globe, Mail, CreditCard, LineChart, Shield, Zap} from "lucide-react";

export default function Integrations() {
    const icons = [Globe, Mail, CreditCard, LineChart, Shield, Zap];
    return (
        <Section id="about" className="py-12">
            <h2 className="text-2xl md:text-3xl font-bold">Plug into your stack</h2>
            <p className="mt-2 text-white/70">Native connectors and webhooks. Zero heavy lifting.</p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {icons.map((Icon, i) => (
                    <GlassCard key={i} className="grid place-content-center p-6 hover:bg-white/[0.08] transition">
                        <Icon className="h-6 w-6" />
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
}