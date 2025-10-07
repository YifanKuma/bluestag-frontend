"use client";

import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {ChevronUp, ChevronDown} from "lucide-react";
import {slides} from "./slides";
import {type Variants, type Transition} from "framer-motion";

// spring preset so TS knows the exact type
const spring: Transition = {
    type: "spring",
    stiffness: 120,
    damping: 18,
    mass: 0.7,
} as const;

const variants: Variants = {
    enter: (dir: number) => ({
        y: dir > 0 ? "8%" : "-8%",
        opacity: 0,
        filter: "blur(4px)",
    }),
    center: {
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        transition: spring,
    },
    exit: (dir: number) => ({
        y: dir > 0 ? "-8%" : "8%",
        opacity: 0,
        filter: "blur(4px)",
        transition: spring,
    }),
};

export default function VerticalSlider() {
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState<1 | -1>(1);

    // Preload all images to remove blank while loading
    useEffect(() => {
        slides.forEach((s) => {
            const img = new Image();
            img.src = s.img;
        });
    }, []);

    const go = (d: 1 | -1) => {
        setDir(d);
        setIndex((i) => (i + d + slides.length) % slides.length);
    };

    return (
        <section className="bg-white py-14">
            <div className="mx-auto max-w-6xl px-4">
                <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-sm">

                    {/* Controls */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
                        <button
                            aria-label="Previous"
                            onClick={() => go(-1)}
                            className="h-12 w-12 rounded-full bg-white shadow grid place-items-center hover:bg-gray-50"
                        >
                            <ChevronUp className="h-5 w-5"/>
                        </button>
                        <button
                            aria-label="Next"
                            onClick={() => go(1)}
                            className="h-12 w-12 rounded-full bg-white shadow grid place-items-center hover:bg-gray-50"
                        >
                            <ChevronDown className="h-5 w-5"/>
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="absolute left-6 top-6 z-20 flex flex-col items-center gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDir(i > index ? 1 : -1);
                                    setIndex(i);
                                }}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-2 w-2 rounded-full ${
                                    i === index ? "bg-blue-600" : "bg-gray-300"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Viewport */}
                    <div className="relative h-[560px]">
                        {/* IMPORTANT: initial={false} and no mode="wait" => enter/exit overlap */}
                        <AnimatePresence initial={false} custom={dir}>
                            <motion.div
                                key={index}
                                custom={dir}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 will-change-transform [backface-visibility:hidden]"
                            >
                                <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                                    {/* Left visual */}
                                    <div className="bg-amber-50/60 flex items-center justify-center">
                                        <div className="max-w-md w-full px-8">
                                            <img
                                                src={slides[index].img}
                                                alt={slides[index].title}
                                                className="w-full h-72 object-contain rounded-2xl shadow"
                                            />
                                        </div>
                                    </div>

                                    {/* Right copy */}
                                    <div className="bg-white flex items-center">
                                        <div className="px-8 py-10 lg:py-0">
                      <span
                          className="inline-flex items-center gap-2 rounded-full bg-yellow-100 text-yellow-900 px-3 py-1 text-sm font-medium">
                        {slides[index].badge}
                      </span>
                                            <h3 className="mt-5 text-3xl font-semibold tracking-tight">
                                                {slides[index].title}
                                            </h3>
                                            <ul className="mt-6 space-y-3 text-gray-700">
                                                {slides[index].bullets.map((b, bi) => (
                                                    <li key={bi} className="flex gap-2">
                                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-800"/>
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black text-white px-5 py-3 hover:bg-gray-800">
                                                {slides[index].cta}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}