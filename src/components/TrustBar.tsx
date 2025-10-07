"use client";
import Section from "./Section";

export default function TrustBar() {
    const brands = [
        "Australian Workplace Training",
        "Stripe",
        "Shopify",
        "Xero",
        "Salesforce",
    ];
    return (
        <Section id="resources" className="py-12 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
                {brands.map((b) => (
                    <div key={b} className="text-sm text-white/70">{b}</div>
                ))}
            </div>
        </Section>
    );
}