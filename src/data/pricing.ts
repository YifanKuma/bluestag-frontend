// src/data/pricing.ts
import {PhoneCall, Headphones, ShieldCheck, PlugZap, Database, Clock} from "lucide-react";

export type Feature = {
    label: string;
    tooltip?: string;
    included?: boolean;
};

export type Plan = {
    id: "starter" | "growth" | "premium";
    name: string;
    tagline: string;
    monthlyPriceAud: number;
    yearlyPriceAud: number;
    callMinutesIncluded: number;
    parallelCalls: number;
    ctaLabel?: string;
    popular?: boolean;
    bullets: Feature[];
    icon: any;
};

export const currency = "AUD";

export const plans: Plan[] = [
    {
        id: "starter",
        name: "Starter",
        tagline: "Billed monthly • 1 AI agent",
        monthlyPriceAud: 1499,
        yearlyPriceAud: 17988,
        callMinutesIncluded: 500,
        parallelCalls: 5,
        icon: PhoneCall,
        bullets: [
            {label: "1 AI voice agent"},
            {label: "Includes 500 mins · 5 concurrent"},
            {label: "Call recordings & transcripts"},
            {label: "DeskApp dashboard"},
            {label: "WhatsApp messages $0.10 / msg"},
            {label: "Support SLA: 48–72h"},
            {label: "Extra minutes: $0.30 / min"},
        ],
        ctaLabel: "Start free demo",
    },
    {
        id: "growth",
        name: "Growth",
        tagline: "Billed monthly • 2 AI agents",
        monthlyPriceAud: 2599,
        yearlyPriceAud: 31188,
        callMinutesIncluded: 1000,
        parallelCalls: 10,
        icon: Headphones,
        popular: true,
        bullets: [
            {label: "Up to 2 AI voice agents"},
            {label: "Includes 1,000 mins · 10 concurrent"},
            {label: "Call recordings & transcripts"},
            {label: "DeskApp dashboard"},
            {label: "Payment links"},
            {label: "CRM integrations (HubSpot, Pipedrive)"},
            {label: "WhatsApp messages $0.10 / msg"},
            {label: "Support SLA: 24–48h"},
            {label: "Extra minutes: $0.25 / min"},
        ],
        ctaLabel: "Book a demo",
    },
    {
        id: "premium",
        name: "Premium",
        tagline: "Billed monthly • 3 AI agents",
        monthlyPriceAud: 3499,
        yearlyPriceAud: 41988,
        callMinutesIncluded: 1500,
        parallelCalls: 15,
        icon: ShieldCheck,
        bullets: [
            {label: "Up to 3 AI voice agents"},
            {label: "Includes 1,500 mins · 15 concurrent"},
            {label: "Call recordings & transcripts"},
            {label: "DeskApp dashboard"},
            {label: "Payment links"},
            {label: "CRM integrations (HubSpot, Pipedrive)"},
            {label: "WhatsApp messages $0.10 / msg"},
            {label: "Priority support SLA: within 24h"},
            {label: "Extra minutes: $0.20 / min"},
        ],
        ctaLabel: "Talk to sales",
    },
];

export const addons = [
    {
        icon: PlugZap,
        title: "WhatsApp & SMS follow-ups",
        desc: "Automated texts or WhatsApp messages after calls to confirm bookings and payments.",
        price: "$0.10 per message",
    },
    {
        icon: Database,
        title: "Data retention",
        desc: "Extended transcript & audio retention with export API.",
        price: "$49 / mo",
    },
    {
        icon: Clock,
        title: "Extra minutes",
        desc: "Pooled across agents; billed per second.",
        price: "Starter $0.30 • Growth $0.25 • Premium $0.20 per min",
    },
];