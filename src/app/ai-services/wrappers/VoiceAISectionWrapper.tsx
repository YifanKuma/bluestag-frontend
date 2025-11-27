import {getVoiceAISection} from "@/lib/strapi";
import VoiceAISection from "@/app/ai-services/sections/VoiceAISection";

export default async function VoiceAISectionWrapper() {
    const data = await getVoiceAISection();

    if (!data) {
        return <div>Failed to load Voice AI data.</div>;
    }

    return <VoiceAISection data={data}/>;
}
