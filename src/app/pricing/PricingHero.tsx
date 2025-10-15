"use client";
import {motion} from "framer-motion";
import BillingToggle from "@/app/pricing/BillingToggle";

type Props = {
    annual: boolean;
    onToggleAction: (next: boolean) => void; // ✅ renamed
};

export default function PricingHero({annual, onToggleAction}: Props) {
    return (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-10 text-center">
            <motion.h1
                initial={{y: 10, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5}}
                className="text-4xl md:text-5xl font-bold tracking-tight"
            >
                Simple pricing for voice AI that <span className="text-emerald-400">scales</span>
            </motion.h1>

            <motion.p
                initial={{y: 10, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{delay: 0.1, duration: 0.5}}
                className="mx-auto mt-3 max-w-2xl text-white/70"
            >
                All plans include Australian numbers, call recordings, transcripts, and analytics. Switch anytime.
            </motion.p>

            <div className="mt-6 flex justify-center">
                <BillingToggle annual={annual} onToggleAction={onToggleAction}/> {/* ✅ */}
            </div>
        </section>
    );
}