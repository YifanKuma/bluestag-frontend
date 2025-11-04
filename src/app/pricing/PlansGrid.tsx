"use client";

import PlanCard from "@/app/pricing/PlanCard";
import {plans} from "@/data/pricing";
import type {Plan} from "@/data/pricing";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

type Props = {
    annual: boolean;
    onSelectAction: (id: Plan["id"]) => void;
};

export default function PlansGrid({annual, onSelectAction}: Props) {
    return (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-14 text-center">
            {/* Pricing Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                {plans.map((p) => (
                    <PlanCard
                        key={p.id}
                        plan={p}
                        annual={annual}
                        onSelectAction={onSelectAction}
                    />
                ))}
            </div>

            {/* ✅ Single long button below all cards */}
            <div className="mt-10 text-center">
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3 text-base font-semibold text-black shadow-lg hover:shadow-emerald-500/30 hover:brightness-105 transition-all"
                >
                    Talk to Sales
                    <ArrowRight className="h-5 w-5"/>
                </Link>
            </div>
        </section>
    );
}
