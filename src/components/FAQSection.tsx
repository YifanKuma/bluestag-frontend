"use client";

import {ChevronDown, ChevronUp} from "lucide-react";
import {useState} from "react";

export default function FAQSection() {
    const faqs = [
        {
            q: "What is BLUESTAG.AI?",
            a: "An AI voice agent platform that qualifies leads, books appointments, and supports customers in natural conversation."
        },
        {
            q: "Who is BLUESTAG.AI for?",
            a: "Teams in sales, support, and operations that want to automate high-volume calls without sacrificing customer experience."
        },
        {
            q: "What languages do you support?",
            a: "20+ languages with natural tone and local accents. We keep adding more."
        },
        {
            q: "Is it available 24/7?",
            a: "Yes—agents operate continuously with 99.9% uptime and seamless human handoff when needed."
        },
        {
            q: "What makes it different from IVR?",
            a: "Unlike keypad IVR trees, our agents hold human-like conversations, resolve more queries, and integrate with your tools."
        },
    ];

    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
            <h3 className="text-3xl font-extrabold">FAQs</h3>
            <p className="mt-2 text-gray-600">Still wondering how it works? Let’s make it Bluestag-clear.</p>

            <div className="mt-8 space-y-4">
                {faqs.map((item, i) => {
                    const isOpen = open === i;
                    return (
                        <div key={i} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <button
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                            >
                                <span className="font-medium text-gray-900">{item.q}</span>
                                {isOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                            </button>
                            {isOpen && <div className="px-5 pb-5 pt-0 text-gray-600">{item.a}</div>}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}