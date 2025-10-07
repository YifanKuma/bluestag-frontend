import Section from "@/components/Section";
import FeatureGrid from "@/components/FeatureGrid";
import CTAButtons from "@/components/CTAButtons";

export default function VoiceAIPage() {
    return (
        <>
            <section className="mx-auto max-w-7xl px-4 py-16">
                <h1 className="text-4xl font-extrabold">Voice AI</h1>
                <p className="mt-3 text-lg text-gray-700">
                    Your AI-powered team member for sales follow-ups, payment collection, customer service and real
                    estate enquiries.
                    Multi-call mode lets you reach up to <strong>5 people simultaneously</strong>.
                </p>
                <div className="mt-6"><CTAButtons/></div>
            </section>

            <Section eyebrow="Capabilities" title="Everything you need to automate calls">
                <FeatureGrid/>
            </Section>

            <Section title="Integrations">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    {["HubSpot", "Salesforce", "Stripe", "Square", "Twilio", "Telnyx", "Calendly", "Google Calendar"].map((i) => (
                        <div key={i} className="rounded-xl border border-gray-200 p-4">{i}</div>
                    ))}
                </div>
            </Section>

            <Section title="Dashboard snapshots">
                <div className="rounded-2xl border border-gray-200 p-10 text-gray-500 text-sm">
                    (Add analytics screenshots here: call outcomes, sentiment, CSAT, payment success.)
                </div>
            </Section>

            <Section title="Ready to see it live?"><CTAButtons/></Section>
        </>
    );
}