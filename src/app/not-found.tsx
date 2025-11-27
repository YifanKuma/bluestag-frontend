"use client";

import {motion, useMotionValue, useTransform} from "framer-motion";
import Link from "next/link";
import {useEffect} from "react";
import {Rocket, Orbit, Sparkles} from "lucide-react"; // ✅ replaced Alien with Orbit

export default function NotFound() {
    useEffect(() => {
        fetch("/api/log", {
            method: "POST",
            body: JSON.stringify({
                error: "404 - Page not found",
                path: window.location.pathname,
                time: new Date().toISOString(),
            }),
        }).catch(() => {
        });
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-250, 250], [15, -15]);
    const rotateY = useTransform(mouseX, [-250, 250], [-15, 15]);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const {innerWidth, innerHeight} = window;
        mouseX.set(e.clientX - innerWidth / 2);
        mouseY.set(e.clientY - innerHeight / 2);
    };

    return (
        <main
            onMouseMove={handleMove}
            className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#020617] via-[#0B1120] to-[#020617] text-white"
        >
            {/* 🌌 glowing nebula */}
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl animate-pulse"/>
            <div
                className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl animate-pulse delay-1000"/>

            {/* 🪐 floating planets */}
            <motion.div
                style={{rotateX, rotateY}}
                className="relative z-10 flex flex-col items-center"
            >
                <motion.div
                    animate={{y: [0, -20, 0]}}
                    transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                    className="text-center"
                >
                    <div className="flex justify-center mb-4">
                        <Orbit className="w-16 h-16 text-sky-400 animate-pulse"/>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                        404 Lost in Space
                    </h1>
                    <p className="text-gray-400 text-lg max-w-lg mx-auto mb-8">
                        Our AI pilot might’ve taken a coffee break...
                        You’ve drifted into the cosmic void 🌌
                    </p>
                </motion.div>

                {/* 🚀 rocket animation */}
                <motion.div
                    initial={{x: -200, y: 150, rotate: -20}}
                    animate={{x: [0, 150, -150, 0], y: [0, -50, 50, 0], rotate: [0, 10, -10, 0]}}
                    transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
                    className="absolute"
                >
                    <Rocket className="w-10 h-10 text-sky-400"/>
                </motion.div>

                {/* ✨ floating sparkles */}
                <motion.div
                    animate={{opacity: [0.3, 0.8, 0.3]}}
                    transition={{duration: 2, repeat: Infinity}}
                    className="absolute top-10 right-20"
                >
                    <Sparkles className="w-8 h-8 text-yellow-400"/>
                </motion.div>
            </motion.div>

            {/* 😄 funny recovery */}
            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 1.2, duration: 0.8}}
                className="z-10 mt-16"
            >
                <Link
                    href="/"
                    className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.55)]"
                >
                    🪐 Beam me back to Earth
                </Link>
            </motion.div>

            {/* 🧑‍🚀 astronaut floating */}
            <motion.div
                animate={{y: [0, -25, 0], rotate: [0, 5, -5, 0]}}
                transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
                className="absolute bottom-10 right-20 opacity-70"
            >
                <span className="text-6xl">🧑‍🚀</span>
            </motion.div>
        </main>
    );
}
