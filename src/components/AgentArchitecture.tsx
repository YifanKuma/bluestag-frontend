"use client";

import {motion} from "framer-motion";
import {
    Eye,
    Brain,
    Cpu,
    PlugZap,
    Workflow,
    Volume2,
    Sparkles,
    ArrowRight,
} from "lucide-react";

const modules = [
    {
        title: "Perception & Understanding",
        desc: "The agent listens, observes, and interprets information — transforming speech, text, and data into structured meaning.",
        Icon: Eye,
    },
    {
        title: "Memory & Context Awareness",
        desc: "It remembers users, history, and goals — ensuring every decision considers past interactions and long-term objectives.",
        Icon: Brain,
    },
    {
        title: "Reasoning & Decision-Making",
        desc: "Through planning and logic, the agent forms a step-by-step strategy to achieve its objective while respecting safety and policy rules.",
        Icon: Cpu,
    },
    {
        title: "Tool Use & Real-World Action",
        desc: "The agent connects to APIs, CRMs, and business systems — booking meetings, processing payments, sending messages, or retrieving data.",
        Icon: PlugZap,
    },
    {
        title: "Orchestration & Adaptation",
        desc: "It coordinates multiple tasks in parallel, handles errors, and adapts to dynamic conditions — staying efficient and reliable.",
        Icon: Workflow,
    },
    {
        title: "Continuous Learning & Response",
        desc: "Every interaction strengthens the system. Responses become more natural, precise, and human-like over time.",
        Icon: Volume2,
    },
];

export default function AgentArchitecture() {
    return (
        <section className="relative mt-12">
            {/* soft animated glow */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl top-10 left-1/4 animate-pulse"/>
                <div
                    className="absolute w-72 h-72 bg-blue-700/10 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse"/>
            </div>

            {/* header */}
            <motion.div
                className="text-center mb-10"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                viewport={{once: true}}
            >
                <div
                    className="inline-flex items-center gap-2 text-cyan-400 uppercase text-xs tracking-widest font-medium mb-3">
                    <Sparkles className="w-4 h-4"/>
                    Agentic AI Framework
                </div>
                <h3 className="text-2xl md:text-4xl font-bold">
                    How <span className="text-cyan-400">Agentic AI</span> perceives, thinks, and acts
                </h3>
                <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                    Agentic AI goes beyond static automation — it senses context, reasons about goals, takes initiative,
                    and acts autonomously across tools and systems.
                </p>
            </motion.div>

            {/* animated card grid */}
            <motion.div
                className="grid md:grid-cols-3 gap-6 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.2}}
                variants={{
                    hidden: {},
                    visible: {transition: {staggerChildren: 0.1}},
                }}
            >
                {modules.map(({title, desc, Icon}) => (
                    <motion.div
                        key={title}
                        variants={{
                            hidden: {opacity: 0, y: 16, scale: 0.98},
                            visible: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {duration: 0.45, ease: "easeOut"},
                            },
                        }}
                        whileHover={{
                            y: -4,
                            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
                        }}
                        className="group rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur-md transition will-change-transform"
                    >
                        <Icon className="h-7 w-7 text-cyan-400 mb-3"/>
                        <h4 className="font-semibold">{title}</h4>
                        <p className="mt-2 text-sm text-white/70">{desc}</p>
                        <div className="mt-4 h-[2px] w-0 group-hover:w-full bg-cyan-400/60 transition-[width]"/>
                    </motion.div>
                ))}
            </motion.div>

            {/* process summary */}
            <p className="mt-10 text-center text-sm text-white/60 max-w-2xl mx-auto leading-relaxed">
                In Bluestag’s <span className="text-cyan-400">Agentic AI</span> model, every interaction follows a
                feedback loop:{" "}
                <span className="text-white">Perceive → Understand → Plan → Act → Reflect</span>.
                This creates a self-improving system capable of autonomous reasoning, adaptive tool use, and continuous
                learning — enabling truly human-free, high-performance automation.
            </p>

            {/* comparison section */}
            <motion.div
                className="mt-20 text-center"
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.7, ease: "easeOut"}}
                viewport={{once: true}}
            >
                <h4 className="text-2xl md:text-3xl font-bold mb-4">
                    Agentic AI <span className="text-cyan-400">vs</span> Generative AI
                </h4>
                <p className="text-white/70 mb-10 max-w-2xl mx-auto">
                    Generative AI creates — Agentic AI executes.
                    Here’s how the new generation of AI redefines autonomy and performance.
                </p>

                {/* comparison cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Generative AI */}
                    <motion.div
                        whileHover={{y: -4}}
                        className="rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur-md"
                    >
                        <h5 className="text-lg font-semibold mb-3 text-white">Generative AI</h5>
                        <ul className="text-sm text-white/70 space-y-2 text-left">
                            <li>• Focuses on producing content (text, image, audio).</li>
                            <li>• Responds passively to user prompts.</li>
                            <li>• Lacks long-term memory or persistent goals.</li>
                            <li>• Operates in isolation — cannot take real-world action.</li>
                            <li>• Ideal for creativity, summarization, or ideation.</li>
                        </ul>
                    </motion.div>

                    {/* Agentic AI */}
                    <motion.div
                        whileHover={{y: -4}}
                        className="rounded-2xl border border-cyan-400/20 p-6 bg-cyan-500/5 backdrop-blur-md"
                    >
                        <h5 className="text-lg font-semibold mb-3 text-cyan-400">Agentic AI</h5>
                        <ul className="text-sm text-white/70 space-y-2 text-left">
                            <li>• Perceives, plans, and acts toward defined goals autonomously.</li>
                            <li>• Uses reasoning and memory to decide the next best step.</li>
                            <li>• Integrates with tools and APIs to complete real-world tasks.</li>
                            <li>• Reflects and learns from outcomes — improving over time.</li>
                            <li>• Functions like a digital teammate — reliable, secure, and proactive.</li>
                        </ul>
                    </motion.div>
                </div>

                <div className="flex items-center justify-center mt-10 text-cyan-400 gap-2 text-sm font-medium">
                    <ArrowRight className="w-4 h-4"/>
                    <span>From “Generate” to “Think, Decide, and Act” — that’s Agentic AI.</span>
                </div>
            </motion.div>
        </section>
    );
}