"use client";

import Image from "next/image";

const features = [
    {
        title: "Auto Dialer",
        desc: "High-velocity dialing at 1000 calls/min with smart retry logic for max reach.",
    },
    {
        title: "Web Calls",
        desc: "Web call integration on your website for instant voice assistance to visitors.",
    },
    {
        title: "Lowest Latency",
        desc: "20+ languages with <330ms latency for lightning-fast global customer engagement.",
    },
    {
        title: "Enhanced CRM Integration",
        desc: "Complete integration syncing calls, leads & data with WhatsApp communication.",
    },
    {
        title: "Seamless Call Transfer",
        desc: "Smart call transfer to human agents maintaining context for superior experience.",
    },
    {
        title: "Enterprise Call Analytics",
        desc: "Advanced analytics with call dispositions & insights to optimize performance.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    Features that really matter.
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Bluestag.ai customizes an AI call center to fit your unique business needs,
                    so you can focus on what matters most.
                </p>

                {/* Grid of features */}
                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Demo Image for each card */}
                            <div className="w-full rounded-2xl bg-indigo-100 p-6 shadow-sm">
                                <Image
                                    src="/demo.png"  // <-- your demo image reused here
                                    alt={f.title}
                                    width={400}
                                    height={240}
                                    className="mx-auto rounded-lg"
                                />
                            </div>

                            {/* Title + Desc */}
                            <h3 className="mt-6 text-lg font-semibold text-gray-900">{f.title}</h3>
                            <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}