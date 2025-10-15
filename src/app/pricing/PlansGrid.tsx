"use client";
import PlanCard from "@/app/pricing/PlanCard";
import {plans} from "@/data/pricing";
import type {Plan} from "@/data/pricing";

type Props = {
    annual: boolean;
    onSelectAction: (id: Plan["id"]) => void; // ✅ renamed
};

export default function PlansGrid({annual, onSelectAction}: Props) {
    return (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-14">
            <div className="grid gap-6 md:grid-cols-3">
                {plans.map((p) => (
                    <PlanCard key={p.id} plan={p} annual={annual} onSelectAction={onSelectAction}/>
                ))}
            </div>
        </section>
    );
}