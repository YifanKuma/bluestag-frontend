"use client";

import {useEffect} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {log} from "@/lib/logger";
import {Cpu, Zap, AlertTriangle} from "lucide-react";

// 🔧 lightweight glitch layer
function GlitchBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* scanlines */}
            <div
                className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0_2px,rgba(255,255,255,0.03)_2px,transparent_4px)] animate-scanlines"/>
            {/* random noise flicker */}
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_60%)] mix-blend-overlay"
                animate={{opacity: [0.1, 0.3, 0.15, 0.25, 0.1]}}
                transition={{duration: 3, repeat: Infinity}}
            />
            {/* faint RGB shift aura */}
            <motion.div
                className="absolute inset-0 blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(120,0,255,0.12) 0%, rgba(0,0,0,0) 70%)",
                }}
                animate={{scale: [1, 1.05, 1]}}
                transition={{duration: 6, repeat: Infinity}}
            />
        </div>
    );
}

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        log.error("🔥 Server or runtime error", {
            message: error.message,
            stack: error.stack,
            url: window.location.href,
            time: new Date().toISOString(),
        });
    }, [error]);

    return (
        <main
            className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0015] via-[#120022] to-[#000010] text-white">
            {/* ⚡ Animated glitch layer */}
            <GlitchBackground/>

            {/* ⚡ Pulsing nebula lights */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 blur-3xl animate-pulse"/>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/25 blur-3xl animate-pulse delay-1000"/>

            {/* ⚙️ Floating error core */}
            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="relative z-10 text-center max-w-2xl"
            >
                <motion.div
                    animate={{rotate: [0, 10, -10, 0]}}
                    transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
                    className="flex justify-center mb-4"
                >
                    <Cpu className="w-16 h-16 text-purple-400"/>
                </motion.div>

                <h1 className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    500 – System Glitch
                </h1>

                <p className="text-gray-400 text-lg mb-8">
                    Our AI core experienced a dimensional overload.
                    <br/>
                    Engineers are rebooting the neural circuits 🤖⚡
                </p>

                <motion.div
                    animate={{opacity: [0.3, 1, 0.3]}}
                    transition={{duration: 1.5, repeat: Infinity}}
                    className="absolute -top-8 right-24"
                >
                    <Zap className="w-8 h-8 text-yellow-400"/>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {/* Restart Button */}
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] font-semibold"
                    >
                        🧠 Restart AI Core
                    </button>

                    {/* Back to Home Button */}
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.35)] hover:shadow-[0_0_40px_rgba(0,0,0,0.55)] font-semibold"
                    >
                        🏠 Back to Home
                    </Link>
                </div>

                <motion.div
                    animate={{y: [0, -20, 0]}}
                    transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                    className="absolute bottom-10 right-12 opacity-70"
                >
                    <AlertTriangle className="w-10 h-10 text-red-400"/>
                </motion.div>
            </motion.div>
        </main>
    );
}
