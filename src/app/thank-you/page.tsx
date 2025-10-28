"use client";

import {motion} from "framer-motion";
import Link from "next/link";
import {CheckCircle, ArrowRight} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlueGlowBackground from "@/components/BlueGlowBackground";

export default function ThankYouPage() {
    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            {/* ✨ Background */}
            <BlueGlowBackground/>

            {/* 🧭 Navbar */}
            <Navbar/>

            {/* 🌟 Content */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32">
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.6}}
                    className="flex flex-col items-center"
                >
                    <CheckCircle className="text-green-400 w-16 h-16 mb-6 drop-shadow-lg"/>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600">
                        Message Sent Successfully
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mb-10">
                        Thanks for reaching out to <span className="text-sky-400 font-medium">Bluestag AI</span>.
                        Our team has received your message and will get back to you as soon as possible.
                    </p>

                    <motion.div whileHover={{scale: 1.05}}>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
                        >
                            <span>Back to Home</span>
                            <ArrowRight className="w-4 h-4"/>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ⚡ Footer */}
            <Footer/>
        </main>
    );
}