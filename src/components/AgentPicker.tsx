"use client";

import {useState, useMemo} from "react";
import {motion} from "framer-motion";
import {
    Package, Stethoscope, Banknote, GraduationCap,
    BriefcaseBusiness, ShoppingBag, Phone, ArrowRight
} from "lucide-react";

export const tabs = ["Logistics", "Health Care", "Financial", "Education", "HR & Recruitment", "Ecommerce"] as const;
export type Tab = (typeof tabs)[number];

type Props = {
    onStartCall?: (category: Tab, company?: string) => void;
    note?: string; // e.g. "Agent call is available for 2 minutes"
    title?: string; // e.g. "Use your BLUESTAG Agent."
};

const icons: Record<Tab, React.ElementType> = {
    "Logistics": Package,
    "Health Care": Stethoscope,
    "Financial": Banknote,
    "Education": GraduationCap,
    "HR & Recruitment": BriefcaseBusiness,
    "Ecommerce": ShoppingBag,
};

export default function AgentPicker({
                                        onStartCall,
                                        note = "Agent call is available for 2 minutes",
                                        title = "Use your BLUESTAG Agent."
                                    }: Props) {
    const [active, setActive] = useState<Tab>("Education");
    const [company, setCompany] = useState("");

    const ActiveIcon = useMemo(() => icons[active], [active]);

    return (
        <section className="w-full bg-[#FCFAF7]">
            <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 lg:py-20">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                    {title}
                </h2>
                <p className="mt-3 text-lg text-gray-600">
                    Select a category and talk with your agent.
                </p>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    {/* LEFT: Category grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {tabs.map((t) => {
                            const Icon = icons[t];
                            const selected = t === active;
                            return (
                                <motion.button
                                    key={t}
                                    onClick={() => setActive(t)}
                                    whileHover={{y: -2}}
                                    className={[
                                        "group relative w-full rounded-2xl border p-5 text-left transition-all",
                                        "shadow-sm hover:shadow-md",
                                        selected
                                            ? "border-gray-900 bg-white"
                                            : "border-gray-200 bg-white/70 hover:bg-white"
                                    ].join(" ")}
                                >
                                    <div className="flex items-center gap-4">
                    <span className={[
                        "inline-flex h-12 w-12 items-center justify-center rounded-xl border",
                        selected ? "border-gray-900" : "border-gray-300"
                    ].join(" ")}>
                      <Icon className="h-6 w-6"/>
                    </span>
                                        <div>
                                            <p className="font-semibold text-gray-900">{t}</p>
                                            <p className="text-sm text-gray-500">Try sample call</p>
                                        </div>
                                        <ArrowRight
                                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"/>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* RIGHT: Demo panel */}
                    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                        <div className="grid grid-rows-[1fr_auto] h-full">
                            <div className="p-8 lg:p-10 flex items-center gap-6">
                                {/* illustration */}
                                <div className="relative shrink-0">
                                    <div
                                        className="h-28 w-28 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                                        <ActiveIcon className="h-10 w-10"/>
                                    </div>
                                </div>
                                {/* copy */}
                                <div className="min-w-0">
                                    <p className="text-2xl font-bold text-gray-900">
                                        Try <span className="underline decoration-gray-300">'{active}'</span> Agents
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">{note}</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-gray-50/80 border-t border-gray-200 p-6">
                                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                                    <div className="relative flex-1">
                                        <input
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            placeholder="Enter company name"
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        />
                                        <span
                                            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                      {/* simple icon box */}
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path
                                                d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5"
                                                strokeLinecap="round"/></svg>
                    </span>
                                    </div>
                                    <button
                                        onClick={() => onStartCall?.(active, company)}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white hover:opacity-90 focus:outline-none"
                                    >
                                        <Phone className="h-5 w-5"/>
                                        Start Call
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* soft shadow glow */}
                        <div
                            className="pointer-events-none absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-gray-900/10 blur-2xl"/>
                    </div>
                </div>
            </div>
        </section>
    );
}