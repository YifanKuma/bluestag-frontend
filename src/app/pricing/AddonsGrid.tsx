
import {useRef} from "react";
import {motion} from "framer-motion";
import type {AddonItem} from "@/types/pricing";
import {ICON_MAP} from "@/data/pricing-icons";

type Props = {
    addons: AddonItem[];
};

export default function AddonsGrid({addons}: Props) {
    const gridRef = useRef<HTMLDivElement>(null);

    return (
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
            <h2 className="text-xl font-semibold">Add-ons</h2>

            <div
                ref={gridRef}
                className="mt-4 grid gap-4 md:grid-cols-3"
            >
                {addons.map((addon) => {
                    const Icon =
                        addon.icon_key && ICON_MAP[addon.icon_key]
                            ? ICON_MAP[addon.icon_key]
                            : ICON_MAP.default;

                    return (
                        <motion.article
                            key={addon.id}
                            initial={{y: 10, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{duration: 0.3}}
                            whileHover={{y: -6, scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all"
                        >
                            {/* ICON */}
                            <div
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                <Icon className="h-5 w-5 text-white/80"/>
                            </div>

                            <h3 className="mt-3 font-semibold">{addon.title}</h3>
                            <p className="mt-1 text-sm text-white/70">
                                {addon.description}
                            </p>
                            <p className="mt-3 text-sm text-white/80">{addon.price}</p>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}
