"use client";
import {useState} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {plans} from "@/data/pricing";
import PricingHero from "@/app/pricing/PricingHero";
import PlansGrid from "@/app/pricing/PlansGrid";
import ComparisonTable from "@/app/pricing/ComparisonTable";
import AddonsGrid from "@/app/pricing/AddonsGrid";
import FAQ from "@/app/pricing/FAQ";

export default function PricingPage() {
    const [annual, setAnnual] = useState(true);

    const onSelectPlanAction = (id: (typeof plans)[number]["id"]) => {
        window.location.href = "/contact";
    };

    return (
        <main className="relative min-h-screen overflow-hidden text-white pt-16">
            <Navbar/>
            <PricingHero annual={annual} onToggleAction={setAnnual}/> {/* ✅ */}
            <PlansGrid annual={annual} onSelectAction={onSelectPlanAction}/> {/* ✅ */}
            <ComparisonTable/>
            <AddonsGrid/>
            <FAQ/>
            <Footer/>
        </main>
    );
}