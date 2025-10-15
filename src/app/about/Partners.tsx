"use client";
import {useRef} from "react";
import {partners} from "@/data/partners";

export default function Partners() {
    const trackRef = useRef<HTMLDivElement>(null);
    const items = [...partners, ...partners]; // loop
    return (
        <section className="relative py-12 md:py-16">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold">Achievements & Partners</h2>
                <p className="mt-2 text-white/70">We collaborate with forward-thinking teams.</p>
            </div>

            <div className="relative overflow-hidden group">
                <div
                    ref={trackRef}
                    className="flex gap-4 animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]"
                >
                    {items.map((p, i) => (
                        <div
                            key={`${p.name}-${i}`}
                            className="flex items-center justify-center rounded-2xl border border-white/10 h-20 w-48 shrink-0 bg-white/5 backdrop-blur"
                            title={p.name}
                        >
                            <span className="text-sm text-white/80">{p.name}</span>
                        </div>
                    ))}
                </div>
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b1020] to-transparent"/>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b1020] to-transparent"/>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <ul className="mt-6 rounded-2xl border border-white/10 p-6 bg-white/5 text-sm text-white/70 list-disc list-inside space-y-1">
                <li>Deployed parallel outbound calling across pilot cohorts</li>
                <li>Cut average handle time and improved booking conversion</li>
                <li>Integrated payments, calendars, and CRM for end-to-end flow</li>
            </ul>
        </section>
    );
}