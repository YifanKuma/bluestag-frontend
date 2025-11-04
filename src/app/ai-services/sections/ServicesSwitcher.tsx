"use client";

import {useEffect, useMemo, useState, useCallback} from "react";
import {motion, AnimatePresence} from "framer-motion";
import VoiceAISection from "@/app/ai-services/sections/VoiceAISection";
import VideoAISection from "@/app/ai-services/sections/VideoAISection";
import AIChatbotSection from "@/app/ai-services/sections/AIChatbotSection";
import AppDevSection from "@/app/ai-services/sections/AppDevSection";
import SocialMediaSection from "@/app/ai-services/sections/SocialMediaSection";
import AIMSPSection from "@/app/ai-services/sections/AIMSPSection";

type TabKey = "voice" | "video" | "chatbot" | "appdev" | "social" | "managed";

const TABS: { key: TabKey; label: string }[] = [
    {key: "voice", label: "Voice AI"},
    {key: "video", label: "Video AI"},
    {key: "chatbot", label: "AI Chatbot"},
    {key: "appdev", label: "App Development"},
    {key: "social", label: "Social Media Management"},
    // {key: "managed", label: "AI MSP"},
];

export default function ServicesSwitcher() {
    // Wait until client-side to read hash
    const [hydrated, setHydrated] = useState(false);
    const [active, setActive] = useState<TabKey>("voice");

    // ✅ Run only once after hydration
    useEffect(() => {
        setHydrated(true);

        const currentHash = window.location.hash.replace("#", "");
        if (currentHash && TABS.some(t => t.key === currentHash)) {
            setActive(currentHash as TabKey);
        }
    }, []);

    // ✅ Watch for future hash changes (e.g., internal links)
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash && TABS.some(t => t.key === hash)) {
                setActive(hash as TabKey);
            }
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // ✅ Update URL when tab changes manually
    useEffect(() => {
        if (hydrated) {
            const newHash = `#${active}`;
            if (window.location.hash !== newHash) {
                window.history.replaceState(null, "", newHash);
            }
        }
    }, [active, hydrated]);

    const idx = useMemo(() => TABS.findIndex(t => t.key === active), [active]);

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "ArrowRight") {
                setActive(TABS[(idx + 1) % TABS.length].key);
            } else if (e.key === "ArrowLeft") {
                setActive(TABS[(idx - 1 + TABS.length) % TABS.length].key);
            }
        },
        [idx]
    );

    // ⏳ Prevent mismatch: render nothing until hydration completes
    if (!hydrated) return null;

    return (
        <div className="mx-auto max-w-7xl px-4">
            {/* Tabs */}
            <div
                className="relative mb-12 grid grid-cols-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1"
                role="tablist"
                aria-label="Service Tabs"
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {TABS.map(t => {
                    const isActive = t.key === active;
                    return (
                        <button
                            key={t.key}
                            id={`tab-${t.key}`}
                            role="tab"
                            type="button"
                            aria-selected={isActive}
                            aria-controls={`panel-${t.key}`}
                            onClick={() => setActive(t.key)}
                            className={`relative z-10 w-full rounded-xl px-4 py-2.5 text-sm transition text-center ${
                                isActive ? "text-white" : "text-white/70 hover:text-white"
                            }`}
                        >
                            {t.label}
                        </button>
                    );
                })}

                {/* Indicator */}
                <motion.span
                    layout
                    transition={{type: "spring", stiffness: 400, damping: 30}}
                    className="absolute inset-y-1 z-0 rounded-xl bg-white/10"
                    style={{
                        width: `calc(100% / ${TABS.length})`,
                        left: `calc(${idx} * (100% / ${TABS.length}))`,
                    }}
                />
            </div>

            {/* Panels */}
            <div className="mt-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.35}}
                    >
                        {active === "voice" && <VoiceAISection/>}
                        {active === "video" && <VideoAISection/>}
                        {active === "chatbot" && <AIChatbotSection/>}
                        {active === "appdev" && <AppDevSection/>}
                        {active === "social" && <SocialMediaSection/>}
                        {active === "managed" && <AIMSPSection/>}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}