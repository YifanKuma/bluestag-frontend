"use client";

import {useState} from "react";
import PricingHero from "./PricingHero";
import PlansGrid from "./PlansGrid";
import ComparisonTable from "./ComparisonTable";
import AddonsGrid from "./AddonsGrid";
import FAQ from "./FAQ";
import type {PricingPageData} from "@/types/pricing";

export default function PricingPageClient({data}: { data: PricingPageData }) {
    const [annual, setAnnual] = useState(false);

    return (
        <div className="relative w-full text-white">
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
                onSelectAction={() => (window.location.href = "/contact")}
            />

            <ComparisonTable
                rows={data.comparison_rows}
                plans={data.plans}
            />

            <AddonsGrid addons={data.addons}/>
            <FAQ items={data.faqs}/>
        </div>
    );
}
