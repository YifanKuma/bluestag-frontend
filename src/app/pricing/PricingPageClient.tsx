"use client";

import {useState} from "react";
import PricingHero from "@/app/pricing/PricingHero";
import PlansGrid from "@/app/pricing/PlansGrid";
import ComparisonTable from "@/app/pricing/ComparisonTable";
import AddonsGrid from "@/app/pricing/AddonsGrid";
import FAQ from "@/app/pricing/FAQ";
import type {PricingPageData} from "@/types/pricing";
import NavbarServer from "@/components/NavbarServer";
import Footer from "@/components/Footer";

export default function PricingPageClient({data}: { data: PricingPageData }) {
    const [annual, setAnnual] = useState(false);

    return (
        <main className="relative min-h-screen overflow-hidden text-white pt-16">
            <NavbarServer/>

            <PricingHero
                annual={annual}
                onToggleAction={setAnnual}
                title={data.hero_title}
                subtitle={data.hero_subtitle}
                labelMonthly={data.hero_toggle_label_monthly}
                labelAnnual={data.hero_toggle_label_annual}
            />

            <PlansGrid
                annual={annual}
                plans={data.plans}
                onSelectAction={() => window.location.href = "/contact"}
            />

            <ComparisonTable
                rows={data.comparison_rows}
                plans={data.plans}     // ⭐ REQUIRED
            />


            <AddonsGrid addons={data.addons}/>

            <FAQ items={data.faqs}/>
            <Footer/>

        </main>
    );
}
