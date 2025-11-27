"use client";

import {Check, X} from "lucide-react";
import type {PricingPlan, ComparisonRow} from "@/types/pricing";

type Props = {
    rows: ComparisonRow[];
    plans: PricingPlan[];    // ⭐ added
};

export default function ComparisonTable({rows, plans}: Props) {
    return (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
            <h2 className="text-xl font-semibold">What’s included</h2>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-sm">
                    <thead className="bg-white/5">
                    <tr>
                        <th className="px-4 py-3 text-left">Feature</th>

                        {/* ⭐ dynamic plan names */}
                        {plans.map((p) => (
                            <th key={p.id} className="px-4 py-3 text-left">
                                {p.title}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody className="[&>tr:nth-child(odd)]:bg-white/0 [&>tr:nth-child(even)]:bg-white/5">
                    {rows.map((row) => (
                        <tr key={row.feature} className="border-t border-white/10">
                            <td className="px-4 py-3 font-medium">{row.feature}</td>

                            {row.values.map((cell, i) => (
                                <td key={i} className="px-4 py-3">
                                    {cell === "✓" ? (
                                        <Check className="h-4 w-4 text-emerald-400" />
                                    ) : cell === "—" ? (
                                        <X className="h-4 w-4 text-white/40" />
                                    ) : (
                                        <span className="text-white/80">{cell}</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
