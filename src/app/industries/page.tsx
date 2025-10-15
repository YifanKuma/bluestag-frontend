"use client";

import {useState} from "react";
import {motion, AnimatePresence, useMotionValue, useSpring} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlueGlowBackground from "@/components/BlueGlowBackground";
import {INDUSTRIES} from "./data";
import DemoFlow from "./DemoFlow";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function IndustriesPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const searchParams = useSearchParams();
    useEffect(() => {
        const slug = searchParams.get("industry");
        if (!slug) return;
        const index = INDUSTRIES.findIndex(ind => ind.id === slug || ind.slug === slug);
        if (index !== -1) setActiveIndex(index);
    }, [searchParams]);
    const activeIndustry = INDUSTRIES[activeIndex];

    // 🌟 Cursor-tracking blue glow
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const smoothX = useSpring(x, {stiffness: 80, damping: 20});
    const smoothY = useSpring(y, {stiffness: 80, damping: 20});

    const handleMouseMove = (e: React.MouseEvent) => {
        x.set(e.clientX);
        y.set(e.clientY);
    };

    return (
        <main
            onMouseMove={handleMouseMove}
            className="relative min-h-screen text-white pt-16 overflow-hidden"
        >
            {/* ✨ Global gradient motion */}
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.1),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1),transparent_60%)] blur-3xl"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{backgroundSize: "200% 200%", zIndex: 0}}
            />

            {/* 🌌 Cursor-following blue glow */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-500/30 blur-[120px]"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    zIndex: 1,
                }}
            />

            {/* Existing static glow background */}
            <BlueGlowBackground/>

            <Navbar/>

            {/* ======== Hero Section ======== */}
            <section className="relative z-10 text-center max-w-3xl mx-auto mt-24 mb-16 px-6">
                <motion.h1
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600"
                >
                    AI Voice Solutions by Industry
                </motion.h1>
                <motion.p
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    className="text-gray-400 text-lg"
                >
                    Bluestag Voice AI adapts to every business — real estate, logistics,
                    education, healthcare, and more. Choose an industry to see a live interactive demo.
                </motion.p>
            </section>

            {/* ======== Interactive Layout ======== */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 pb-28">
                {/* Left — Industry Selector */}
                <div className="space-y-3 flex flex-col justify-center">
                    {INDUSTRIES.map((ind, i) => (
                        <motion.button
                            key={ind.id}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            onClick={() => setActiveIndex(i)}
                            className={`w-full text-left px-6 py-4 rounded-2xl border ${
                                activeIndex === i
                                    ? "border-sky-400 bg-sky-500/10 shadow-lg"
                                    : "border-white/10 bg-white/5 hover:bg-white/10"
                            } transition-all duration-300`}
                        >
                            <div className="flex items-center gap-3">
                                <ind.icon
                                    className={`w-6 h-6 ${
                                        activeIndex === i ? "text-sky-400" : "text-gray-400"
                                    }`}
                                />
                                <h3
                                    className={`text-lg font-semibold ${
                                        activeIndex === i ? "text-white" : "text-gray-300"
                                    }`}
                                >
                                    {ind.title}
                                </h3>
                            </div>
                            <p
                                className={`text-sm mt-1 ${
                                    activeIndex === i ? "text-gray-300" : "text-gray-500"
                                }`}
                            >
                                {ind.summary}
                            </p>
                        </motion.button>
                    ))}
                </div>

                {/* Right — Animated Detail Panel */}
                <div className="relative overflow-hidden rounded-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndustry.id}
                            initial={{opacity: 0, x: 40}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -40}}
                            transition={{duration: 0.5, ease: "easeOut"}}
                            className="relative z-10 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <activeIndustry.icon className="w-8 h-8 text-sky-400"/>
                                <h3 className="text-2xl font-bold">{activeIndustry.title}</h3>
                            </div>

                            <p className="text-gray-300 mb-4">{activeIndustry.summary}</p>

                            <ul className="mt-3 mb-6 space-y-2 text-gray-300 text-sm">
                                {activeIndustry.bullets.map((b, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sky-400/80"/>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>

                            <DemoFlow steps={activeIndustry.demo}/>

                            <div className="mt-6">
                                <Link
                                    href="/contact"
                                    onClick={() =>
                                        window.scrollTo({top: 0, behavior: "smooth"})
                                    }
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 font-medium transition-all duration-300 hover:scale-[1.05]"
                                >
                                    {activeIndustry.cta?.label ?? "Book a Demo"}
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <Footer/>
        </main>
    );
}