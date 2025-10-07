import Section from "@/components/Section";

export default function PricingPage() {
    const plans = [
        {
            name: "Starter",
            price: "$99",
            period: "/mo",
            bullets: ["1 Voice Agent", "100 calls/mo", "Basic analytics"],
        },
        {
            name: "Growth",
            price: "$249",
            period: "/mo",
            bullets: ["3 Voice Agents", "300 calls/mo", "Multi-call (up to 5)", "Integrations"],
        },
        {
            name: "Pro",
            price: "Custom",
            period: "",
            bullets: ["5+ concurrent calls", "Priority support", "Advanced analytics"],
        },
    ];
    return (
        <Section eyebrow="Pricing" title="Simple, scalable plans">
            <div className="grid md:grid-cols-3 gap-6">
                {plans.map((p) => (
                    <div key={p.name} className="rounded-2xl border border-gray-200 p-6">
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="mt-2 text-3xl font-extrabold">
                            {p.price} <span className="text-base font-normal">{p.period}</span>
                        </p>
                        <ul className="mt-4 text-sm grid gap-2">
                            {p.bullets.map((b) => <li key={b}>• {b}</li>)}
                        </ul>
                        <button
                            className="mt-6 w-full rounded-xl bg-sky-700 text-white py-2.5 font-semibold hover:opacity-90">
                            Choose {p.name}
                        </button>
                    </div>
                ))}
            </div>
        </Section>
    );
}