"use client";

import {motion} from "framer-motion";

export default function OurStory() {
    return (
        <section className="relative py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                    initial={{opacity: 0, x: -16}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true, amount: 0.4}}
                    transition={{duration: 0.6}}
                    className="rounded-2xl border border-white/10 p-6 md:p-8 bg-white/5 backdrop-blur"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold">Our Story</h2>
                    <p className="mt-4 text-white/70">
                        We started Bluestag in Queensland after working with small
                        businesses that struggled to keep up with inbound calls and manual
                        follow-ups. We prototyped a voice agent that could qualify leads,
                        confirm bookings, and handle simple support—all without keeping
                        customers on hold.
                    </p>
                    <p className="mt-4 text-white/70">
                        That proof of concept grew into a platform: a clean orchestration
                        layer, guardrails, memory, and integrations. We keep shipping fast,
                        learning with customers, and focusing on reliability over hype.
                    </p>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, x: 16}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true, amount: 0.4}}
                    transition={{duration: 0.6, delay: 0.1}}
                    className="rounded-2xl border border-white/10 p-6 md:p-8"
                >
                    <div
                        className="aspect-video w-full rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/10 ring-1 ring-white/10"/>
                    <p className="mt-4 text-sm text-white/60">
                        Above: early visualization of our agent pipeline—perception,
                        reasoning, tools, and voice—running with retries and human hand-off.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}