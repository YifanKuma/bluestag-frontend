"use client";

import {useState, useEffect, useMemo, useCallback} from "react";
import {motion, AnimatePresence} from "framer-motion";

type Tab = {
    key: string;
    label: string;
};

export default function SwitchTabsClient({
                                             tabs,
                                             components
                                         }: {
    tabs: Tab[];
    components: Record<string, React.ReactNode>;
}) {
    const [hydrated, setHydrated] = useState(false);
    const [active, setActive] = useState(tabs[0]?.key);

    useEffect(() => {
        setHydrated(true);

        const hash = window.location.hash.replace("#", "");
        if (hash && tabs.some((t) => t.key === hash)) {
            setActive(hash);
        }
    }, [tabs]);

    useEffect(() => {
        const handler = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash && tabs.some((t) => t.key === hash)) {
                setActive(hash);
            }
        };
        window.addEventListener("hashchange", handler);
        return () => window.removeEventListener("hashchange", handler);
    }, [tabs]);

    useEffect(() => {
        if (hydrated && active) {
            const newHash = `#${active}`;
            if (window.location.hash !== newHash) {
                window.history.replaceState(null, "", newHash);
            }
        }
    }, [active, hydrated]);

    const idx = useMemo(
        () => tabs.findIndex((t) => t.key === active),
        [active, tabs]
    );

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "ArrowRight") {
                setActive(tabs[(idx + 1) % tabs.length].key);
            } else if (e.key === "ArrowLeft") {
                setActive(tabs[(idx - 1 + tabs.length) % tabs.length].key);
            }
        },
        [idx, tabs]
    );

    if (!hydrated) return null;

    return (
        <div className="mx-auto max-w-7xl px-4">
            {/* TAB BAR */}
            <div
                className="relative mb-12 flex overflow-x-auto gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 no-scrollbar sm:grid sm:grid-cols-5"
                role="tablist"
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {tabs.map((t) => {
                    const isActive = active === t.key;

                    return (
                        <button
                            key={t.key}
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActive(t.key)}
                            className={`relative z-10 flex-shrink-0 whitespace-nowrap 
                                rounded-xl px-4 py-2.5 text-sm transition text-center
                                ${
                                isActive
                                    ? "text-white bg-white/10"
                                    : "text-white/70 hover:text-white"
                            }`}
                        >
                            <span className="relative inline-block">
                                {t.label}

                                {isActive && (
                                    <motion.span
                                        layoutId="tabs-underline"
                                        className="
                                            absolute left-0 right-0 -bottom-[6px] h-[3px]
                                            rounded-full bg-[#6ee7ff]
                                            shadow-[0_0_12px_3px_rgba(110,231,255,0.6)]
                                        "
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 22,
                                        }}
                                    />
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* CONTENT */}
            <div className="mt-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.35}}
                    >
                        {components[active]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
