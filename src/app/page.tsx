"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProductTabs from "@/components/ProductTabs";
import UseCasesGrid from "@/components/UseCasesGrid";
import DemoBanner from "@/components/DemoBanner";
import Languages from "@/components/Languages";
import UseCaseCarousel from "@/components/UseCaseCarousel";
import IntegrationsSection from "@/components/IntegrationsSection";
import BackgroundSwitcher from "@/components/BackgroundSwitcher";
import BlueGlowBackground from "@/components/BlueGlowBackground";
import CustomCursor from "@/components/CustomCursor"; // ✨ NEW

export default function Home() {
    return (
        <main className="relative min-h-screen text-white pt-16 overflow-hidden">
            {/* ✨ Fixed layered backgrounds */}
            <BackgroundSwitcher/>
            <BlueGlowBackground/>

            {/* 🧭 Navbar stays top */}
            <Navbar/>

            {/* 🚀 Hero Section */}
            <section id="hero" data-bg={0} className="relative z-10">
                <Hero/>
            </section>

            {/* 🤝 Trust Section */}
            <section id="trust" data-bg={0} className="relative z-10">
                <TrustBar/>
            </section>

            {/* 🧩 Product Section */}
            <section id="product" data-bg={1} className="relative z-10">
                <ProductTabs/>
            </section>

            {/* 🎠 Use Case Carousel */}
            <section id="use-cases-carousel" data-bg={1} className="relative z-10">
                <UseCaseCarousel/>
            </section>

            {/* 💼 Use Cases Grid */}
            <section id="use-cases-grid" data-bg={1} className="relative z-10">
                <UseCasesGrid/>
            </section>
            
            {/* 📞 Demo Banner */}
            <section id="demo" data-bg={2} className="relative z-10">
                <DemoBanner/>
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