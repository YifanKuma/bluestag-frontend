"use client";

import {useEffect, useState} from "react";
import IndustryPanel from "./IndustryPanel";
import DemoFlow from "./DemoFlow";

import type {IndustryItem} from "@/types/industries";

export default function IndustriesList({
                                           industries,
                                       }: {
    industries: IndustryItem[];
}) {
    const [isMobile, setIsMobile] = useState(false);
    const [active, setActive] = useState<IndustryItem | null>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry) => (
                <IndustryPanel
                    key={industry.id}
                    industry={industry}
                    isMobile={isMobile}
                    isActive={active?.id === industry.id}
                    onSelectAction={() => setActive(industry)}
                />
            ))}

            {!isMobile && active && (
                <div className="col-span-2 mt-10">
                    <DemoFlow steps={active.demo ?? []}/>
                </div>
            )}
        </div>
    );
}
