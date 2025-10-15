"use client";

import {motion} from "framer-motion";
import {Target, Sparkles} from "lucide-react";

export default function MissionVision() {
    const card =
        "rounded-2xl border border-white/10 p-6 md:p-8 bg-white/5 backdrop-blur";
    return (
        <section className="relative py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.4}}
                    transition={{duration: 0.5}}
                    className={card}
                >
                    <div className="flex items-center gap-3">
                        <Target className="w-5 h-5"/>
                        <h3 className="text-xl font-semibold">Our Mission</h3>
                    </div>
                    <p className="mt-3 text-white/70">
                        Make AI voice agents that are useful on day one—easy to deploy,
                        safe by design, and measurably revenue-positive for small and
                        mid-size teams.
                    </p>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.4}}
                    transition={{duration: 0.5, delay: 0.05}}
                    className={card}
                >
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5"/>
                        <h3 className="text-xl font-semibold">Our Vision</h3>
                    </div>
                    <p className="mt-3 text-white/70">
                        A world where every business has a calm, capable AI teammate that
                        handles the busywork—so people can focus on higher-value,
                        human-centric work.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}