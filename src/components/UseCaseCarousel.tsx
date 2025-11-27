"use client";

import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {PRODUCT_ICON_MAP} from "@/data/product";
import type {UseCase} from "@/types/home-page";

export default function UseCaseCarousel({items}: { items: UseCase[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [items.length]);

    return (
        <section className="relative py-20 text-white overflow-hidden px-4 sm:px-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-center mb-10 leading-snug">
                What can Bluestag <br className="sm:hidden"/> Voice AI do?
            </h2>

            <div className="flex justify-center items-center relative h-[360px] sm:h-[460px]">
                {items.map((useCase, i) => {
                    const offset = (i - index + items.length) % items.length;
                    const center = offset === 0;
                    const left = offset === items.length - 1;
                    const right = offset === 1;

                    let x = 0;
                    let scale = 1;
                    let opacity = 1;

                    const isLargeScreen =
                        typeof window !== "undefined" && window.innerWidth >= 1024;
                    const sideOffset = isLargeScreen ? 340 : 250;

                    if (left) {
                        x = -sideOffset;
                        scale = 0.85;
                        opacity = 0.55;
                    } else if (right) {
                        x = sideOffset;
                        scale = 0.85;
                        opacity = 0.55;
                    } else if (!center) {
                        opacity = 0;
                        scale = 0.6;
                    }

                    const Icon = PRODUCT_ICON_MAP[useCase.icon_key];

                    return (
                        <AnimatePresence key={i}>
                            {(Math.abs(offset) <= 1 ||
                                offset === items.length - 1) && (
                                <motion.div
                                    key={i}
                                    initial={{opacity: 0, scale: 0.7}}
                                    animate={{x, scale, opacity}}
                                    transition={{duration: 0.8, ease: "easeInOut"}}
                                    className={`absolute w-[85vw] max-w-[380px] h-[280px] sm:w-[420px] sm:h-[340px] rounded-2xl backdrop-blur bg-white/10 border border-white/10 shadow-xl text-center p-6 sm:p-10 flex flex-col justify-center items-center ${
                                        center ? "z-20" : "z-10"
                                    }`}
                                >
                                    <div className="mb-4 text-sky-400">
                                        {Icon && <Icon size={36}/>}
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                                        {useCase.title}
                                    </h3>

                                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                        {useCase.desc}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    );
                })}
            </div>
        </section>
    );
}
