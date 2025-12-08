"use client";

import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
} from "framer-motion";
import {useRef, useState} from "react";
import Link from "next/link";
import DemoFlow from "./DemoFlow";

import type {IndustryItem} from "@/types/industries";
import {ICON_MAP} from "@/data/industry-icons";

type Props = {
    industry: IndustryItem;
    isMobile?: boolean;
    isActive?: boolean;
    onSelectAction?: () => void;
};

export default function IndustryPanel({
                                          industry,
                                          isMobile,
                                          isActive,
                                          onSelectAction,
                                      }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const glowX = useTransform(mouseX, v => `${v}px`);
    const glowY = useTransform(mouseY, v => `${v}px`);

    const handleMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleClick = () => {
        if (isMobile && onSelectAction) onSelectAction();
    };

    // Strict safe icon resolving
    const Icon =
        ICON_MAP[industry.icon_key] ??
        ICON_MAP.default;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onClick={handleClick}
            data-industry={industry.id}
            className={`relative overflow-hidden group bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-lg transition-all duration-300 ${
                isActive ? "border-sky-400/40" : ""
            } ${isMobile ? "cursor-pointer" : ""}`}
        >
            {/* Hover Glow */}
            <motion.div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-sky-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{left: glowX, top: glowY}}
            />

            {/* Header */}
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <Icon className="w-10 h-10 text-sky-400 drop-shadow-lg"/>
                    <h3 className="text-3xl font-bold">{industry.title}</h3>
                </div>

                <p className="text-gray-300 mb-4">{industry.summary}</p>

                {/* Bullets */}
                {industry.bullets?.length && (
                    <ul className="mt-4 space-y-2 text-gray-300">
                        {industry.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 items-start">
                                <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sky-400/80"/>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* CTA */}
                {industry.cta && (
                    <div className="mt-6">
                        {(() => {
                            const raw = industry.cta.href || "";
                            const safeHref =
                                raw.startsWith("/")
                                    ? raw
                                    : "/" + raw.trim().replace(/\s+/g, "-").toLowerCase();

                            return (
                                <Link
                                    href={safeHref}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 font-medium transition-all duration-300"
                                >
                                    {industry.cta.label}
                                </Link>
                            );
                        })()}
                    </div>
                )}

            </div>

            {/* Desktop Demo Flow */}
            {!isMobile && industry.demo?.length && (
                <div className="relative z-10 mt-10">
                    <DemoFlow steps={industry.demo}/>

                    <button
                        onClick={() => setOpen(o => !o)}
                        className="mt-4 text-sm text-sky-300 hover:text-sky-200 underline underline-offset-4"
                    >
                        {open ? "Hide technical notes" : "Show technical notes"}
                    </button>

                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                initial={{height: 0, opacity: 0}}
                                animate={{height: "auto", opacity: 1}}
                                exit={{height: 0, opacity: 0}}
                                transition={{duration: 0.3}}
                                className="overflow-hidden"
                            >
                                <div
                                    className="mt-3 text-xs text-gray-400 space-y-2 bg-black/30 border border-white/10 rounded-xl p-4">
                                    <p><span className="font-semibold text-gray-300">How it works:</span> ASR → NLU →
                                        Policy Engine → Tools → TTS</p>
                                    <p><span className="font-semibold text-gray-300">Integrations:</span> Calendars,
                                        CRMs, SMS/email, payments</p>
                                    <p><span className="font-semibold text-gray-300">Controls:</span> Guardrails + human
                                        handoff</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
}
