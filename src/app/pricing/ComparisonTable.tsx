"use client";
import {plans} from "@/data/planfeatures";
import {Check, X} from "lucide-react";

const rows: [string, string, string, string][] = [
    // core capacity
    ["AI voice agents", "1", "Up to 2", "Up to 3"],
    ["Included minutes / month", "500", "1,000", "1,500"],
    ["Concurrent calls", "5", "10", "15"],
    // platform features
    ["Call recordings & transcripts", "✓", "✓", "✓"],
    ["DeskApp dashboard", "✓", "✓", "✓"],
    ["Payment links", "—", "✓", "✓"],
    ["CRM integrations", "—", "HubSpot, Pipedrive", "HubSpot, Pipedrive"],
    ["WhatsApp/Messaging (AUD/msg)", "$0.10", "$0.10", "$0.10"],
    // support & usage
    ["Support SLA", "48–72h", "24–48h", "Priority < 24h"],
    ["Extra minutes (AUD/min)", "$0.30", "$0.25", "$0.20"],
];

export default function ComparisonTable() {
    return (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
            <h2 className="text-xl font-semibold">What’s included</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-sm">
                    <thead className="bg-white/5">
                    <tr>
                        <th className="px-4 py-3 text-left">Feature</th>
                        {plans.map((p) => (
                            <th key={p.id} className="px-4 py-3 text-left">{p.name}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="[&>tr:nth-child(odd)]:bg-white/0 [&>tr:nth-child(even)]:bg-white/5">
                    {rows.map((row) => (
                        <tr key={row[0]} className="border-t border-white/10">
                            <td className="px-4 py-3 font-medium">{row[0]}</td>
                            {row.slice(1).map((cell, i) => (
                                <td key={i} className="px-4 py-3">
                                    {cell === "✓" ? (
                                        <Check className="h-4 w-4 text-emerald-400"/>
                                    ) : cell === "—" ? (
                                        <X className="h-4 w-4 text-white/40"/>
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