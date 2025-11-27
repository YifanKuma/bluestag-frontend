"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import Magnetic from "@/components/effects/Magnetic";
import {ArrowRight} from "lucide-react";
import type {AboutPageData} from "@/types/about";

export default function ContactCTA({data}: { data: AboutPageData }) {
    return (
        <section className="relative py-12 md:py-16">
            <motion.div
                initial={{opacity: 0, scale: 0.98}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true, amount: 0.4}}
                transition={{duration: 0.5}}
                className="rounded-3xl border border-white/10 p-8 md:p-10
                   bg-gradient-to-br from-sky-500/15 to-cyan-400/10 backdrop-blur"
            >
                <h3 className="text-2xl md:text-3xl font-semibold">{data.cta_title}</h3>
                <p className="mt-2 text-white/70 max-w-2xl">{data.cta_description}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Magnetic>
                        <Link
                            href={data.cta_button_link}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20
                                   bg-white/10 hover:bg-white/20 transition"
                        >
                            {data.cta_button_text} <ArrowRight className="w-4 h-4"/>
                        </Link>
                    </Magnetic>
                </div>

                <div className="mt-4 text-xs text-white/60 flex flex-wrap items-center gap-4">
                    <span>⏱ Pilot in days</span>
                    <span>•</span>
                    <span>🔒 Guardrails & approvals</span>
                    <span>•</span>
                    <span>📞 Human handoff ready</span>
                </div>
            </motion.div>
        </section>
    );
}
