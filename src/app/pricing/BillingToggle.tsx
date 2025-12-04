
import {motion} from "framer-motion";

type Props = {
    annual: boolean;
    onToggleAction: (next: boolean) => void;
};

export default function BillingToggle({annual, onToggleAction}: Props) {
    return (
        <div
            className="relative inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            {/* 💫 Moving highlight */}
            <motion.div
                layout
                className="absolute top-1 left-1 h-7 rounded-full bg-white/10"
                initial={false}
                animate={{x: annual ? 82 : 0, width: annual ? 112 : 80}}
                transition={{type: "spring", stiffness: 380, damping: 26}}
            />

            {/* 🔘 Monthly */}
            <button
                onClick={() => onToggleAction(false)}
                className={`relative z-10 px-4 py-1 text-sm font-medium transition-colors ${
                    !annual ? "text-white" : "text-white/60"
                }`}
                type="button"
            >
                Monthly
            </button>

            {/* 🔘 Yearly + discount inside highlight */}
            <button
                onClick={() => onToggleAction(true)}
                className={`relative z-10 flex items-center gap-1 px-3 py-1 text-sm font-medium transition-colors ${
                    annual ? "text-white" : "text-white/60"
                }`}
                type="button"
            >
                Yearly
                <span
                    className={`rounded-full bg-green-500/80 px-2 py-[1px] text-[10px] font-semibold text-white ${
                        annual ? "opacity-100" : "opacity-70"
                    }`}
                >
                    15% off
                </span>
            </button>
        </div>
    );
}