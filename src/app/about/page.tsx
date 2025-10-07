import Section from "@/components/Section";

export default function AboutPage() {
    return (
        <Section eyebrow="About us" title="Australian innovation, built for SMEs">
            <div className="prose max-w-none">
                <p>
                    Bluestag.AI is a Brisbane-based team focused on practical voice AI that helps small businesses
                    answer more calls, sell more, and provide better service.
                </p>
                <p>
                    Today our flagship product is <strong>Voice AI</strong>. Next up: <strong>Campaign AI</strong> to
                    build and launch social media campaigns automatically.
                </p>
            </div>
        </Section>
    );
}