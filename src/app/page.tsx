"use client";

import {motion} from "framer-motion";
import {ArrowRight, Check, PhoneCall, Rocket} from "lucide-react";
import DemoSection from "@/components/DemoSection";
import UseCasesSlider from "@/components/UseCasesSlider";
import FAQSection from "@/components/FAQSection";
import PhoneCta from "@/components/PhoneCta";
import NetworkStats from "@/components/NetworkStats";
import FeaturesSection from "@/components/FeaturesSection";
import VerticalSlider from "@/components/VerticalSlider/VerticalSlider";
import AgentPicker from "@/components/AgentPicker";
import Integrations from "@/components/Integrations";
import LanguageSupport from "@/components/LanguageSupport";
import Footer from "@/components/Footer";
import TypedText from "@/components/TypedText";

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
                <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                    <h1 className="font-extrabold text-xl text-blue-600">BLUESTAG.AI</h1>
                    <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
                        <a href="#use-cases" className="hover:text-gray-900">Use Cases</a>
                        <a href="#features" className="hover:text-gray-900">Features</a>
                        <a href="#pricing" className="hover:text-gray-900">Pricing</a>
                    </nav>
                    <a
                        href="#get-started"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Get started <ArrowRight size={16}/>
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-4 py-20 text-center">
                <motion.h2
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="text-4xl sm:text-5xl font-extrabold tracking-tight"
                >
                    AI Agents That Help You Scale
                </motion.h2>

                <TypedText />

                <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                    Try our demo. Experience the magic—qualify leads, book appointments, and resolve queries 24/7.
                </p>

                {/* Phone CTA (flag dropdown + validation) */}
                <PhoneCta/>

                {/* Optional secondary CTAs */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <a
                        href="#get-started"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Get Started <Rocket size={16}/>
                    </a>
                    <a
                        href="#demo"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-300"
                    >
                        Book a Demo <PhoneCall size={16}/>
                    </a>
                </div>
            </section>

            <UseCasesSlider/>

            <NetworkStats/>

            <div id='features'>
                <FeaturesSection/>
            </div>

            <VerticalSlider/>

            {/* Use Cases & Demo */}
            <div id="use-cases">
                <AgentPicker
                    title="Use your Ringg Agent."
                    note="Agent call is available for 2 minutes"
                    onStartCall={(category, company) => {
                        // hook up your modal / dialer here
                        console.log("start", {category, company});
                    }}
                />
            </div>

            <Integrations/>

            <LanguageSupport/>

            <FAQSection/>

            {/* CTA */}
            <section id="get-started" className="bg-blue-600 text-white text-center py-20">
                <h3 className="text-3xl font-bold">Ready to scale with BLUESTAG.AI?</h3>
                <p className="mt-2 text-blue-100">No credit card required. Cancel anytime.</p>
                <a
                    href="#"
                    className="mt-6 inline-block px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100"
                >
                    Get Started
                </a>
            </section>

            {/* Footer */}
            <Footer/>
        </main>
    );
}