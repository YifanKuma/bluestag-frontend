"use client";

import {useMemo, useState, useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useSearchParams} from "next/navigation";
import {INDUSTRIES} from "@/data/industries";
import IndustryPanel from "./IndustryPanel";

export default function IndustriesContent() {
    const searchParams = useSearchParams();

    // derive initial index once (prevents first-render swap flicker)
    const initialIndex = useMemo(() => {
        const slug = searchParams.get("industry");
        if (!slug) return 0;
        const idx = INDUSTRIES.findIndex(i => i.id === slug || i.slug === slug);
        return idx === -1 ? 0 : idx;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams?.toString()]);

    const [activeIndex, setActiveIndex] = useState(initialIndex);
    useEffect(() => setActiveIndex(initialIndex), [initialIndex]);

    const active = INDUSTRIES[activeIndex];

    return (
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left — Industry Selector */}
            <div className="space-y-3 flex flex-col justify-center">
                {INDUSTRIES.map((ind, i) => (
                    <motion.button
                        key={ind.id}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        onClick={() => setActiveIndex(i)}
                        className={[
                            "w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300",
                            activeIndex === i
                                ? "border-sky-400 bg-sky-500/10 shadow-lg"
                                : "border-white/10 bg-white/5 hover:bg-white/10"
                        ].join(" ")}
                    >
                        <div className="flex items-center gap-3">
                            <ind.icon className={`w-6 h-6 ${activeIndex === i ? "text-sky-400" : "text-gray-400"}`}/>
                            <h3 className={`text-lg font-semibold ${activeIndex === i ? "text-white" : "text-gray-300"}`}>
                                {ind.title}
                            </h3>
                        </div>
                        <p className={`text-sm mt-1 ${activeIndex === i ? "text-gray-300" : "text-gray-500"}`}>
                            {ind.summary}
                        </p>
                    </motion.button>
                ))}
            </div>

            {/* Right — Animated Detail Panel */}
            <div className="relative overflow-hidden rounded-3xl">
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={active.id}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.25, ease: "easeOut"}}
                    >
                        <IndustryPanel industry={active}/>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}