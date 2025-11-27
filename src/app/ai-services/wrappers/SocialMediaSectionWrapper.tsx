import {getSocialMediaSection} from "@/lib/strapi";
import SocialMediaSection from "../sections/SocialMediaSection";
import type {SocialMediaData} from "@/types/social-media";

export default async function SocialMediaSectionWrapper() {
    const data: SocialMediaData | null = await getSocialMediaSection();

    if (!data) return <div>Failed to load Social Media data.</div>;

    return <SocialMediaSection data={data}/>;
}
