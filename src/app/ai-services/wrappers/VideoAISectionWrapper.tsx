import {getVideoAISection} from "@/lib/strapi";
import VideoAISection from "@/app/ai-services/sections/VideoAISection";

export default async function VideoAISectionWrapper() {
    const data = await getVideoAISection();

    if (!data) return <div>Failed to load Video AI data.</div>;

    return <VideoAISection data={data}/>;
}
