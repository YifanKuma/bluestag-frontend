"use client";

import {
    Globe,
    Mail,
    CreditCard,
    BarChart3,
    Shield,
    Zap,
    Calendar,
    Video,
    Database,
    ShoppingBag,
    PhoneCall,
    FileText,
    Bot,
} from "lucide-react";

const integrations = [
    {icon: <Calendar size={26}/>, name: "Calendly", desc: "Schedule meetings from calls"},
    {icon: <Database size={26}/>, name: "Google Drive", desc: "Save transcripts to cloud"},
    {icon: <Bot size={26}/>, name: "Freshworks", desc: "Log support automatically"},
    {icon: <Video size={26}/>, name: "Zoom", desc: "Trigger or join live meetings"},
    {icon: <Mail size={26}/>, name: "HubSpot", desc: "Capture and sync new leads"},
    {icon: <ShoppingBag size={26}/>, name: "Shopify", desc: "Manage orders via voice"},
    {icon: <PhoneCall size={26}/>, name: "Twilio", desc: "Power secure voice calls"},
    {icon: <FileText size={26}/>, name: "Zendesk", desc: "Create tickets from calls"},
    {icon: <PhoneCall size={26}/>, name: "Sendbird Calls", desc: "Enable real-time voice routing"},
    {icon: <Globe size={26}/>, name: "API", desc: "Build custom voice workflows"},
];

export default function IntegrationsSection() {
    return (
        <section className="w-full py-24 text-white overflow-visible">
            <div className="mx-auto max-w-7xl px-4 text-center">
                <h2 className="text-5xl font-extrabold mb-4">Plug into your stack</h2>
                <p className="text-neutral-400 mb-14">
                    Native connectors and webhooks. Zero heavy lifting.
                </p>

                {/* Integration cards grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {integrations.map((item) => (
                        <div
                            key={item.name}
                            className="group flex items-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 p-6"
                        >
                            <div
                                className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 text-blue-400 mr-5">
                                {item.icon}
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold text-lg text-white">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-neutral-400">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}