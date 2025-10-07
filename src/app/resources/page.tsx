import Section from "@/components/Section";

const posts = [
    {title: "Automating Payment Reminders with Voice AI", tag: "How-to"},
    {title: "Five Ways AI Boosts Small Business Sales", tag: "Guide"},
    {title: "What’s Next: Social Media Campaign AI", tag: "Roadmap"},
];

export default function ResourcesPage() {
    return (
        <Section eyebrow="Resources" title="Insights & updates">
            <div className="grid md:grid-cols-3 gap-5">
                {posts.map((p) => (
                    <article key={p.title} className="rounded-2xl border border-gray-200 p-6">
                        <p className="text-xs uppercase tracking-widest text-sky-700">{p.tag}</p>
                        <h3 className="mt-2 font-semibold">{p.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">Short teaser…</p>
                        <button className="mt-4 text-sm font-semibold text-sky-700">Read more →</button>
                    </article>
                ))}
            </div>
        </Section>
    );
}