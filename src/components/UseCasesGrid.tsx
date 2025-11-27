"use client";

import Section from "./Section";
import GlassCard from "./GlassCard";
import {PRODUCT_ICON_MAP} from "@/data/product";
import type {UseCaseItem} from "@/types/use-cases";

export default function UseCasesGrid({items}: { items: UseCaseItem[] }) {
    return (
        <Section id="use-cases" variant="tall">
            <h2 className="text-2xl md:text-3xl font-bold">Why choose Bluestag AI</h2>
            <p className="mt-2 text-white/70 max-w-2xl">
                Real-time voice intelligence, automation, and personalization
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => {
                    const Icon = item.icon_key
                        ? PRODUCT_ICON_MAP[item.icon_key]
                        : null;

                    return (
                        <GlassCard
                            key={item.id}
                            className="group p-6 transition hover:bg-white/[0.08]"
                        >
                            <div className="flex items-start gap-4">
                                <div className="rounded-xl border border-white/15 bg-white/10 p-2">
                                    {Icon ? (
                                        <Icon className="h-5 w-5"/>
                                    ) : (
                                        <div className="h-5 w-5 rounded-full bg-white/20"/>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-white/70">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>
        </Section>
    );
}
