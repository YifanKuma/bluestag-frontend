"use client";

import {motion, useReducedMotion, type MotionProps} from "framer-motion";

export default function AboutHero() {
    const prefersReduced = useReducedMotion();

    const floatProps = (delay = 0): MotionProps =>
        prefersReduced
            ? {animate: {y: 0}, transition: {duration: 0}}
            : {
                animate: {y: [0, -8, 0]},
                transition: {duration: 4.5, repeat: Infinity, delay, ease: "easeInOut"},
            };

    const ringProps: MotionProps = prefersReduced
        ? {animate: {rotate: 0}, transition: {duration: 0}}
        : {animate: {rotate: 360}, transition: {duration: 60, repeat: Infinity, ease: "linear"}};

    return (
        <section
            aria-label="About Bluestag introduction"
            className="relative mx-auto max-w-7xl px-6 py-16 md:py-24"
        >
            {/* Background: soft radial + rotating ring */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full blur-3xl
                        bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_60%)]"/>
                <motion.div
                    aria-hidden
                    {...ringProps}
                    className="absolute left-1/2 top-24 h-[68vmin] w-[68vmin] -translate-x-1/2 rounded-full border border-white/[0.06]"
                    style={{maskImage: "radial-gradient(circle at center, black 55%, transparent 60%)"}}
                />
            </div>

            <div className="grid items-center gap-10 md:grid-cols-2">
                {/* LEFT: copy */}
                <div>
                    <div
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        <span className="h-2 w-2 rounded-full bg-cyan-300/70"/>
                        Agentic platform
                    </div>

                    <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                        Practical, agentic AI for the real world
                    </h1>

                    <p className="mt-4 max-w-xl text-base md:text-lg text-white/70">
                        Bluestag began with a simple idea: assistants should be fast, trustworthy, and genuinely
                        helpful—not gimmicky. Today our stack powers voice, chatbots, social, and managed IT
                        automations with human-grade UX and production reliability.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                        {["Secure by design", "24/7 availability", "Agent orchestration"].map((t) => (
                            <span
                                key={t}
                                className="text-xs rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/70"
                            >
                {t}
              </span>
                        ))}
                    </div>
                </div>

                {/* RIGHT: floating metric tiles */}
                <div className="relative">
                    {/* subtle container panel (no hard edge) */}
                    <div
                        className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.03] to-white/[0.015] backdrop-blur-sm border border-white/10"/>

                    <div className="relative grid grid-cols-2 gap-4 p-4">
                        <motion.div
                            {...floatProps(0.1)}
                            className="rounded-2xl border border-white/12 bg-white/[0.04] p-5"
                        >
                            <div className="text-2xl font-semibold">27%</div>
                            <p className="mt-1 text-xs text-white/60">Avg. booking uplift</p>
                        </motion.div>

                        <motion.div
                            {...floatProps(0.35)}
                            className="rounded-2xl border border-white/12 bg-white/[0.04] p-5"
                        >
                            <div className="text-2xl font-semibold">5+</div>
                            <p className="mt-1 text-xs text-white/60">Pilot use-cases</p>
                        </motion.div>

                        <motion.div
                            {...floatProps(0.55)}
                            className="rounded-2xl border border-white/12 bg-white/[0.04] p-5"
                        >
                            <div className="text-2xl font-semibold">≤350 ms</div>
                            <p className="mt-1 text-xs text-white/60">Latency budget</p>
                        </motion.div>

                        <motion.div
                            {...floatProps(0.8)}
                            className="rounded-2xl border border-white/12 bg-white/[0.04] p-5"
                        >
                            <div className="text-2xl font-semibold">99.9%</div>
                            <p className="mt-1 text-xs text-white/60">Uptime you can trust</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}