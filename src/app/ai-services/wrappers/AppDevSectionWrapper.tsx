import {getAppDevSection} from "@/lib/strapi";
import AppDevSection from "../sections/AppDevSection";

export default async function AppDevSectionWrapper() {
    const data = await getAppDevSection();

    // Strapi Single Types return an OBJECT, not an array
    if (!data || typeof data !== "object") {
        return <div>Failed to load App Development data.</div>;
    }

    return <AppDevSection data={data}/>;
}
