"use client";

import {useMemo, useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";

// Drop at: src/app/under-construction/page.tsx (no metadata needed)
export default function UnderConstructionFunny() {
    const oneLiners = [
        "Our dev hamsters are on a coffee break ☕️🐹",
        "Installing more RAM by yelling at the cloud ☁️📦",
        "Compiling jokes… results may vary 🤖",
        "Fetching content with a really long stick 🪄",
        "Optimising pixels for maximum giggles 😂",
        "Upgrading from TODO to DONE… any minute now ⏳",
    ];

    const tips = [
        "Try turning it off and on again (the page, not your life).",
        "Blame caching. Always blame caching.",
        "It worked on my machine.",
        "95% done. The last 5% is the other 95%.",
    ];

    const tagline = useMemo(() => oneLiners[Math.floor(Math.random() * oneLiners.length)], []);
    const [tipIndex, setTipIndex] = useState(0);
    const shuffle = () => setTipIndex((i) => (i + 1) % tips.length);

    // Fake progress purely for vibes
    const day = new Date().getDate();
    const progress = 42 + ((day * 7) % 45); // 42–86%

    return (
        <main
            className="relative min-h-[85vh] overflow-hidden bg-[radial-gradient(60rem_40rem_at_50%_-10rem,rgba(56,189,248,0.12),transparent),radial-gradient(60rem_40rem_at_100%_120%,rgba(16,185,129,0.10),transparent)]">
            {/* faint grid */}
            <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px] opacity-[0.06]"/>

            <section className="relative mx-auto max-w-3xl px-6 py-20 text-center">
                {/* Emoji stack */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="relative mb-8"
                >
                    <motion.div
                        initial={{rotate: -10}}
                        animate={{rotate: [-10, 8, -10]}}
                        transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                        className="mx-auto grid h-28 w-28 place-items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.35)]"
                        aria-hidden
                    >
                        <span className="text-5xl">🦺</span>
                    </motion.div>
                    <div aria-hidden className="absolute -inset-6 -z-10 rounded-3xl bg-sky-400/10 blur-3xl"/>
                </motion.div>

                <motion.h1
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.05, duration: 0.6}}
                    className="mb-2 bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl"
                >
                    Sorry — this page is still under construction
                </motion.h1>

                <motion.p
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.15, duration: 0.6}}
                    className="text-gray-300 text-sm sm:text-base mb-6"
                >
                    {tagline}
                </motion.p>

                {/* Progress bar (silly edition) */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.25, duration: 0.6}}
                    className="mx-auto mb-8 w-full max-w-xl text-left"
                >
                    <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
                        <span>Feature brew</span>
                        <span>{progress}% caffèinated</span>
                    </div>
                    <div className="h-3 rounded-xl bg-white/10 overflow-hidden">
                        <motion.div
                            className="h-full rounded-xl bg-sky-500"
                            initial={{width: 0}}
                            animate={{width: `${progress}%`}}
                            transition={{duration: 1, ease: "easeOut"}}
                        />
                    </div>
                    <ul className="mt-3 text-xs text-gray-400 space-y-1">
                        <li>✅ Brainstormed wildly brilliant ideas</li>
                        <li>✅ Drew boxes and arrows that totally make sense</li>
                        <li>🛠️ Wiring the buttons to do button things</li>
                        <li>🚧 Arguing with CSS respectfully</li>
                    </ul>
                </motion.div>

                {/* Rotating tip */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.35, duration: 0.6}}
                    className="mx-auto mb-8 max-w-xl rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-300"
                >
                    💡 Pro tip: {tips[tipIndex]} {" "}
                    <button onClick={shuffle}
                            className="ml-2 underline decoration-dotted underline-offset-4 hover:text-white">
                        another one
                    </button>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.45, duration: 0.6}}
                    className="flex flex-col items-center justify-center gap-3 sm:flex-row"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-2xl bg-sky-500/90 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(14,165,233,0.35)] hover:bg-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                        ← Back to Home
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                        Book a Demo
                    </Link>
                </motion.div>

                {/* Footer gag */}
                <motion.p
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.55, duration: 0.6}}
                    className="mt-10 text-xs text-gray-400"
                >
                    P.S. If you can read this, the build pipeline is at least 1% working. 🎉
                </motion.p>
            </section>

            {/* corner glows */}
            <div aria-hidden
                 className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl"/>
            <div aria-hidden
                 className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl"/>
        </main>
    );
}
