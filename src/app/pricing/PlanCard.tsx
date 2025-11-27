"use client";

import {motion} from "framer-motion";
import {Check} from "lucide-react";
import type {PricingPlan} from "@/types/pricing";
import {ICON_MAP} from "@/data/pricing-icons";

type Props = {
    plan: PricingPlan;
    annual: boolean;
    onSelectAction?: (id: number) => void;
};

const formatPrice = (amount: number) =>
    `$${amount.toLocaleString("en-AU", {maximumFractionDigits: 0})}`;

export default function PlanCard({plan, annual, onSelectAction}: Props) {
    const price = annual ? plan.price_annual : plan.price_monthly;
    const unit = annual ? "/year" : "/month";

    // ⭐ Icon Component from Strapi icon_key
    const Icon = plan.icon_key ? ICON_MAP[plan.icon_key] : null;

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
            {/* Popular badge */}
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
                        {Icon ? (
                            <Icon className="h-5 w-5 text-emerald-400"/>
                        ) : (
                            <span className="h-5 w-5 block"/>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">{plan.title}</h3>
                        {plan.tagline && (
                            <p className="text-sm text-white/70">{plan.tagline}</p>
                        )}
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

                {/* Minutes & concurrent calls */}
                <div className="mt-2 text-sm text-white/70">
                    Includes <b>{plan.call_minutes_included.toLocaleString("en-AU")} mins</b> ·{" "}
                    <b>
                        Up to {plan.parallel_calls} <strong>X</strong> concurrent
                    </b>
                </div>

                {/* Feature list */}
                <ul className="mt-5 space-y-2">
                    {plan.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-400"/>
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA */}
            {onSelectAction && (
                <button
                    onClick={() => onSelectAction?.(plan.id)}
                    className="mt-6 w-full rounded-xl
                               bg-gradient-to-r from-emerald-500 to-cyan-500
                               py-2.5 text-sm font-semibold text-black
                               shadow-lg shadow-emerald-500/20
                               transition-all duration-300
                               hover:shadow-emerald-400/40 hover:-translate-y-0.5
                               hover:brightness-110 active:scale-95"
                >
                    Select plan
                </button>
            )}
        </motion.div>
    );
}
