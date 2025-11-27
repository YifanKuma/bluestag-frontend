"use client";

import {motion, Variants} from "framer-motion";
import {
    Clapperboard,
    Gauge,
    Clock,
    BadgeCheck,
    Layers,
    Wand2,
    Captions,
    Video as VideoIcon,
    Users,
    GraduationCap,
    Presentation,
    PlayCircle,
    Hourglass,
} from "lucide-react";
import Link from "next/link";
import type {VideoAIData} from "@/types/video-ai";

/* -------------------------------------------------------
   STRONG ICON MAPPING + FALLBACK
------------------------------------------------------- */
type IconName =
    | "Gauge"
    | "Clock"
    | "BadgeCheck"
    | "Layers"
    | "Wand2"
    | "Captions"
    | "Video"
    | "Users"
    | "GraduationCap"
    | "Presentation";

const ICONS: Record<IconName, React.ComponentType<{ className?: string }>> = {
    Gauge,
    Clock,
    BadgeCheck,
    Layers,
    Wand2,
    Captions,
    Video: VideoIcon,
    Users,
    GraduationCap,
    Presentation,
};

function getIcon(name: string | null | undefined) {
    return ICONS[name as IconName] ?? Presentation;
}

/* -------------------------------------------------------
   ANIMATION PRESETS
------------------------------------------------------- */
const fadeUp: Variants = {
    hidden: {opacity: 0, y: 16},
    show: {opacity: 1, y: 0, transition: {duration: 0.5, ease: "easeOut"}},
};

const stagger: Variants = {
    hidden: {},
    show: {transition: {staggerChildren: 0.08}},
};

/* -------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------- */
export default function VideoAISection({data}: { data: VideoAIData }) {
    const comingSoon = data.badge_state === "Coming soon";

    const preventClickIfSoon = (
        e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
    ) => {
        if (!comingSoon) return;
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <section className="relative z-10" data-testid="video-ai-section">

            {/* ---------------- Background Glows ---------------- */}
            <div
                className="pointer-events-none absolute -top-40 -right-32 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"/>
            <div
                className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"/>

            {/* ---------------- Coming Soon Banner ---------------- */}
            {comingSoon && (
                <div
                    className="mx-auto mb-4 max-w-5xl rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-amber-200">
                    <div className="flex items-center gap-2">
                        <Hourglass className="h-4 w-4"/>
                        <p className="text-sm">
                            <span className="font-semibold">{data.badge_label}</span>{" "}
                            — join the waitlist to be notified when it launches.
                        </p>
                    </div>
                </div>
            )}

            {/* ---------------- Header ---------------- */}
            <motion.header
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.4}}
                className="mx-auto mb-10 max-w-3xl text-center"
            >
                <div
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <Clapperboard className="h-4 w-4"/>
                    <span>{data.badge_state}</span>
                    <span className="text-white/40">•</span>
                    <span>{data.badge_label}</span>
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                    {data.title ?? "Video AI"}
                </h2>

                <p className="mt-3 text-white/70">{data.subtitle ?? ""}</p>
            </motion.header>

            {/* ---------------- KPI Items ---------------- */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.3}}
                className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
            >
                {data.kpi_item?.map((item) => {
                    const Icon = getIcon(item.icon);

                    return (
                        <motion.div
                            key={item.id}
                            variants={fadeUp}
                            className="relative rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur"
                        >
                            {comingSoon && (
                                <span
                                    className="absolute right-2 top-2 rounded-md border border-white/10 bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/70">
                                    Preview
                                </span>
                            )}

                            <div
                                className="mx-auto flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/10">
                                <Icon className="h-4 w-4"/>
                            </div>

                            <p className="mt-2 text-2xl font-extrabold">{item.kpi}</p>
                            <p className="text-xs text-white/70">{item.label}</p>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* ---------------- Features ---------------- */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3"
            >
                {data.features.map((f) => {
                    const Icon = getIcon(f.icon);

                    return (
                        <motion.div
                            key={f.id}
                            variants={fadeUp}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5"
                        >
                            {comingSoon && (
                                <div
                                    className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_10px,rgba(255,255,255,0.03)_10px_20px)]"/>
                            )}

                            <div className="flex items-center gap-3">
                                <div className="rounded-lg border border-white/10 bg-white/10 p-2">
                                    <Icon className="h-5 w-5"/>
                                </div>
                                <div className="text-xs text-white/60">{f.badge}</div>
                            </div>

                            <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                            <p className="mt-1 text-sm text-white/70">{f.description}</p>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* ---------------- Use Cases ---------------- */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3"
            >
                {data.usecases.map((u) => {
                    const Icon = getIcon(u.icon);

                    return (
                        <motion.div
                            key={u.id}
                            variants={fadeUp}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg border border-white/10 bg-white/10 p-2">
                                    <Icon className="h-5 w-5"/>
                                </div>
                                <div className="text-xs text-white/60">{u.badge}</div>
                            </div>

                            <h3 className="mt-3 text-lg font-semibold">{u.title}</h3>
                            <p className="mt-1 text-sm text-white/70">{u.description}</p>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* ---------------- Showcase (text version) ---------------- */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3"
            >
                {data.showcase.map((s) => {
                    const Icon = getIcon(s.icon);

                    return (
                        <motion.div
                            key={s.id}
                            variants={fadeUp}
                            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg border border-white/10 bg-white/10 p-2">
                                    <Icon className="h-5 w-5"/>
                                </div>
                                <div className="text-xs text-white/60">{s.badge ?? "Showcase"}</div>
                            </div>

                            <h3 className="mt-3 text-lg font-semibold">
                                {s.title ?? "Untitled"}
                            </h3>
                            <p className="mt-1 text-sm text-white/70">
                                {s.description ?? "No description available."}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* ---------------- Video Showcase Grid ---------------- */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.3}}
                className="mx-auto mt-12 max-w-6xl"
            >
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">Recent outputs</h4>

                    <button
                        onClick={preventClickIfSoon}
                        aria-disabled={comingSoon}
                        className={`rounded-full border px-3 py-1.5 text-xs ${
                            comingSoon
                                ? "cursor-not-allowed border-white/10 bg-white/5 text-white/50"
                                : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                    >
                        {comingSoon ? "Preview only" : "View all"}
                    </button>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.showcase.map((v) => (
                        <div
                            key={v.id}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30"
                        >
                            <div
                                className="aspect-video w-full bg-[linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))]"/>

                            <button
                                onClick={preventClickIfSoon}
                                aria-disabled={comingSoon}
                                className={`absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur transition ${
                                    comingSoon
                                        ? "cursor-not-allowed border-white/10 bg-black/40"
                                        : "border-white/20 bg-black/50 group-hover:scale-105"
                                }`}
                            >
                                <PlayCircle className="h-6 w-6"/>
                            </button>

                            <div
                                className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-3 text-sm">
                                <div>
                                    <p className="font-medium">{v.title ?? "Untitled"}</p>
                                    <p className="text-xs text-white/70">
                                        {(v.ratio ?? "16:9") + " • " + (v.length ?? "00:00")}
                                    </p>
                                </div>

                                <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-[10px]">
                                    {comingSoon ? "Mock" : "Preview"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ---------------- Flow Steps ---------------- */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.3}}
                className="mx-auto mt-12 max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-5"
            >
                <h4 className="text-lg font-semibold">How it works</h4>

                <ol className="mt-4 grid gap-4 md:grid-cols-3">
                    {data.flow_steps.map((step) => (
                        <li
                            key={step.id}
                            className="relative rounded-xl border border-white/10 bg-black/20 p-4"
                        >
                            <div
                                className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-sm font-semibold">
                                {step.step_number}
                            </div>

                            <p className="font-medium">{step.title}</p>
                            <p className="mt-1 text-sm text-white/70">
                                {step.text}
                            </p>
                        </li>
                    ))}
                </ol>
            </motion.div>

            {/* ---------------- CTA ---------------- */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.3}}
                className="mx-auto mt-10 max-w-3xl"
            >
                <div
                    className="relative overflow-hidden rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-indigo-500/10 p-6">
                    <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl"/>
                    <div className="absolute -bottom-20 -left-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"/>

                    <div className="relative">
                        <h5 className="text-xl font-semibold">{data.cta_title ?? "Get Started"}</h5>

                        <p className="text-white/70 leading-relaxed">
                            {data.cta_description}
                        </p>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={data.cta_button_link ?? "#"}
                                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/90 px-4 py-2 text-sm font-medium text-black hover:bg-white"
                            >
                                {data.cta_button_label ?? "Contact us"}
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

        </section>
    );
}
