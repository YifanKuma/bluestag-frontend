"use client";

import {motion} from "framer-motion";

export default function OurStory() {
    return (
        <section id="our-story" className="relative">
            {/* decorative glows */}
            <div
                className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl"/>
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"/>

            <div className="relative z-10 mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 items-center">
                {/* Text block */}
                <motion.div
                    initial={{opacity: 0, x: -30}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                >
                    <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Bluestag AI began with a mission to empower businesses through
                        intelligent automation and creativity. Our journey combines
                        technology, innovation, and a human touch to make AI approachable
                        and powerful for everyone.
                    </p>
                </motion.div>

                {/* Image block (CSS background like ContactInfo) */}
                <motion.div
                    initial={{opacity: 0, x: 30}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                    className="rounded-2xl overflow-hidden relative h-72 sm:h-80 md:h-96 bg-cover bg-center border border-white/10 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                    style={{backgroundImage: "url('/about-image.jpg')"}} // ✅ same as contact page
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/80 via-[#0b1120]/30 to-transparent"/>
                </motion.div>
            </div>
        </section>
    );
}
