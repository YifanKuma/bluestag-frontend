"use client";

import Image from "next/image";
import {motion} from "framer-motion";
import Tilt from "@/components/effects/Tilt";
import {team} from "@/data/team";

export default function TeamSection() {
    return (
        <section className="relative py-12 md:py-16">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold">Our Team</h2>
                <p className="mt-2 text-white/70">
                    Builders, researchers, and product people who care about shipping the right thing.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((m, i) => (
                    <Tilt key={m.name}>
                        <motion.article
                            initial={{opacity: 0, y: 12}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{y: -6}}
                            viewport={{once: true, amount: 0.3}}
                            transition={{duration: 0.45, delay: i * 0.05}}
                            className="rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur transition-shadow
                         hover:shadow-[0_10px_40px_-10px_rgba(56,189,248,0.35)]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-1 ring-white/10">
                                    {m.photo ? (
                                        <Image src={m.photo} alt={m.name} fill className="object-cover"/>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white/10">
                                            <span className="text-lg">{m.initials}</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{m.name}</h3>
                                    <p className="text-sm text-white/60">{m.role}</p>
                                </div>
                            </div>

                            {m.bio && <p className="mt-4 text-sm text-white/70">{m.bio}</p>}

                            {m.tags?.length ? (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {m.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[11px] px-2 py-1 rounded-md border border-white/10 bg-white/5 text-white/70"
                                        >
                      {t}
                    </span>
                                    ))}
                                </div>
                            ) : null}
                        </motion.article>
                    </Tilt>
                ))}
            </div>
        </section>
    );
}