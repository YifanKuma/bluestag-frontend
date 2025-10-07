"use client";

import Image from "next/image";

const integrations = [
    {
        name: "Calendly",
        desc: "Schedule meetings from calls",
        icon: "/integrations/demo.png",
    },
    {
        name: "Google Drive",
        desc: "Save transcripts to cloud",
        icon: "/integrations/demo.png",
    },
    {
        name: "Freshworks",
        desc: "Log support automatically",
        icon: "/integrations/demo.png",
    },
    {
        name: "Zoom",
        desc: "Trigger or join live meetings",
        icon: "/integrations/demo.png",
    },
    {
        name: "HubSpot",
        desc: "Capture and sync new leads",
        icon: "/integrations/demo.png",
    },
    {
        name: "Shopify",
        desc: "Manage orders via voice",
        icon: "/integrations/demo.png",
    },
    {
        name: "Twilio",
        desc: "Power secure voice calls",
        icon: "/integrations/demo.png",
    },
    {
        name: "Zendesk",
        desc: "Create tickets from calls",
        icon: "/integrations/demo.png",
    },
    {
        name: "Sendbird Calls",
        desc: "Enable real-time voice routing",
        icon: "/integrations/demo.png",
    },
    {
        name: "API",
        desc: "Build custom voice workflows",
        icon: "/integrations/demo.png",
    },
];

export default function Integrations() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-16 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
                Works With Everything You Already Use.
            </h2>
            <p className="mt-2 text-gray-600">
                Integrates into your stack. Extends your superpowers.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-4 rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
                    >
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="rounded-md"
                        />
                        <div className="text-left">
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}