"use client";

import {motion} from "framer-motion";
import {Sparkles, CheckCircle2} from "lucide-react";
import type {AboutPageData} from "@/types/about";

export default function OurVision({data}: { data: AboutPageData }) {

    return (
        <section id="our-vision" className="mt-14">
            <motion.div
                initial={{opacity: 0, y: 14}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.45}}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/6 to-white/[0.03] p-6 backdrop-blur"
            >
                <div className="mb-4 flex items-center gap-3">
                    <div
                        className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/30">
                        <Sparkles className="h-5 w-5 text-emerald-300"/>
                    </div>
                    <h3 className="text-xl font-semibold">{data.vision_title}</h3>
                </div>

                <p className="text-white/80 leading-relaxed">
                    {data.vision_description}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-white/75">
                    {data.vision_items?.map((item) => (
                        <li key={item.id} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300"/>
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </section>
    );
}
