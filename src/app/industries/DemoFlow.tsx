"use client";
import {motion, AnimatePresence} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import type {Step} from "./data";

type Props = { steps: Step[]; speedMs?: number };

export default function DemoFlow({steps, speedMs = 1300}: Props) {
    const [index, setIndex] = useState(0);
    const timer = useRef<number | null>(null);

    // Reset when steps change
    useEffect(() => {
        setIndex(0);
        return () => {
            if (timer.current) window.clearInterval(timer.current);
            timer.current = null;
        };
    }, [steps]);

    // Advance through steps
    useEffect(() => {
        if (!steps?.length) return;
        if (index >= steps.length) return; // stop when finished

        timer.current = window.setInterval(() => {
            setIndex((i) => (i + 1 <= steps.length ? i + 1 : i));
        }, speedMs);

        return () => {
            if (timer.current) window.clearInterval(timer.current);
            timer.current = null;
        };
    }, [index, steps, speedMs]);

    return (
        <div className="relative bg-black/30 border border-white/10 rounded-xl p-5 overflow-hidden">
            <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sky-500/20 blur-3xl pointer-events-none"/>
            <div className="space-y-3">
                <AnimatePresence initial={false}>
                    {steps.slice(0, index).map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{opacity: 0, y: 10, scale: 0.98}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0}}
                            transition={{type: "spring", stiffness: 120, damping: 14}}
                            className={`max-w-[85%] ${s.actor === "Agent" ? "ml-auto" : ""}`}
                        >
                            <div
                                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow
                  ${s.actor === "Agent"
                                    ? "bg-sky-600/30 border border-sky-400/30"
                                    : "bg-white/10 border border-white/10"}`}
                            >
                <span className="text-[10px] uppercase tracking-widest opacity-70 block mb-1">
                  {s.actor}
                </span>
                                {s.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {index < steps.length && (
                <div className="mt-3 flex gap-1 items-center text-xs opacity-60">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"/>
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:120ms]"/>
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:240ms]"/>
                    <span className="ml-2">Agent typing…</span>
                </div>
            )}
        </div>
    );
}