import {getAIChatbotSection} from "@/lib/strapi";
import AIChatbotSection from "../sections/AIChatbotSection";

export default async function AIChatbotSectionWrapper() {
    const data = await getAIChatbotSection();

    if (!data) return <div>Failed to load AI Chatbot data.</div>;

    return (
        <AIChatbotSection
            title={data.title}
            subtitle={data.hero_subtitle}
            features={data.features}
            pills={data.value_pills}
        />
    );
}
