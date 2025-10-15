"use client";

import {motion} from "framer-motion";
import {
    Bot,
    LockKeyhole,
    Rocket,
    MessageSquare,
    Share2,
    ShieldCheck,
    Workflow,
    Languages,
    PieChart,
    PhoneCall,
} from "lucide-react";

export default function AIChatbotSection() {
    const features = [
        {
            icon: <MessageSquare/>,
            title: "24/7 Support & Sales",
            desc: "Resolve questions, capture leads, and book appointments instantly across chat channels.",
        },
        {
            icon: <Share2/>,
            title: "Omnichannel",
            desc: "Deploy on your website widget, WhatsApp, Messenger, and Instagram DMs with one setup.",
        },
        {
            icon: <Workflow/>,
            title: "Agentic Workflows",
            desc: "Multi-step reasoning to fetch data, fill forms, and trigger actions in your tools.",
        },
        {
            icon: <ShieldCheck/>,
            title: "Security & Controls",
            desc: "PII redaction, allow-lists, and audit logs for enterprise-grade safety.",
        },
        {
            icon: <Languages/>,
            title: "Multilingual",
            desc: "Serve customers in 50+ languages with automatic detection and tone control.",
        },
        {
            icon: <PieChart/>,
            title: "Analytics & A/B Tests",
            desc: "Funnels, CSAT, drop-off insights, and copy experiments to improve weekly.",
        },
        {
            icon: <PhoneCall/>,
            title: "Human Handoff",
            desc: "Seamless transfer to your team with transcript context and suggested replies.",
        },
    ];

    return (
        <section className="relative mx-auto max-w-7xl px-4 py-16">
            {/* Header */}
            <div className="text-center mb-10">
                <motion.h2
                    initial={{opacity: 0, y: 8}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.4}}
                    className="text-4xl font-extrabold"
                >
                    AI Chatbots That Talk, Sell & Support
                </motion.h2>
                <motion.p
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{delay: 0.12, duration: 0.45}}
                    className="mt-4 text-white/70 max-w-2xl mx-auto"
                >
                    Bluestag AI Chatbot automates conversations across your website and social channels —
                    always on, secure, and on-brand.
                </motion.p>
            </div>

            {/* Feature grid (no GlowCard) */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        initial={{opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.35}}
                        transition={{duration: 0.45, delay: i * 0.05}}
                        className="
              relative rounded-2xl border border-white/10 bg-white/[0.06] p-6
              shadow-[0_0_20px_rgba(30,64,175,0.25)]
              hover:shadow-[0_0_32px_rgba(59,130,246,0.45)]
              transition-shadow
              before:absolute before:inset-0 before:rounded-2xl
              before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none
            "
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-1 rounded-lg border border-white/10 bg-white/5 p-2">
                                {f.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold">{f.title}</h3>
                                <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Value pills */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
                <motion.span
                    initial={{opacity: 0, y: 8}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.35}}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                >
                    <Bot size={16}/> Human-free where it should be
                </motion.span>
                <motion.span
                    initial={{opacity: 0, y: 8}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.38}}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                >
                    <Rocket size={16}/> High performance
                </motion.span>
                <motion.span
                    initial={{opacity: 0, y: 8}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.41}}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                >
                    <LockKeyhole size={16}/> Secure & compliant
                </motion.span>
            </div>
        </section>
    );
}