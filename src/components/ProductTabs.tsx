"use client";

import {useState} from "react";
import Link from "next/link";
import {motion, AnimatePresence} from "framer-motion";

import Section from "./Section";
import GlassCard from "./GlassCard";

import type {ProductTab, ProductIndustry} from "@/types/product-tab";
import {PRODUCT_ICON_MAP} from "@/data/product";
import {BADGE_ICON_MAP} from "@/data/badges";
import {INDUSTRY_ICON_MAP} from "@/data/industries-icon";


// 🔥 Accept industries as prop
export default function ProductTabs({
                                        tabs,
                                        industries,
                                    }: {
    tabs: ProductTab[];
    industries: ProductIndustry[];
}) {
    const [active, setActive] = useState(tabs[0]?.slug);
    const activeTab = tabs.find((t) => t.slug === active);

    if (!activeTab) return null;

    return (
        <Section id="services" variant="tall">
            {/* -------- TOP TABS -------- */}
            <div className="flex items-center justify-center">
                <div
                    className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.slug}
                            onClick={() => setActive(tab.slug)}
                            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                                active === tab.slug
                                    ? "bg-cyan-500 text-slate-900 shadow-lg"
                                    : "hover:bg-white/10 text-white/80"
                            }`}
                        >
                            {tab.tab_label || tab.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* -------- PANELS -------- */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab.slug}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    transition={{duration: 0.25}}
                    className="mt-10 grid gap-8 lg:grid-cols-3"
                >
                    {/* -------- LEFT PANEL -------- */}
                    <GlassCard className="p-10 lg:col-span-2">
                        <h3 className="text-3xl font-bold">{activeTab.title}</h3>

                        <p className="mt-3 text-white/70 text-lg">
                            {activeTab.description}
                        </p>

                        {/* Features */}
                        <ul className="mt-6 space-y-3 text-white/80">
                            {activeTab.features?.map((f) => {
                                const Icon = PRODUCT_ICON_MAP[f.icon_key];
                                return (
                                    <li key={f.id} className="flex items-center gap-3">
                                        {Icon && <Icon className="h-5 w-5 text-cyan-400"/>}
                                        {f.text}
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Badges */}
                        {!!activeTab.badge?.length && (
                            <div className="flex items-center gap-6 mt-8 text-white/60">
                                {activeTab.badge.map((b) => {
                                    const BadgeIcon =
                                        BADGE_ICON_MAP[b.badge_icon_key] ??
                                        BADGE_ICON_MAP.default;

                                    return (
                                        <div
                                            key={b.id}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <BadgeIcon className="h-4 w-4 text-cyan-400"/>
                                            {b.badge_text}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* CTA Button */}
                        {activeTab.cta_link && (
                            <Link
                                href={activeTab.cta_link}
                                className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-xl bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition"
                            >
                                {activeTab.cta_label || "Learn More"} →
                            </Link>
                        )}
                    </GlassCard>

                    {/* -------- RIGHT PANEL (INDUSTRIES LIST) -------- */}
                    <GlassCard className="p-8">
                        <h4 className="text-xl font-semibold">
                            Built for Australian SMB workflows
                        </h4>

                        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {industries.map((ind) => {
                                const Icon =
                                    INDUSTRY_ICON_MAP[ind.icon_key] ??
                                    INDUSTRY_ICON_MAP.default;

                                return (
                                    <Link
                                        key={ind.id}
                                        href={{
                                            pathname: "/industries",
                                            query: {industry: ind.slug},
                                            hash: "industry-detail",
                                        }}
                                        className="flex flex-col justify-center items-start gap-2
                                            p-4 rounded-2xl border border-white/10 bg-white/5
                                            hover:bg-cyan-500/10 transition"
                                    >
                                        {Icon && <Icon className="h-5 w-5 text-cyan-400"/>}

                                        <span className="text-sm font-medium leading-tight text-white">
                                            {ind.title}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>

                        <p className="mt-6 text-xs text-white/50">
                            Native AU English voices, local latency, and
                            compliance-first design.
                        </p>
                    </GlassCard>
                </motion.div>
            </AnimatePresence>
        </Section>
    );
}
