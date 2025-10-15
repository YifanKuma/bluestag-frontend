"use client";

import {motion} from "framer-motion";
import {Mail, Phone, MapPin, Send} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlueGlowBackground from "@/components/BlueGlowBackground";

export default function ContactPage() {
    return (
        <main className="relative min-h-screen text-white pt-16 overflow-hidden">
            {/* ✨ Background */}
            <BlueGlowBackground/>

            {/* 🧭 Navbar */}
            <Navbar/>

            {/* 🌟 Hero Section */}
            <section className="relative z-10 text-center max-w-3xl mx-auto mt-20 px-6">
                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600"
                >
                    Get in Touch
                </motion.h1>
                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-gray-400 text-lg"
                >
                    Whether you’re curious about features, a demo, or partnership opportunities —
                    we’re here to help your business scale with Voice&nbsp;AI.
                </motion.p>
            </section>

            {/* 📩 Contact Form Section */}
            <section className="relative z-10 mt-16 mb-32 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">
                {/* Left Info */}
                <motion.div
                    initial={{opacity: 0, x: -30}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.7}}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-lg flex flex-col justify-center"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-sky-400">
                        Contact Information
                    </h2>

                    <div className="space-y-5 text-gray-300 text-sm">
                        <div className="flex items-center gap-3">
                            <Mail className="text-sky-400 w-5 h-5"/>
                            <span>support@bluestag.ai</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-sky-400 w-5 h-5"/>
                            <span>+61 400 123 456</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="text-sky-400 w-5 h-5"/>
                            <span>South Brisbane, QLD, Australia</span>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6">
                        <p className="text-gray-400 text-sm">
                            Our team is based in Brisbane and available Monday–Friday, 9am–6pm (AEST).
                            We’ll usually get back within a few hours.
                        </p>
                    </div>
                </motion.div>

                {/* Right Form */}
                <motion.form
                    initial={{opacity: 0, x: 30}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.7}}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-lg"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-sky-400">
                        Send us a message
                    </h2>

                    <div className="space-y-5">
                        <div className="group relative">
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-all duration-300 peer"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-sky-400"
                            >
                                Name
                            </label>
                        </div>

                        <div className="group relative">
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-all duration-300 peer"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-sky-400"
                            >
                                Email
                            </label>
                        </div>

                        <div className="group relative">
              <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-all duration-300 peer resize-none"
              ></textarea>
                            <label
                                htmlFor="message"
                                className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-sky-400"
                            >
                                Message
                            </label>
                        </div>

                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            type="submit"
                            className="mt-4 w-full flex justify-center items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-xl transition-all duration-300"
                        >
                            <Send className="w-4 h-4"/>
                            Send Message
                        </motion.button>
                    </div>
                </motion.form>
            </section>

            {/* ⚡ Footer */}
            <Footer/>
        </main>
    );
}