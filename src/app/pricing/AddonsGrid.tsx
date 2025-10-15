"use client";

import {useRef} from "react";
import {motion} from "framer-motion";
import {addons} from "./pricing";

export default function AddonsGrid() {
    const gridRef = useRef<HTMLDivElement>(null);

    // 💫 Track mouse position for the glow effect
    const handleMouseMove = (e: React.MouseEvent) => {
        const el = gridRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
    };

    return (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
            <h2 className="text-xl font-semibold">Add-ons</h2>

            <div
                ref={gridRef}
                onMouseMove={handleMouseMove}
                className="mt-4 grid gap-4 md:grid-cols-3"
            >
                {addons.map((addon, index) => (
                    <motion.article
                        key={addon.title}
                        initial={{y: 10, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{delay: index * 0.05, duration: 0.3}}
                        whileHover={{y: -6, scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                        {/* ✨ Glow ring follows mouse */}
                        <span
                            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                                background:
                                    "radial-gradient(140px 140px at var(--mx,50%) var(--my,30%), rgba(16,185,129,0.2), transparent 60%)",
                            }}
                        />

                        {/* 🌈 Soft border glow */}
                        <span
                            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-emerald-400/30 transition duration-300"/>

                        {/* Icon pulse */}
                        <motion.div
                            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"
                            whileHover={{scale: 1.08}}
                            transition={{type: "spring", stiffness: 350, damping: 20}}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-xl"
                                initial={{opacity: 0}}
                                whileHover={{opacity: 1}}
                                transition={{duration: 0.25}}
                                style={{
                                    boxShadow: "0 0 24px rgba(16,185,129,0.35) inset",
                                }}
                            />
                            <addon.icon className="relative h-5 w-5 text-white"/>
                        </motion.div>

                        <h3 className="mt-3 font-semibold">{addon.title}</h3>
                        <p className="mt-1 text-sm text-white/70">{addon.desc}</p>
                        <p className="mt-3 text-sm text-white/80">{addon.price}</p>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}