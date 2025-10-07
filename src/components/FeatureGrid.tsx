import {PhoneCall, CreditCard, Headphones, Building2, Wand2} from "lucide-react";

const data = [
    {icon: PhoneCall, title: "Multi-Call Mode", desc: "Call up to 5 customers at the same time for faster outreach."},
    {icon: Wand2, title: "Sales Assistant", desc: "Qualify leads, follow up, and close — automatically."},
    {icon: CreditCard, title: "Payment Collection", desc: "Secure over-the-phone payment workflows and confirmations."},
    {icon: Headphones, title: "Customer Service", desc: "Answer FAQs, book appointments, and triage requests 24/7."},
    {icon: Building2, title: "Real Estate Ready", desc: "Handle property enquiries and send details instantly."},
];

export default function FeatureGrid() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map(({icon: Icon, title, desc}) => (
                <div key={title} className="rounded-2xl border border-gray-200 p-5 shadow-sm">
                    <Icon className="h-6 w-6"/>
                    <h3 className="mt-3 font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{desc}</p>
                </div>
            ))}
        </div>
    );
}