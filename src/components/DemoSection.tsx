"use client";

import {useMemo, useState} from "react";
import {PhoneCall} from "lucide-react";
import DemoModal from "@/components/DemoModal";
import type {Scenario, Tab} from "@/types/demo";
import {tabs} from "@/types/demo";

export default function DemoSection() {
    const [active, setActive] = useState<Tab>("Logistics");
    const [modalOpen, setModalOpen] = useState(false);
    const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);

    const scenarios = useMemo(() => {
        return {
            Logistics: {
                title: "Logistics: Delivery Confirmation",
                audio: "/audio/sample-logistics.mp3",
                transcript: [
                    {who: "Agent", text: "Hi! I'm your delivery assistant. Are you available between 2–4 PM today?"},
                    {who: "Caller", text: "Yes, that window works for me."},
                    {who: "Agent", text: "Great. I’ll confirm the driver and send a text 30 minutes before arrival."},
                    {who: "Caller", text: "Perfect, thanks!"},
                    {who: "Agent", text: "Is there a safe drop location if no one’s home?"},
                    {who: "Caller", text: "Front porch is fine."},
                    {who: "Agent", text: "Noted. You’re all set. Have a great day!"},
                ],
            },
            Healthcare: {
                title: "Healthcare: Appointment Booking",
                audio: "/audio/sample-healthcare.mp3",
                transcript: [
                    {
                        who: "Agent",
                        text: "Hello! I’m calling to help schedule your GP appointment. Do mornings suit you?"
                    },
                    {who: "Caller", text: "Yes, 10 AM would be ideal."},
                    {who: "Agent", text: "I have 9:50 AM or 10:30 AM. Which do you prefer?"},
                    {who: "Caller", text: "9:50 AM please."},
                    {who: "Agent", text: "Done. I’ll email and text the confirmation now."},
                ],
            },
            Financial: {
                title: "Financial: Payment Reminder",
                audio: "/audio/sample-financial.mp3",
                transcript: [
                    {who: "Agent", text: "Hi, this is an automated reminder about your invoice due tomorrow."},
                    {who: "Caller", text: "Can I pay by card now?"},
                    {who: "Agent", text: "Yes. I’ll send a secure payment link. Shall I proceed?"},
                    {who: "Caller", text: "Yes, please send it."},
                    {who: "Agent", text: "Link sent. Let me know if you need help with the checkout."},
                ],
            },
            Education: {
                title: "Education: Course Enrollment",
                audio: "/audio/sample-education.mp3",
                transcript: [
                    {who: "Agent", text: "Hi! Are you interested in July intake for the Data Analytics diploma?"},
                    {who: "Caller", text: "Yes, what are the prerequisites?"},
                    {who: "Agent", text: "Basic Python and statistics. Would you like me to book a counseling slot?"},
                    {who: "Caller", text: "Yes, tomorrow afternoon."},
                    {who: "Agent", text: "Booked. You’ll receive a calendar invite shortly."},
                ],
            },
            Recruitment: {
                title: "Recruitment: Screening",
                audio: "/audio/sample-recruitment.mp3",
                transcript: [
                    {who: "Agent", text: "Quick question: Do you have 2+ years of React experience?"},
                    {who: "Caller", text: "Yes, about three years."},
                    {who: "Agent", text: "Great. Are you open to hybrid work in Brisbane?"},
                    {who: "Caller", text: "Yes."},
                    {who: "Agent", text: "Thanks! I’ll share this with the hiring manager and follow up."},
                ],
            },
            Ecommerce: {
                title: "Ecommerce: Order Status",
                audio: "/audio/sample-ecommerce.mp3",
                transcript: [
                    {who: "Agent", text: "Hi! Your order #4231 has shipped. Would you like SMS tracking updates?"},
                    {who: "Caller", text: "Yes, please."},
                    {who: "Agent", text: "Done. Anything else I can help with?"},
                    {who: "Caller", text: "No, that’s all. Thanks!"},
                ],
            },
        } as const;
    }, []);

    const openScenario = (tab: Tab) => {
        const data = scenarios[tab];
        setCurrentScenario({
            title: data.title,
            transcript: data.transcript,
            audio: data.audio,
        });
        setModalOpen(true);
    };

    return (
        <section id="demo" className="mx-auto max-w-7xl px-4 py-16">
            <h2 className="text-3xl font-extrabold tracking-tight">Use your BLUESTAG Agent</h2>
            <p className="mt-2 text-gray-600">Pick a category and simulate a short call.</p>

            {/* Tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
                {tabs.map((t) => (
                    <button
                        key={t}
                        onClick={() => setActive(t)}
                        className={`px-3 py-1.5 rounded-full text-sm border ${
                            active === t ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Card with actions */}
            <div className="mt-6 rounded-2xl border border-gray-200 p-6 bg-white">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold text-blue-700">{active}</p>
                        <h3 className="mt-1 text-xl font-bold">Try a Live Call</h3>
                        <p className="mt-1 text-sm text-gray-600 max-w-2xl">
                            This demo shows how an AI agent handles a typical {active.toLowerCase()} conversation,
                            including intent
                            detection, memory, and escalation.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <button
                            onClick={() => openScenario(active)}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            <PhoneCall size={16}/> Live Call
                        </button>
                    </div>
                </div>
            </div>

            {currentScenario && (
                <DemoModal open={modalOpen} onClose={() => setModalOpen(false)} scenario={currentScenario}/>
            )}
        </section>
    );
}