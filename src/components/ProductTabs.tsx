"use client";
import Link from "next/link";
import {useState} from "react";
import Section from "./Section";
import GlassCard from "./GlassCard";
import {
    PhoneCall, CreditCard, Headphones, Cpu, Zap, Play, Sparkles,
    Megaphone, Check, ChevronRight,
    Bot, MessageSquare,
    Video, Clapperboard,
    Code2, AppWindow,
    ShieldCheck, Server, Wrench, Monitor
} from "lucide-react";
import {INDUSTRIES} from "@/data/industries";
import {usePathname, useSearchParams} from "next/navigation";

type TabKey =
    | "voice"
    | "video"
    | "chatbot"
    | "app"
    | "social"
    | "managed";

const TABS: { key: TabKey; label: string }[] = [
    {key: "voice", label: "Voice AI"},
    {key: "video", label: "Video AI"},
    {key: "chatbot", label: "AI Chatbot"},
    {key: "app", label: "App Development"},
    {key: "social", label: "Social Media Management"},
    {key: "managed", label: "Management IT Services"},
];

export default function ProductTabs() {
    const [activeTab, setActiveTab] = useState<TabKey>("voice");

    // same-selection → smooth scroll to #industry-detail
    const pathname = usePathname();
    const search = useSearchParams();
    const currentSlug = search.get("industry");

    const hrefFor = (slug: string) => ({
        pathname: "/industries",
        query: {industry: slug},
        hash: "industry-detail",
    });

    const forceScrollIfSame = (slug: string) => {
        const samePage = pathname === "/industries";
        const sameQuery = currentSlug === slug;
        const sameHash =
            typeof window !== "undefined" &&
            window.location.hash === "#industry-detail";
        if (samePage && sameQuery && sameHash) {
            document
                .getElementById("industry-detail")
                ?.scrollIntoView({behavior: "smooth", block: "start"});
            return true;
        }
        return false;
    };

    return (
        <Section id="services" variant="tall">
            {/* Tabs */}
            <div
                className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur">
                {TABS.map(({key, label}) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                            activeTab === key ? "bg-cyan-500 text-slate-900" : "hover:bg-white/5"
                        }`}
                        aria-selected={activeTab === key}
                        role="tab"
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Panels */}
            <div className="mt-6 grid gap-6 lg:grid-cols-3" role="tabpanel">
                {/* Voice AI */}
                {activeTab === "voice" && (
                    <>
                        <GlassCard className="lg:col-span-2 p-6">
                            <h3 className="text-2xl font-bold">Autonomous calling with live transfer</h3>
                            <p className="mt-2 text-white/70">
                                Call up to <strong>5 contacts concurrently</strong>. Detect intent, collect payments,
                                and escalate to humans when needed.
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-white/80">
                                {[
                                    {icon: PhoneCall, text: "Outbound & inbound with smart routing"},
                                    {icon: CreditCard, text: "Secure payment collection in-call"},
                                    {icon: Headphones, text: "Tier-1 customer service and FAQs"},
                                    {icon: Sparkles, text: "Smart customer interaction automation"},
                                ].map(({icon: Icon, text}) => (
                                    <li key={text} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4"/> {text}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 flex items-center gap-3 text-xs text-white/70">
                                <Cpu className="h-4 w-4"/> On-device + cloud
                                <span className="opacity-40">|</span>
                                <Zap className="h-4 w-4"/> Realtime
                            </div>
                            <div className="mt-6">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400"
                                >
                                    Contact for Demo <Play className="h-4 w-4"/>
                                </Link>
                            </div>
                        </GlassCard>

                        {/* Industry quick links */}
                        <GlassCard className="p-6">
                            <h4 className="text-lg font-semibold">Built for Australian SMB workflows</h4>
                            <div
                                className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 text-sm">
                                {INDUSTRIES.map((ind) => {
                                    const slug = ind.slug ?? ind.id;
                                    return (
                                        <Link
                                            key={ind.id}
                                            href={hrefFor(slug)}
                                            prefetch={false}
                                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-cyan-500/10 transition-all"
                                            onClick={(e) => {
                                                if (forceScrollIfSame(slug)) e.preventDefault();
                                            }}
                                        >
                                            <ind.icon className="h-4 w-4 text-cyan-400"/>
                                            <span>{ind.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className="mt-4 text-xs text-white/60">
                                Native AU English voices, local latency, and compliance-first design.
                            </div>
                        </GlassCard>
                    </>
                )}

                {/* Video AI */}
                {activeTab === "video" && (
                    <>
                        <GlassCard className="lg:col-span-2 p-6">
                            <h3 className="text-2xl font-bold">Video AI</h3>
                            <p className="mt-2 text-white/70">
                                Generate, edit, and localise videos from scripts, slides, or call highlights.
                                Perfect for recruiting, training, and promo content.
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-white/80">
                                {[
                                    {icon: Video, text: "Script → talking-head or explainer video"},
                                    {icon: Clapperboard, text: "Auto cuts, captions, B-roll suggestions"},
                                    {icon: Sparkles, text: "Voice cloning & multi-language dubbing"},
                                    {icon: Megaphone, text: "Publish to YouTube/LinkedIn/TikTok"},
                                ].map(({icon: Icon, text}) => (
                                    <li key={text} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4"/> {text}
                                    </li>
                                ))}
                            </ul>
                            <div
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400">
                                Get a Video Demo <ChevronRight className="h-4 w-4"/>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h4 className="text-lg font-semibold">Use cases</h4>
                            <ul className="mt-3 space-y-2 text-sm text-white/80">
                                {[
                                    "Recruiting interviews & JD promos",
                                    "Education/training modules & onboarding",
                                    "Presentation practice & auto summaries",
                                ].map((t) => (
                                    <li key={t} className="flex items-center gap-2">
                                        <Check className="h-4 w-4"/> {t}
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </>
                )}

                {/* AI Chatbot */}
                {activeTab === "chatbot" && (
                    <>
                        <GlassCard className="lg:col-span-2 p-6">
                            <h3 className="text-2xl font-bold">AI Chatbot for web & messaging</h3>
                            <p className="mt-2 text-white/70">
                                Omni-channel chat on your website, WhatsApp, and Facebook — grounded on your docs,
                                policies, and CRM.
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-white/80">
                                {[
                                    {icon: Bot, text: "24/7 lead capture, FAQs, bookings & payments"},
                                    {icon: MessageSquare, text: "WhatsApp / Messenger / Web widget integration"},
                                    {icon: Sparkles, text: "Retrieval-augmented answers from your knowledge base"},
                                    {icon: Headphones, text: "Human handoff with full chat context"},
                                ].map(({icon: Icon, text}) => (
                                    <li key={text} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4"/> {text}
                                    </li>
                                ))}
                            </ul>
                            <div
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400">
                                Get a Chatbot Demo <ChevronRight className="h-4 w-4"/>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h4 className="text-lg font-semibold">Use cases</h4>
                            <ul className="mt-3 space-y-2 text-sm text-white/80">
                                {[
                                    "Recruiting pre-screen & interview scheduling",
                                    "Training/education Q&A & lesson guidance",
                                    "Presentation practice & speaking coach",
                                ].map((t) => (
                                    <li key={t} className="flex items-center gap-2">
                                        <Check className="h-4 w-4"/> {t}
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </>
                )}

                {/* App Development */}
                {activeTab === "app" && (
                    <>
                        <GlassCard className="lg:col-span-2 p-6">
                            <h3 className="text-2xl font-bold">App Development</h3>
                            <p className="mt-2 text-white/70">
                                Web, mobile, and internal tools — built with modern stacks and integrated with your CRM,
                                billing, and auth.
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-white/80">
                                {[
                                    {icon: Code2, text: "Next.js/React, Node/Express, Python/FastAPI"},
                                    {icon: AppWindow, text: "Design systems, dashboards, and admin portals"},
                                    {icon: Sparkles, text: "AI features: chat, search, analytics"},
                                    {icon: Server, text: "Deploy to Vercel/AWS/Azure with CI/CD"},
                                ].map(({icon: Icon, text}) => (
                                    <li key={text} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4"/> {text}
                                    </li>
                                ))}
                            </ul>
                            <div
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400">
                                Start a Build <ChevronRight className="h-4 w-4"/>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h4 className="text-lg font-semibold">Deliverables</h4>
                            <ul className="mt-3 space-y-2 text-sm text-white/80">
                                {[
                                    "Architecture & UX specs",
                                    "MVP in sprints with demos",
                                    "Testing, monitoring & handover",
                                ].map((t) => (
                                    <li key={t} className="flex items-center gap-2">
                                        <Check className="h-4 w-4"/> {t}
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </>
                )}

                {/* Social Media Management */}
                {activeTab === "social" && (
                    <>
                        <GlassCard className="lg:col-span-2 p-6">
                            <h3 className="text-2xl font-bold">Social Media Management</h3>
                            <p className="mt-2 text-white/70">
                                Plan, generate, schedule, and track content across platforms — powered by your call/chat
                                insights.
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-white/80">
                                {[
                                    "Auto-generate post copy from transcripts & chats",
                                    "Schedule to Meta, TikTok, LinkedIn in one click",
                                    "Performance analytics with lead attribution",
                                    "Comment triage and suggested replies",
                                ].map((t) => (
                                    <li key={t} className="flex items-center gap-2">
                                        <Check className="h-4 w-4"/> {t}
                                    </li>
                                ))}
                            </ul>
                            <div
                                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm">
                                Book Strategy Call <ChevronRight className="h-4 w-4"/>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 grid place-content-center">
                            <Megaphone className="h-10 w-10"/>
                            <p className="mt-3 text-sm text-white/70">Content ops done right</p>
                        </GlassCard>
                    </>
                )}

                {/* Management IT Services */}
                {activeTab === "managed" && (
                    <>
                        <GlassCard className="lg:col-span-2 p-6">
                            <h3 className="text-2xl font-bold">Management IT Services</h3>
                            <p className="mt-2 text-white/70">
                                Secure, monitor, and maintain your stack — from endpoints to cloud — with clear SLAs.
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-white/80">
                                {[
                                    {icon: ShieldCheck, text: "Security: patching, AV/EDR, backups, least-privilege"},
                                    {icon: Monitor, text: "24/7 monitoring: uptime, health checks, alerts"},
                                    {icon: Server, text: "Cloud & server administration (AWS/Azure/Proxmox)"},
                                    {icon: Wrench, text: "Helpdesk & device lifecycle (procurement → disposal)"},
                                ].map(({icon: Icon, text}) => (
                                    <li key={text} className="flex items-center gap-2">
                                        <Icon className="h-4 w-4"/> {text}
                                    </li>
                                ))}
                            </ul>
                            <div
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400">
                                Discuss a Managed Plan <ChevronRight className="h-4 w-4"/>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h4 className="text-lg font-semibold">What’s included</h4>
                            <ul className="mt-3 space-y-2 text-sm text-white/80">
                                {[
                                    "IT asset & license management",
                                    "User onboarding/offboarding",
                                    "Backup & disaster recovery drills",
                                    "Compliance-first configurations",
                                ].map((t) => (
                                    <li key={t} className="flex items-center gap-2">
                                        <Check className="h-4 w-4"/> {t}
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </>
                )}
            </div>
        </Section>
    );
}