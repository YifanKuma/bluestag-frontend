"use client";

import {useMemo, useState} from "react";
import Section from "./Section";
import GlassCard from "./GlassCard";
import {Globe, Search, Check} from "lucide-react";

type Lang = { code: string; name: string; native: string; flag?: string };

const LANGUAGES: Lang[] = [
    {code: "en", name: "English", native: "English", flag: "🇬🇧"},
    {code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文", flag: "🇨🇳"},
    {code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文", flag: "🇹🇼"},
    {code: "es", name: "Spanish", native: "Español", flag: "🇪🇸"},
    {code: "hi", name: "Hindi", native: "हिंदी", flag: "🇮🇳"},
    {code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦"},
    {code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹"},
    {code: "bn", name: "Bengali", native: "বাংলা", flag: "🇧🇩"},
    {code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺"},
    {code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵"},
    {code: "de", name: "German", native: "Deutsch", flag: "🇩🇪"},
    {code: "fr", name: "French", native: "Français", flag: "🇫🇷"},
    {code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷"},
    {code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹"},
    {code: "tr", name: "Turkish", native: "Türkçe", flag: "🇹🇷"},
    {code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳"},
    {code: "ur", name: "Urdu", native: "اردو", flag: "🇵🇰"},
    {code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩"},
    {code: "pl", name: "Polish", native: "Polski", flag: "🇵🇱"},
    {code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱"},
    {code: "th", name: "Thai", native: "ไทย", flag: "🇹🇭"},
    {code: "el", name: "Greek", native: "Ελληνικά", flag: "🇬🇷"},
    {code: "he", name: "Hebrew", native: "עברית", flag: "🇮🇱"},
    {code: "sv", name: "Swedish", native: "Svenska", flag: "🇸🇪"},
    {code: "da", name: "Danish", native: "Dansk", flag: "🇩🇰"},
    {code: "no", name: "Norwegian", native: "Norsk", flag: "🇳🇴"},
    {code: "fi", name: "Finnish", native: "Suomi", flag: "🇫🇮"},
    {code: "cs", name: "Czech", native: "Čeština", flag: "🇨🇿"},
    {code: "ro", name: "Romanian", native: "Română", flag: "🇷🇴"},
    {code: "hu", name: "Hungarian", native: "Magyar", flag: "🇭🇺"},
    {code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "🇲🇾"},
    {code: "tl", name: "Filipino", native: "Filipino", flag: "🇵🇭"},
    {code: "uk", name: "Ukrainian", native: "Українська", flag: "🇺🇦"},
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
                <h2 className="text-2xl md:text-3xl font-bold">Global language support</h2>
                <p className="mt-2 text-white/70">
                    30+ languages for real-time voice and chat. Native accents, fast latency.
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
                    <Globe className="h-4 w-4"/> More than 20 major languages
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