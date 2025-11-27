"use client";

import {motion} from "framer-motion";
import * as Icons from "lucide-react";
import {ElementType} from "react";

type Feature = {
    title: string;
    description: string;
    icon: string;
};

type Pill = {
    label: string;
    icon: string;
};

export default function AIChatbotSection({
                                             title,
                                             subtitle,
                                             features,
                                             pills
                                         }: {
    title: string;
    subtitle: string;
    features: Feature[];
    pills: Pill[];
}) {
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
                    {title}
                </motion.h2>

                <motion.p
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{delay: 0.12, duration: 0.45}}
                    className="mt-4 text-white/70 max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
            </div>

            {/* Feature grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f, i) => {
                    const Icon =
                        (Icons[f.icon as keyof typeof Icons] as ElementType) ||
                        Icons.MessageSquare;

                    return (
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
                                    <Icon/>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{f.title}</h3>
                                    <p className="mt-1 text-sm text-white/70">{f.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Value pills */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
                {pills.map((p, i) => {
                    const Icon =
                        (Icons[p.icon as keyof typeof Icons] as ElementType) ||
                        Icons.Bot;

                    return (
                        <motion.span
                            key={i}
                            initial={{opacity: 0, y: 8}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.35, delay: i * 0.05}}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                        >
                            <Icon size={16}/> {p.label}
                        </motion.span>
                    );
                })}
            </div>
        </section>
    );
}
