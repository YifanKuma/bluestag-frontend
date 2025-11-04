"use client";

import {motion, Variants} from "framer-motion";
import {
    Clapperboard,
    Video as VideoIcon,
    Wand2,
    Captions,
    Gauge,
    BadgeCheck,
    Clock,
    PlayCircle,
    Layers,
    Users,
    GraduationCap,
    Presentation,
    Hourglass
} from "lucide-react";
import React from "react";
import Link from "next/link";

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 16},
    show: {opacity: 1, y: 0, transition: {duration: 0.5, ease: "easeOut"} as never},
};

const stagger: Variants = {hidden: {}, show: {transition: {staggerChildren: 0.08}}};

type Props = {
    /** If true, shows Coming Soon messaging and disables non-waitlist actions. */
    comingSoon?: boolean;
};

export default function VideoAISection({comingSoon = true}: Props) {
    // Small helper to block clicks when coming soon (for non-CTA previews)
    const blockIfSoon = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        if (!comingSoon) return;
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <section className="relative z-10" data-testid="video-ai-section">
            {/* ✨ violet/indigo backdrops */}
            <div
                className="pointer-events-none absolute -top-40 -right-32 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"/>
            <div
                className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"/>

            {/* Coming soon banner */}
            {comingSoon && (
                <div
                    role="status"
                    aria-live="polite"
                    className="mx-auto mb-4 max-w-5xl rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-amber-200"
                >
                    <div className="flex items-center gap-2">
                        <Hourglass className="h-4 w-4"/>
                        <p className="text-sm">
                            <span className="font-semibold">Video AI is in active development.</span>{" "}
                            Contact us for details — join the waitlist to be notified when it goes live.
                        </p>
                    </div>
                </div>
            )}

            {/* Header */}
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
                    <span>{comingSoon ? "Coming soon" : "New"}</span>
                    <span className="text-white/40">•</span>
                    <span>Automate your video pipeline</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                    Video AI — generate, edit, and caption at scale
                </h2>
                <p className="mt-3 text-white/70">
                    Turn raw footage, product shots, or screen recordings into polished, branded videos.
                    Auto-edit, add captions, translate, and publish to your channels — with guardrails and approvals.
                </p>
            </motion.header>

            {/* KPI strip */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.3}}
                className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
            >
                {[
                    {icon: Gauge, kpi: "6×", label: "Faster turnaround"},
                    {icon: Clock, kpi: "-70%", label: "Editing time"},
                    {icon: BadgeCheck, kpi: "99.9%", label: "Brand compliance"},
                    {icon: Layers, kpi: "Multi", label: "Aspect ratios"},
                ].map(({icon: Icon, kpi, label}) => (
                    <motion.div
                        key={label}
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
                        <p className="mt-2 text-2xl font-extrabold">{kpi}</p>
                        <p className="text-xs text-white/70">{label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Feature grid */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3"
            >
                {[
                    {
                        icon: Wand2,
                        title: "AI Editing Pipeline",
                        desc: "Auto-cut silences, add b-roll, logos, end-cards, and music that matches your brand.",
                        badge: "Auto-edit",
                    },
                    {
                        icon: Captions,
                        title: "Captions & Translation",
                        desc: "Generate accurate captions, translate to 20+ languages, and burn-in or export SRT/VTT.",
                        badge: "Multilingual",
                    },
                    {
                        icon: VideoIcon,
                        title: "Resize & Repurpose",
                        desc: "One upload → shorts, reels, stories, 16:9/9:16/1:1 with smart reframing and hook highlights.",
                        badge: "Smart crop",
                    },
                ].map(({icon: Icon, title, desc, badge}) => (
                    <motion.div
                        key={title}
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
                            <div className="text-xs text-white/60">{badge}</div>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                        <p className="mt-1 text-sm text-white/70">{desc}</p>
                        <div
                            className="pointer-events-none absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                            style={{background: "radial-gradient(600px 120px at 20% 0%, rgba(255,255,255,.12), transparent)"}}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Use-case grid */}
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3"
            >
                {[
                    {
                        icon: Users,
                        title: "Recruitment & Interviews",
                        desc: "Automate candidate interviews with structured AI questions, tone analysis, and scoring.",
                        badge: "Hiring",
                    },
                    {
                        icon: GraduationCap,
                        title: "Education & Training",
                        desc: "Create course materials, training walkthroughs, and lecture summaries from recordings.",
                        badge: "Learning",
                    },
                    {
                        icon: Presentation,
                        title: "Presentation Practice",
                        desc: "Record practice runs and get instant AI feedback on pacing, clarity, and confidence.",
                        badge: "Coaching",
                    },
                ].map(({icon: Icon, title, desc, badge}) => (
                    <motion.div
                        key={title}
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
                            <div className="text-xs text-white/60">{badge}</div>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                        <p className="mt-1 text-sm text-white/70">{desc}</p>
                        <div
                            className="pointer-events-none absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                            style={{background: "radial-gradient(600px 120px at 20% 0%, rgba(255,255,255,.12), transparent)"}}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Showcase rail */}
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
                        onClick={blockIfSoon}
                        aria-disabled={comingSoon}
                        className={`rounded-full border border-white/10 px-3 py-1.5 text-xs ${
                            comingSoon ? "cursor-not-allowed bg-white/5 text-white/50" : "bg-white/5 text-white/80 hover:bg-white/10"
                        }`}
                        title={comingSoon ? "Coming soon — demo previews are not yet available." : "View all"}
                    >
                        {comingSoon ? "Preview only" : "View all"}
                    </button>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {title: "Product teaser (Reels)", len: "0:29", ratio: "9:16"},
                        {title: "How-to micro demo", len: "1:02", ratio: "16:9"},
                        {title: "Founder clip (Shorts)", len: "0:41", ratio: "9:16"},
                    ].map((v, i) => (
                        <div key={i}
                             className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                            <div
                                className="aspect-video w-full bg-[linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))]"/>
                            <button
                                onClick={blockIfSoon}
                                aria-disabled={comingSoon}
                                className={`absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur transition ${
                                    comingSoon ? "cursor-not-allowed border-white/10 bg-black/40" : "border-white/20 bg-black/50 group-hover:scale-105"
                                }`}
                                aria-label={`Play ${v.title}`}
                                title={comingSoon ? "Coming soon — playback disabled." : `Play ${v.title}`}
                            >
                                <PlayCircle className="h-6 w-6"/>
                            </button>
                            <div
                                className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm">
                                <div>
                                    <p className="font-medium">{v.title}</p>
                                    <p className="text-xs text-white/70">
                                        {v.ratio} • {v.len}
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

            {/* Flow / timeline */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.3}}
                className="mx-auto mt-12 max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-5"
            >
                <h4 className="text-lg font-semibold">How it will work</h4>
                <ol className="mt-4 grid gap-4 md:grid-cols-3">
                    {[
                        {
                            step: 1,
                            title: "Upload or record",
                            text: "Drop footage or capture a screen/webcam recording in-app."
                        },
                        {
                            step: 2,
                            title: "Pick a recipe",
                            text: "Choose a brand preset: cuts, captions, overlays, intros/outros."
                        },
                        {
                            step: 3,
                            title: "Approve & publish",
                            text: "One-click approval routes to YouTube, TikTok, Instagram, and Drive."
                        },
                    ].map((s) => (
                        <li key={s.step} className="relative rounded-xl border border-white/10 bg-black/20 p-4">
                            <div
                                className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-sm font-semibold">
                                {s.step}
                            </div>
                            <p className="font-medium">{s.title}</p>
                            <p className="mt-1 text-sm text-white/70">{s.text}</p>
                        </li>
                    ))}
                </ol>
            </motion.div>

            {/* CTA — single primary to waitlist */}
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
                        <h5 className="text-xl font-semibold">
                            {comingSoon ? "Get early access to Video AI" : "Ready to scale your video output?"}
                        </h5>
                        <p className="mt-1 text-white/70">
                            {comingSoon
                                ? "Contact us for details and join the waitlist. We’ll notify you the moment this feature launches."
                                : "Book a 10-minute demo to see auto-editing, captions, and publishing in action."}
                        </p>
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/contact?topic=video-ai-waitlist"
                                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/90 px-4 py-2 text-sm font-medium text-black hover:bg-white"
                                prefetch
                            >
                                {comingSoon ? "Contact us / Join waitlist" : "Book a demo"}
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}