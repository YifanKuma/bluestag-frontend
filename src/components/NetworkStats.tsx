"use client";

import {JSX, useState} from "react";
import {
    BarChart3,
    PhoneCall,
    Headphones,
    Server,
    Stethoscope,
    Truck,
    GraduationCap,
} from "lucide-react";

type Stat = { icon: JSX.Element; bold: string; text: string };

const DATA: Record<string, Stat[]> = {
    "Financial Services": [
        {
            icon: <BarChart3 className="w-6 h-6"/>,
            bold: "5.2M+",
            text: "financial conversations handled across loans, credit, and investments",
        },
        {
            icon: <PhoneCall className="w-6 h-6"/>,
            bold: "8x",
            text: "more productive than traditional outbound call teams",
        },
        {
            icon: <Headphones className="w-6 h-6"/>,
            bold: "83%",
            text: "of account-related queries resolved autonomously",
        },
        {
            icon: <Server className="w-6 h-6"/>,
            bold: "99.9%",
            text: "uptime during peak banking and tax seasons",
        },
    ],
    Education: [
        {
            icon: <GraduationCap className="w-6 h-6"/>,
            bold: "1M+",
            text: "leads qualified across universities, courses, and skill programs",
        },
        {
            icon: <PhoneCall className="w-6 h-6"/>,
            bold: "7x",
            text: "more outreach in half the time",
        },
        {
            icon: <Headphones className="w-6 h-6"/>,
            bold: "78%",
            text: "of student inquiries resolved autonomously",
        },
        {
            icon: <Server className="w-6 h-6"/>,
            bold: "99.8%",
            text: "uptime during peak admission and enrollment seasons",
        },
    ],
    Logistics: [
        {
            icon: <Truck className="w-6 h-6"/>,
            bold: "8M+",
            text: "deliveries coordinated and counting across last-mile operations",
        },
        {
            icon: <PhoneCall className="w-6 h-6"/>,
            bold: "46%",
            text: "reduction in last-mile costs through optimized routing",
        },
        {
            icon: <Headphones className="w-6 h-6"/>,
            bold: "92%",
            text: "of delivery status queries handled without human intervention",
        },
        {
            icon: <Server className="w-6 h-6"/>,
            bold: "99.9%",
            text: "uptime during peak shipping and holiday seasons",
        },
    ],
    "Health Care": [
        {
            icon: <Stethoscope className="w-6 h-6"/>,
            bold: "3M+",
            text: "patient calls, reminders, and triage flows automated",
        },
        {
            icon: <PhoneCall className="w-6 h-6"/>,
            bold: "6x",
            text: "faster response vs. traditional call centers",
        },
        {
            icon: <Headphones className="w-6 h-6"/>,
            bold: "81%",
            text: "routine inquiries resolved without agent handoff",
        },
        {
            icon: <Server className="w-6 h-6"/>,
            bold: "99.95%",
            text: "uptime across critical care seasons",
        },
    ],
};

export default function NetworkStats() {
    const [active, setActive] = useState<keyof typeof DATA>("Financial Services");
    const tabs = Object.keys(DATA) as (keyof typeof DATA)[];

    return (
        <section className="bg-[#fbfaf7]">
            <div className="mx-auto max-w-7xl px-4 py-16">
                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            onClick={() => setActive(t)}
                            className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                                active === t
                                    ? "border-gray-800 bg-white shadow"
                                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: stats */}
                    <div className="space-y-8">
                        {DATA[active].map((stat, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
                                    {stat.icon}
                                </div>
                                <p className="text-lg text-gray-800">
                                    <span className="font-bold text-xl">{stat.bold}</span>
                                    <br/>
                                    {stat.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right: Map image */}
                    <div className="flex justify-center">
                        <img
                            src="/countries-visited.png"
                            alt="Global coverage"
                            className="rounded-xl shadow-md"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}