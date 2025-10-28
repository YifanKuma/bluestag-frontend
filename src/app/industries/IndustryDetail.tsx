"use client";

import {motion, AnimatePresence, useMotionValue, useTransform} from "framer-motion";
import {useState, useRef} from "react";
import Link from "next/link";
import DemoFlow from "./DemoFlow";
import type {Industry} from "../../data/industries";

export default function IndustryDetail({ind}: { ind: Industry }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const glowX = useTransform(mouseX, (x) => `${x}px`);
    const glowY = useTransform(mouseY, (y) => `${y}px`);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    return (
        <motion.div
            id="industry-detail"                 // ✅ anchor for hash links
            data-industry={ind.id}               // ✅ keep which industry is shown
            ref={ref}
            onMouseMove={handleMouseMove}
            initial={{opacity: 0, y: 40}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-80px"}}
            transition={{duration: 0.7, ease: "easeOut"}}
            className="relative overflow-hidden group bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-lg hover:shadow-sky-500/20 scroll-mt-24" // ✅ scroll offset for fixed navbar
            tabIndex={-1}                         // ♿ allows focus when jumping
        >
            {/* Glow effect following mouse */}
            <motion.div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-sky-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{left: glowX, top: glowY}}
            />

            <div className="grid lg:grid-cols-2 gap-10 relative z-10">
                {/* Left: info */}
                <div>
                    <motion.div
                        whileHover={{scale: 1.05}}
                        transition={{type: "spring", stiffness: 150, damping: 10}}
                        className="flex items-center gap-4 mb-4"
                    >
                        <ind.icon className="w-10 h-10 text-sky-400 drop-shadow-lg"/>
                        <h3 className="text-3xl font-bold">{ind.title}</h3>
                    </motion.div>

                    <p className="text-gray-300 mb-4">{ind.summary}</p>

                    <ul className="mt-5 space-y-2 text-gray-300">
                        {ind.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 items-start">
                                <motion.span
                                    initial={{scale: 0}}
                                    whileInView={{scale: 1}}
                                    transition={{delay: i * 0.1}}
                                    className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sky-400/80"
                                />
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>

                    {ind.cta && (
                        <div className="mt-6">
                            <Link
                                href={ind.cta.href}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 font-medium"
                            >
                                {ind.cta.label}
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right: interactive demo */}
                <motion.div
                    initial={{scale: 0.95, opacity: 0}}
                    whileInView={{scale: 1, opacity: 1}}
                    transition={{duration: 0.6}}
                >
                    <DemoFlow steps={ind.demo}/>
                    <button
                        onClick={() => setOpen(!open)}
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
                                transition={{duration: 0.35}}
                                className="overflow-hidden"
                            >
                                <div
                                    className="mt-3 text-xs text-gray-400 space-y-2 bg-black/30 border border-white/10 rounded-xl p-4">
                                    <p><span className="font-semibold text-gray-300">How it works:</span> ASR → NLU →
                                        Policy Engine → Tool Calls → TTS.</p>
                                    <p><span className="font-semibold text-gray-300">Integrations:</span> Calendars,
                                        CRMs, SMS/email, payments, and more.</p>
                                    <p><span className="font-semibold text-gray-300">Controls:</span> Guardrails and
                                        hand-off for sensitive actions.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}