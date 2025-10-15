"use client";

import {motion} from "framer-motion";
import {Sparkles} from "lucide-react";

export default function WhatIsAgent() {
    return (
        <section className="relative py-12">
            {/* background glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl top-0 left-1/3 animate-pulse"/>
                <div
                    className="absolute w-72 h-72 bg-blue-700/10 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse"/>
            </div>

            {/* heading */}
            <motion.div
                className="text-center"
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8, ease: "easeOut"}}
                viewport={{once: true}}
            >
                <div
                    className="inline-flex items-center gap-2 text-cyan-400 uppercase text-xs tracking-widest font-medium mb-3">
                    <Sparkles className="w-4 h-4"/>
                    Agentic AI Technology
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    What is <span className="text-cyan-400">Agentic AI?</span>
                </h2>
            </motion.div>

            {/* animated paragraphs */}
            <motion.div
                className="max-w-3xl mx-auto text-center text-white/70 mt-4 space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {staggerChildren: 0.25},
                    },
                }}
            >
                {[
                    "Agentic AI represents the next evolution of artificial intelligence — systems that don’t just respond, but reason, plan, and act independently.",
                    "Unlike static chatbots, Bluestag’s Agentic AI understands goals, manages context, and coordinates multiple tools or APIs to complete real-world tasks.",
                    "It brings autonomy, memory, and adaptability together — empowering businesses with human-free, high-performance, and secure automation that truly works like a digital teammate.",
                ].map((line, i) => (
                    <motion.p
                        key={i}
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0, transition: {duration: 0.6}},
                        }}
                    >
                        {line}
                    </motion.p>
                ))}
            </motion.div>
        </section>
    );
}