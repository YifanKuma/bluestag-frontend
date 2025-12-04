

import {useState} from "react";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import type {FAQItem as FAQItemType} from "@/types/pricing";

function FAQItem({
                     qa,
                     open,
                     onToggle,
                 }: {
    qa: { q: string; a: string };
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                aria-expanded={open}
            >
                <span className="font-medium">{qa.q}</span>
                <motion.span
                    initial={false}
                    animate={{rotate: open ? 45 : 0}}
                    transition={{type: "spring", stiffness: 400, damping: 30}}
                    className="select-none text-xl leading-none"
                >
                    +
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{height: {duration: 0.28}, opacity: {duration: 0.2}}}
                    >
                        <div className="px-4 pb-4 pt-0">
                            <p className="text-sm text-white/70">{qa.a}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

type Props = {
    items: FAQItemType[];
};

export default function FAQ({items}: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
            <h2 className="text-xl font-semibold">Frequently asked</h2>

            <div className="mt-4 space-y-3">
                {items.map((faq, i) => (
                    <FAQItem
                        key={faq.id}
                        qa={{q: faq.question, a: faq.answer}}
                        open={openIndex === i}
                        onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 font-medium text-black hover:bg-emerald-400 transition"
                >
                    Book a live demo
                </Link>
            </div>
        </section>
    );
}
