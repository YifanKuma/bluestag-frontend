"use client";

import {useMemo, useState, useEffect} from "react";
import Section from "./Section";
import GlassCard from "./GlassCard";
import {Globe, Search, Check, Megaphone, ChevronDown, ChevronUp} from "lucide-react";
import type {LanguageItem} from "@/types/home-page";

export default function Languages({items}: { items: LanguageItem[] }) {
    const [q, setQ] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // ✅ 1. Alphabetically sorted items
    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) =>
            a.name.localeCompare(b.name, "en", {sensitivity: "base"})
        );
    }, [items]);

    // ✅ 2. Search filter applied to sorted items
    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return sortedItems;
        return sortedItems.filter(
            (l) =>
                l.name.toLowerCase().includes(term) ||
                l.native.toLowerCase().includes(term) ||
                l.code.toLowerCase().includes(term)
        );
    }, [q, sortedItems]);

    // Visible items
    const visible = useMemo(() => {
        if (expanded) return filtered;
        if (isMobile) return filtered.slice(0, 8);
        return filtered;
    }, [filtered, expanded, isMobile]);

    return (
        <Section id="languages" variant="tall" className="relative">
            <div className="max-w-3xl">
                <h2 className="text-3xl font-bold text-center md:text-left">
                    Supported languages
                </h2>
                <p className="mt-2 text-white/70 text-center md:text-left">
                    {items.length}+ languages with native accents and dialects — more on the way.
                </p>
            </div>

            {/* Search bar */}
            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/40"/>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search language…"
                        className="w-full sm:w-60 rounded-xl bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-sm outline-none focus:border-cyan-400 transition"
                    />
                </div>

                <div
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
                    <Globe className="h-4 w-4"/> {items.length} total
                </div>

                <div
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">
                    <Megaphone className="h-4 w-4"/> More coming soon
                </div>
            </div>

            {/* Grid */}
            <div
                className={`mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-all duration-300 ${
                    expanded ? "max-h-none" : isMobile ? "max-h-[580px] overflow-hidden" : ""
                }`}
            >
                {visible.map((l) => (
                    <GlassCard
                        key={l.id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.08] transition"
                        title={`${l.name} (${l.code})`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="grid h-7 w-7 place-content-center rounded-lg bg-white/10 border border-white/15">
                                <span aria-hidden>{l.flag ?? "🌐"}</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{l.name}</p>
                                <p className="text-xs text-white/60">{l.native}</p>
                            </div>
                        </div>
                        <Check className="h-4 w-4 text-cyan-300"/>
                    </GlassCard>
                ))}
            </div>

            {/* Show more on mobile */}
            {isMobile && filtered.length > 8 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 mx-auto"
                    >
                        {expanded ? (
                            <>
                                Show less <ChevronUp className="h-4 w-4"/>
                            </>
                        ) : (
                            <>
                                Show all ({filtered.length}) <ChevronDown className="h-4 w-4"/>
                            </>
                        )}
                    </button>
                </div>
            )}
        </Section>
    );
}
