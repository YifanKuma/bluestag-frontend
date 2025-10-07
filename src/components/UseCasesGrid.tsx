"use client";
import Section from "./Section";
import GlassCard from "./GlassCard";
import {PhoneCall, CreditCard, Headphones, Building2, Truck, Store, ArrowRight} from "lucide-react";

export default function UseCasesGrid() {
    const items = [
        {
            icon: PhoneCall,
            title: "Sales Outreach",
            text: "Autodial prospects, qualify, and book directly into your calendar."
        },
        {icon: CreditCard, title: "Payment Collection", text: "Send secure payment links or process within the call."},
        {icon: Headphones, title: "Customer Support", text: "Instant answers for FAQs and order tracking."},
        {icon: Building2, title: "Real Estate", text: "Pre-qualify buyers, schedule inspections, follow-ups."},
        {icon: Truck, title: "Logistics", text: "Delivery confirmations and rescheduling without hold time."},
        {icon: Store, title: "E-commerce", text: "Cart recovery calls and post-purchase care."},
    ];

    return (
        <Section id="industries" variant="tall">
            <h2 className="text-2xl md:text-3xl font-bold">What can Bluestag Voice AI do?</h2>
            <p className="mt-2 text-white/70 max-w-2xl">Modern SaaS aesthetic — glass cards, soft shadows, and
                motion.</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(({icon: Icon, title, text}) => (
                    <GlassCard key={title} className="group p-6 transition hover:bg-white/[0.08]">
                        <div className="flex items-start gap-4">
                            <div className="rounded-xl border border-white/15 bg-white/10 p-2"><Icon
                                className="h-5 w-5"/></div>
                            <div>
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <p className="mt-1 text-sm text-white/70">{text}</p>
                            </div>
                        </div>
                        <div
                            className="mt-4 flex items-center text-xs text-white/60 opacity-0 transition group-hover:opacity-100">
                            Learn more <ArrowRight className="ml-1 h-3.5 w-3.5"/>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </Section>
    );
}