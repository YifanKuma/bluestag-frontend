"use client";

import {useCallback, useMemo, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import VoiceAISection from "@/app/ai-services/sections/VoiceAISection";
import ManagedITSection from "@/app/ai-services/sections/ManagedITSection";
import SocialMediaSection from "@/app/ai-services/sections/SocialMediaSection";
import AIChatbotSection from "@/app/ai-services/sections/AIChatbotSection";

type TabKey = "voice" | "social" | "managed" | "chatbot";

const TABS: { key: TabKey; label: string }[] = [
    {key: "voice", label: "Voice AI"},
    {key: "social", label: "Social Media Management"},
    {key: "managed", label: "Management IT Services"},
    {key: "chatbot", label: "AI Chatbot"},
];

export default function ServicesSwitcher() {
    const [active, setActive] = useState<TabKey>("voice"); // keep your default
    const idx = useMemo(() => TABS.findIndex(t => t.key === active), [active]);

    const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowRight") {
            setActive(TABS[(idx + 1) % TABS.length].key);
        } else if (e.key === "ArrowLeft") {
            setActive(TABS[(idx - 1 + TABS.length) % TABS.length].key);
        }
    }, [idx]);

    return (
        <div className="mx-auto max-w-7xl px-4">
            {/* tabs: equal-width grid + improved spacing */}
            <div
                className="relative mb-12 grid grid-cols-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1"
                role="tablist"
                aria-label="Service Tabs"
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {TABS.map((t, i) => {
                    const isActive = t.key === active;
                    return (
                        <button
                            key={t.key}
                            role="tab"
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

                {/* animated active pill — simpler & exact */}
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

            {/* tab panels with smooth crossfade */}
            <div className="mt-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.35}}
                    >
                        {active === "voice" && (
                            <div id="panel-voice" role="tabpanel" aria-labelledby="tab-voice">
                                <VoiceAISection/>
                            </div>
                        )}
                        {active === "social" && (
                            <div id="panel-social" role="tabpanel" aria-labelledby="tab-social">
                                <SocialMediaSection/>
                            </div>
                        )}
                        {active === "managed" && (
                            <div id="panel-managed" role="tabpanel" aria-labelledby="tab-managed">
                                <ManagedITSection/>
                            </div>
                        )}
                        {active === "chatbot" && (
                            <div id="panel-chatbot" role="tabpanel" aria-labelledby="tab-chatbot">
                                <AIChatbotSection/>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}