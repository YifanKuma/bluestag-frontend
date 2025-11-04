"use client";

import {motion} from "framer-motion";
import {Check} from "lucide-react";
import type {Plan} from "@/data/planfeatures";

type Props = {
    plan: Plan;
    annual: boolean;
    onSelectAction?: (planId: Plan["id"]) => void;
};

const formatPrice = (amount: number) =>
    `$${amount.toLocaleString("en-AU", {maximumFractionDigits: 0})}`;

export default function PlanCard({plan, annual, onSelectAction}: Props) {
    const price = annual ? plan.yearlyPriceAud : plan.monthlyPriceAud;
    const unit = annual ? "/year" : "/month";
    const Icon = plan.icon;

    return (
        <motion.div
            whileHover={{y: -4}}
            className={[
                "relative flex flex-col justify-between rounded-2xl border p-6 md:p-7 transition-all",
                plan.popular
                    ? "border-emerald-400/40 bg-emerald-400/5 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                    : "border-white/10 bg-white/5",
            ].join(" ")}
        >
            {plan.popular && (
                <div
                    className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-black">
                    Most Popular
                </div>
            )}

            <div>
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2">
                        <Icon className="h-5 w-5"/>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{plan.name}</h3>
                        <p className="text-sm text-white/70">{plan.tagline}</p>
                    </div>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{formatPrice(price)}</span>
                    <span className="text-sm text-white/60">{unit}</span>
                    {annual && (
                        <span className="ml-2 rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">
              billed yearly
            </span>
                    )}
                </div>

                {/* Minutes & concurrency */}
                <div className="mt-2 text-sm text-white/70">
                    Includes{" "}
                    <b>{plan.callMinutesIncluded.toLocaleString("en-AU")} mins</b> ·{" "}
                    <b>
                        Up to {plan.parallelCalls} <strong>X</strong> concurrent
                    </b>
                </div>

                {/* Feature list */}
                <ul className="mt-5 space-y-2">
                    {plan.bullets.map((b) => (
                        <li key={b.label} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-400"/>
                            <span>{b.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
