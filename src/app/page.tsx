"use client";

import {motion, useMotionValue, useTransform} from "framer-motion";
import {useEffect} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import UseCasesGrid from "@/components/UseCasesGrid";
import Languages from "@/components/Languages";
import UseCaseCarousel from "@/components/UseCaseCarousel";
import IntegrationsSection from "@/components/IntegrationsSection";

// ✨ new imports
import WhatIsAgent from "@/components/WhatIsAgent";
import AgentArchitecture from "@/components/AgentArchitecture";

export default function Home() {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mx.set(e.clientX);
            my.set(e.clientY);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [mx, my]);

    const bgX = useTransform(mx, (v) => `${v}px`);
    const bgY = useTransform(my, (v) => `${v}px`);

    return (
        <main className="relative min-h-screen text-white pt-16">
            {/* 💫 Local cursor glow (optional, keep this one) */}
            <motion.div
                aria-hidden
                style={{left: bgX, top: bgY}}
                className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 w-[45vmin] h-[45vmin] rounded-full bg-sky-400/15 blur-3xl z-[4]"
            />

            {/* 🧭 Navbar */}
            <Navbar/>

            {/* 🚀 Hero Section */}
            <section id="hero" data-bg={0} className="relative z-10">
                <Hero/>
            </section>

            {/* 🧩 Product Section */}
            <section id="product" data-bg={1} className="relative z-10">
                <ProductTabs/>
            </section>

            {/* 🎠 Use Case Carousel */}
            <section id="use-cases-carousel" data-bg={1} className="relative z-10">
                <UseCaseCarousel/>
            </section>

            {/* 💼 Why Choose Bluestag AI */}
            <section id="use-cases-grid" data-bg={1} className="relative z-10">
                <UseCasesGrid/>
            </section>

            {/* 🧠 What is Agentic AI */}
            <section id="what-is-agentic-ai" data-bg={1} className="relative z-10 py-24 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <WhatIsAgent/>
                </div>
            </section>

            {/* ⚙️ Agentic AI Architecture */}
            <section id="agentic-architecture" data-bg={1} className="relative z-10 py-24 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <AgentArchitecture/>
                </div>
            </section>

            {/* 🔌 Integrations */}
            <section id="integrations" data-bg={2} className="relative z-10">
                <IntegrationsSection/>
            </section>

            {/* 🌍 Languages */}
            <section id="languages" data-bg={3} className="relative z-10">
                <Languages/>
            </section>

            {/* ⚙️ Footer */}
            <section id="footer" data-bg={4} className="relative z-10">
                <Footer/>
            </section>
        </main>
    );
}
