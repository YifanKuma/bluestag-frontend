"use client";

import PlanCard from "@/app/pricing/PlanCard";
import type {PricingPlan} from "@/types/pricing";

type Props = {
    annual: boolean;
    plans: PricingPlan[];
    onSelectAction: (id: PricingPlan["id"]) => void;
};

export default function PlansGrid({annual, plans, onSelectAction}: Props) {
    return (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-14 text-center">
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
        </section>
    );
}
