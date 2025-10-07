import Section from "@/components/Section";

const sectors = [
    {
        name: "Education & Training",
        pain: "Manual student outreach and enrollment follow-ups.",
        value: "Automate reminders, confirmations and intake calls.",
    },
    {
        name: "Retail & E-commerce",
        pain: "Missed calls and delayed order updates.",
        value: "Confirm orders, manage returns and FAQs 24/7.",
    },
    {
        name: "Real Estate",
        pain: "Slow response to property enquiries costs leads.",
        value: "Instantly qualify buyers and send property info.",
    },
    {
        name: "Trades & Services",
        pain: "Scheduling and quote follow-ups take time.",
        value: "Book jobs, chase quotes and route urgent calls.",
    },
    {
        name: "Healthcare & Clinics",
        pain: "High inbound volume for bookings and reminders.",
        value: "Automate recalls, reminders and intake questions.",
    },
    {
        name: "Finance & Payments",
        pain: "Chasing overdue invoices is awkward and slow.",
        value: "Polite, secure payment collection calls.",
    },
];

export default function IndustriesPage() {
    return (
        <Section eyebrow="Industries" title="Where Bluestag Voice AI makes an impact">
            <div className="grid md:grid-cols-2 gap-5">
                {sectors.map((s) => (
                    <div key={s.name} className="rounded-2xl border border-gray-200 p-6">
                        <h3 className="font-semibold">{s.name}</h3>
                        <p className="mt-2 text-sm text-gray-600">Pain: {s.pain}</p>
                        <p className="mt-1 text-sm">Solution: {s.value}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}