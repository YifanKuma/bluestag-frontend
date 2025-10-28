"use client";

import {motion} from "framer-motion";
import {Sparkles, CheckCircle2} from "lucide-react";

export default function OurVision() {
    return (
        <section id="our-vision" className="mt-14">
            <motion.div
                initial={{opacity: 0, y: 14}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.45}}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/6 to-white/[0.03] p-6 backdrop-blur"
            >
                <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/30">
                        <Sparkles className="h-5 w-5 text-emerald-300" />
                    </div>
                    <h3 className="text-xl font-semibold">Our Vision</h3>
                </div>

                <p className="text-white/80 leading-relaxed">
                    A world where voice and AI agents collaborate with people to deliver
                    effortless service everywhere—fast, accurate, and delightfully human.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-white/75">
                    {[
                        "Human-in-the-loop by design",
                        "Agentic workflows across channels",
                        "Responsible AI that earns trust",
                    ].map((li) => (
                        <li key={li} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-300" />
                            <span>{li}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </section>
    );
}