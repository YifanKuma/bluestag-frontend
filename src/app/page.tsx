"use client";

import Navbar from "@/components/Navbar";
import SectionDots from "@/components/SectionDots";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProductTabs from "@/components/ProductTabs";
import UseCasesGrid from "@/components/UseCasesGrid";
import DemoBanner from "@/components/DemoBanner";
import Integrations from "@/components/Integrations";

export default function Home() {
    return (
        <main
            className="min-h-screen bg-[radial-gradient(80%_60%_at_50%_-10%,#0ea5e9_0%,transparent_60%),linear-gradient(180deg,#0b1020_0%,#0b1020_100%)] text-white pt-16 relative z-0">
            <Navbar/>

            <Hero/>
            <TrustBar/>
            <ProductTabs/>
            <UseCasesGrid/>
            <DemoBanner/>
            <Integrations/>

            <Footer/>
        </main>
    );
}