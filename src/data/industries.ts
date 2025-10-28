import {
    Building2,
    Truck,
    Store,
    Headphones,
    CreditCard,
    Stethoscope,
    GraduationCap,
} from "lucide-react";
import type {ComponentType} from "react";

export type Step = { actor: "Agent" | "Customer"; text: string };

export type Industry = {
    id: string;
    slug?: string;
    icon: ComponentType<{ className?: string }>;
    title: string;
    summary: string;
    bullets: string[];
    demo: Step[];
    cta?: { href: string; label: string };
};

export const INDUSTRIES: Industry[] = [
    {
        id: "real-estate",
        slug: "real-estate",
        icon: Building2,
        title: "Real Estate",
        summary: "Qualify buyers and tenants, schedule inspections, and follow up automatically.",
        bullets: [
            "Lead qualification with intent + budget capture",
            "Inspection booking and reminders via phone or SMS",
            "Auto follow-ups for no-shows and new listings",
        ],
        demo: [
            {
                actor: "Agent",
                text: "Hi Sarah! Saw you registered interest in 12 River St. Are you looking to buy or rent?"
            },
            {actor: "Customer", text: "Buying. Can we see it this Saturday?"},
            {actor: "Agent", text: "Great! I can book 10:30am or 1:15pm. Which suits?"},
            {actor: "Customer", text: "1:15pm works."},
            {actor: "Agent", text: "Locked in! I’ve sent a calendar invite and directions. See you then."},
        ],
        cta: {href: "/contact", label: "Book a real estate demo"},
    },
    {
        id: "retail",
        slug: "retail",
        icon: Store,
        title: "Retail & E-commerce",
        summary: "Handle order questions, returns, and delivery updates without wait times.",
        bullets: [
            "Real-time order status & amendments",
            "Automated returns & exchanges workflow",
            "Back-in-stock and delivery notifications",
        ],
        demo: [
            {actor: "Agent", text: "Hi Alex, your order #48291 is out for delivery today."},
            {actor: "Customer", text: "Can I change the drop-off time to after 5pm?"},
            {actor: "Agent", text: "Done. Delivery updated to 5–7pm window. You’ll receive a confirmation SMS."},
        ],
        cta: {href: "/ai-services", label: "See commerce automations"},
    },
    {
        id: "payments",
        slug: "payments",
        icon: CreditCard,
        title: "Finance & Payments",
        summary: "Automate payment reminders and offer secure pay-by-link or IVR collection.",
        bullets: [
            "Smart reminders with personalised amounts and due dates",
            "PCI-aware pay-by-link over SMS or secure IVR",
            "Promise-to-pay tracking and retries",
        ],
        demo: [
            {
                actor: "Agent",
                text: "Hi Minh, a $126.40 invoice for ACME is due Friday. Would you like a secure payment link?"
            },
            {actor: "Customer", text: "Yes, please send."},
            {actor: "Agent", text: "Link sent. I’ll confirm once it’s completed. Thanks!"},
        ],
        cta: {href: "/contact", label: "Discuss payment flows"},
    },
    {
        id: "logistics",
        slug: "logistics",
        icon: Truck,
        title: "Logistics",
        summary: "Confirm deliveries, reschedule pickups, and notify customers on time.",
        bullets: [
            "Automated pre-delivery confirmations",
            "Self-serve rescheduling & address checks",
            "Driver ETA alerts and proof-of-delivery follow-ups",
        ],
        demo: [
            {actor: "Agent", text: "Tomorrow’s delivery for order #7132 is 9–11am. Keep this time?"},
            {actor: "Customer", text: "Need to move to Friday morning."},
            {actor: "Agent", text: "Rescheduled to Friday 9–11am. You’ll get a reminder 1 hour before."},
        ],
        cta: {href: "/contact", label: "Optimize last-mile calls"},
    },
    {
        id: "support",
        slug: "support",
        icon: Headphones,
        title: "Customer Support",
        summary: "Resolve FAQs instantly and escalate complex issues with full transcripts.",
        bullets: [
            "Account, billing, and product FAQs",
            "Ticket creation with human hand-off",
            "CSAT capture and intent-level reporting",
        ],
        demo: [
            {actor: "Customer", text: "My subscription renewed but I didn’t use it."},
            {actor: "Agent", text: "I can help. Would you like to pause or apply a courtesy credit?"},
            {actor: "Customer", text: "Pause please."},
            {actor: "Agent", text: "Done through next month. I’ve emailed the confirmation."},
        ],
        cta: {href: "/ai-services", label: "See support automations"},
    },
    {
        id: "healthcare",
        slug: "healthcare",
        icon: Stethoscope,
        title: "Healthcare",
        summary: "Reduce no-shows with reminders and collect post-visit feedback with empathy.",
        bullets: [
            "Appointment bookings, reminders & wait-list calls",
            "Pre-op instructions and eligibility checks",
            "Follow-up feedback and NPS capture",
        ],
        demo: [
            {
                actor: "Agent",
                text: "Hi Priya, confirming your physio at 10:45am tomorrow. Need directions or to reschedule?"
            },
            {actor: "Customer", text: "All good, thanks!"},
        ],
        cta: {href: "/contact", label: "Talk healthcare workflows"},
    },
    {
        id: "education",
        slug: "education",
        icon: GraduationCap,
        title: "Training & Education",
        summary: "Automate admissions triage, interview scheduling, fee reminders, and student support.",
        bullets: [
            "Lead capture from forms & social into interviews",
            "Class/enrolment reminders and attendance follow-ups",
            "Fee/tuition notifications with secure payment links",
        ],
        demo: [
            {
                actor: "Agent",
                text: "Hi Jose! You started an application for the Diploma intake. Would you like to book a quick admissions call?"
            },
            {actor: "Customer", text: "Yes, Thursday afternoon works."},
            {actor: "Agent", text: "Booked for 2:30pm Thu with Admissions. I’ve sent a calendar invite and checklist."},
        ],
        cta: {href: "/contact", label: "See edu admissions demo"},
    },
];