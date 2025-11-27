"use client";

import {useMemo, useState, useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useSearchParams} from "next/navigation";
import IndustryPanel from "./IndustryPanel";
import {ICON_MAP} from "@/data/industry-icons";
import {IndustryItem} from "@/types/industries";

export default function IndustriesContent({
                                              industries,
                                          }: {
    industries: IndustryItem[];
}) {
    const searchParams = useSearchParams();

    const initialIndex = useMemo(() => {
        const slug = searchParams.get("industry");
        if (!slug) return 0;
        const idx = industries.findIndex(
            (i) => i.slug === slug || i.id === slug
        );
        return idx === -1 ? 0 : idx;
    }, [searchParams, industries]);

    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => setActiveIndex(initialIndex), [initialIndex]);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const active = industries[activeIndex];

    return (
        <>
            {isMobile ? (
                <div className="block lg:hidden px-4">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Choose Your Industry
                    </h2>

                    <div className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-4 scrollbar-hide">
                        {industries.map((ind, i) => {
                            const Icon = ICON_MAP[ind.icon_key];
                            return (
                                <div
                                    key={ind.id}
                                    className="min-w-[90%] snap-center flex-shrink-0"
                                    onClick={() => setActiveIndex(i)}
                                >
                                    <motion.div
                                        whileHover={{scale: 1.02}}
                                        className={`rounded-2xl border p-5 transition-all duration-300 break-words whitespace-normal text-wrap ${
                                            activeIndex === i
                                                ? "border-sky-400 bg-sky-500/10"
                                                : "border-white/10 bg-white/5 hover:bg-white/10"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3 mb-2">
                                            <Icon
                                                className={`w-6 h-6 mt-1 ${
                                                    activeIndex === i
                                                        ? "text-sky-400"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                            <h3
                                                className={`text-lg font-semibold leading-snug ${
                                                    activeIndex === i
                                                        ? "text-white"
                                                        : "text-gray-300"
                                                }`}
                                            >
                                                {ind.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {ind.summary}
                                        </p>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8">
                        <IndustryPanel industry={active}/>
                    </div>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="space-y-3 flex flex-col justify-center">
                        {industries.map((ind, i) => {
                            const Icon = ICON_MAP[ind.icon_key];
                            return (
                                <motion.button
                                    key={ind.id}
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    onClick={() => setActiveIndex(i)}
                                    className={[
                                        "w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300",
                                        activeIndex === i
                                            ? "border-sky-400 bg-sky-500/10 shadow-lg"
                                            : "border-white/10 bg-white/5 hover:bg-white/10",
                                    ].join(" ")}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            className={`w-6 h-6 ${
                                                activeIndex === i
                                                    ? "text-sky-400"
                                                    : "text-gray-400"
                                            }`}
                                        />
                                        <h3
                                            className={`text-lg font-semibold ${
                                                activeIndex === i
                                                    ? "text-white"
                                                    : "text-gray-300"
                                            }`}
                                        >
                                            {ind.title}
                                        </h3>
                                    </div>
                                    <p
                                        className={`text-sm mt-1 ${
                                            activeIndex === i
                                                ? "text-gray-300"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {ind.summary}
                                    </p>
                                </motion.button>
                            );
                        })}
                    </div>

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
            )}
        </>
    );
}
