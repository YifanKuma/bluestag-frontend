"use client";

import {motion} from "framer-motion";
import type {AboutPageData} from "@/types/about";

export default function OurStory({data}: { data: AboutPageData }) {

    if (!data) {
        console.log("❌ OurStory: data is NULL — cannot render");
        return null;
    }

    // ⭐ FIX: Build full image URL for Strapi media
    const imageUrl = data.story_image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.story_image.url}`
        : "/placeholder.jpg";

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
                    <h2 className="text-4xl font-bold mb-6">{data.story_title}</h2>
                    <p className="text-gray-300 leading-relaxed">{data.story_description}</p>
                </motion.div>

                {/* Image block */}
                <motion.div
                    initial={{opacity: 0, x: 30}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                    className="relative rounded-2xl overflow-hidden h-72 sm:h-80 md:h-96 bg-cover bg-center border border-white/10"
                    style={{backgroundImage: `url(${imageUrl})`}}
                >
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/80 via-[#0b1120]/40 to-transparent"/>

                    {/* Caption */}
                    <div className="absolute bottom-6 left-6 text-left">
                        <h3 className="text-sky-400 text-lg font-semibold">
                            {data.story_image_caption_title}
                        </h3>
                        <p className="text-gray-300 text-sm">{data.story_image_caption_subtitle}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
