"use client";

import Image from "next/image";
import {motion} from "framer-motion";

type Props = {
    /** Optional image URL. If omitted, a stylish placeholder appears. */
    imageSrc?: string;
    imageAlt?: string;
};

export default function OurStory({imageSrc, imageAlt = "Bluestag team"}: Props) {
    return (
        <section id="our-story" className="relative">
            {/* decorative glow */}
            <div
                className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl"/>
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"/>

            <div className="grid items-start gap-10 md:grid-cols-2">
                {/* copy */}
                <div className="space-y-6">
                    <motion.h2
                        initial={{opacity: 0, y: 12}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5}}
                        className="text-3xl md:text-4xl font-extrabold tracking-tight"
                    >
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Our Story
            </span>
                    </motion.h2>

                    <motion.p
                        initial={{opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.05, duration: 0.5}}
                        className="text-white/85 leading-relaxed"
                    >
                        Bluestag AI began with a clear belief: automation should <em>elevate</em> people,
                        never replace them. That principle drives our agentic AI—natural-sounding voice
                        agents that handle routine work with care, speed, and accuracy.
                    </motion.p>

                    <motion.p
                        initial={{opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.1, duration: 0.5}}
                        className="text-white/80 leading-relaxed"
                    >
                        From first prototypes to production systems, we’ve obsessed over reliability,
                        safety, and feel. The result is technology that blends empathy with engineering—
                        so businesses serve customers faster while feeling more human.
                    </motion.p>

                    {/* small badges */}
                    <motion.div
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{delay: 0.15}}
                        className="flex flex-wrap gap-2 pt-2"
                    >
                        {[
                            "Agentic AI",
                            "Human-centred design",
                            "Security-first",
                            "AU-ready"
                        ].map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur"
                            >
                {t}
              </span>
                        ))}
                    </motion.div>
                </div>

                {/* image / upload placeholder */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                    className="relative"
                >
                    <div
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                        {/* gradient highlight */}
                        <div
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.12),transparent_45%)]"/>
                        {imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                width={1200}
                                height={900}
                                priority={false}
                                className="relative block h-[340px] w-full object-cover"
                            />
                        ) : (
                            <div className="relative grid h-[340px] w-full place-items-center">
                                <div className="rounded-xl border-2 border-dashed border-white/20 p-6 text-center">
                                    <p className="text-sm text-white/80">
                                        Photo placeholder — <span className="text-white">add your image</span>
                                    </p>
                                    <p className="mt-1 text-xs text-white/60">
                                        Pass <code>imageSrc</code> to <code>{"<OurStory />"}</code> or swap this block
                                        with your uploader.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}