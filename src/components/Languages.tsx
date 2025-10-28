"use client";

import {useMemo, useState} from "react";
import Section from "./Section";
import GlassCard from "./GlassCard";
import {Globe, Search, Check, Megaphone} from "lucide-react";

type Lang = { code: string; name: string; native: string; flag?: string };

// ✅ Alphabetical, unique codes
const LANGUAGES: Lang[] = [
    {code: "bg", name: "Bulgarian", native: "Български", flag: "🇧🇬"},
    {code: "zh", name: "Chinese", native: "中文", flag: "🇨🇳"},
    {code: "cs", name: "Czech", native: "Čeština", flag: "🇨🇿"},
    {code: "da", name: "Danish", native: "Dansk", flag: "🇩🇰"},
    {code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱"},
    {code: "en-US", name: "English (US)", native: "English (US)", flag: "🇺🇸"},
    {code: "fi", name: "Finnish", native: "Suomi", flag: "🇫🇮"},
    {code: "fr", name: "French", native: "Français", flag: "🇫🇷"},
    {code: "de", name: "German", native: "Deutsch", flag: "🇩🇪"},
    {code: "el", name: "Greek", native: "Ελληνικά", flag: "🇬🇷"},
    {code: "hu", name: "Hungarian", native: "Magyar", flag: "🇭🇺"},
    {code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹"},
    {code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵"},
    {code: "pl", name: "Polish", native: "Polski", flag: "🇵🇱"},
    {code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹"},
    {code: "ro", name: "Romanian", native: "Română", flag: "🇷🇴"},
    {code: "sk", name: "Slovak", native: "Slovenčina", flag: "🇸🇰"},
    {code: "es", name: "Spanish", native: "Español", flag: "🇪🇸"},
    {code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳"},
];

export default function Languages() {
    const [q, setQ] = useState("");
    const [expanded, setExpanded] = useState(false);

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return LANGUAGES;
        return LANGUAGES.filter(
            (l) =>
                l.name.toLowerCase().includes(term) ||
                l.native.toLowerCase().includes(term) ||
                l.code.toLowerCase().includes(term)
        );
    }, [q]);

    const visible = expanded ? filtered : filtered.slice(0, 24);

    return (
        <Section id="languages" variant="tall" className="relative">
            <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-bold">Supported languages</h2>
                <p className="mt-2 text-white/70">
                    {LANGUAGES.length}+ languages with native accents and dialects — more on the way.
                </p>
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/40"/>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search language…"
                        className="rounded-xl bg-white/5 border border-white/10 pl-9 pr-3 py-2 text-sm outline-none focus:border-cyan-400"
                    />
                </div>
                <div
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
                    <Globe className="h-4 w-4"/> {LANGUAGES.length} languages today
                </div>
                <div
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">
                    <Megaphone className="h-4 w-4"/> More languages are coming soon
                </div>
            </div>

            {/* Grid */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {visible.map((l) => (
                    <GlassCard
                        key={l.code}
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

            {/* Show more / less */}
            {filtered.length > 24 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                    >
                        {expanded ? "Show less" : `Show all (${filtered.length})`}
                    </button>
                </div>
            )}
        </Section>
    );
}