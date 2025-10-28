import {Suspense} from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import UseCasesGrid from "@/components/UseCasesGrid";
import Languages from "@/components/Languages";
import UseCaseCarousel from "@/components/UseCaseCarousel";
import IntegrationsSection from "@/components/IntegrationsSection";

// client-only cursor glow
import ClientCursorGlow from "@/components/ClientCursorGlow";

// If you know a component below uses useSearchParams/usePathname,
// import and wrap *that* one with Suspense (examples shown).
// e.g., ProductTabs may read ?plan from the URL.

export default function Page() {
    return (
        <main className="relative min-h-screen text-white pt-16">
            {/* 💫 Local cursor glow (client) */}
            <ClientCursorGlow/>

            {/* 🧭 Navbar */}
            <Navbar/>

            {/* 🚀 Hero Section */}
            <section id="hero" data-bg={0} className="relative z-10">
                <Hero/>
            </section>

            {/* 🧩 Product Section (wrap if it reads URL/search params) */}
            <section id="product" data-bg={1} className="relative z-10">
                <Suspense fallback={null}>
                    <ProductTabs/>
                </Suspense>
            </section>

            {/* 🎠 Use Case Carousel (wrap if it reads URL/search params) */}
            <section id="use-cases-carousel" data-bg={1} className="relative z-10">
                <Suspense fallback={null}>
                    <UseCaseCarousel/>
                </Suspense>
            </section>

            {/* 💼 Why Choose Bluestag AI */}
            <section id="use-cases-grid" data-bg={1} className="relative z-10">
                <UseCasesGrid/>
            </section>

            {/* 🧠 What is Agentic AI */}
            <section id="what-is-agentic-ai" data-bg={1} className="relative z-10 py-24 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* If these read URL, wrap them, otherwise leave as-is */}
                    {/* <Suspense fallback={null}><WhatIsAgent /></Suspense> */}
                    {/* <Suspense fallback={null}><AgentArchitecture /></Suspense> */}
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