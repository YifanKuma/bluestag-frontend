import NavbarServer from "@/components/NavbarServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import Footer from "@/components/Footer";
import OurStory from "./OurStory";
import OurVision from "./OurVision";
import ContactCTA from "./ContactCTA";
import { getAboutPage } from "@/lib/strapi";

export default async function AboutPage() {
    const data = await getAboutPage();

    if (!data) {
        return (
            <main className="min-h-screen flex items-center justify-center text-red-400 text-xl">
                ⚠️ Failed to load About page data
            </main>
        );
    }

    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            <NavbarServer />

            <section id="about" className="relative z-10 pt-32 pb-24">
                <div className="mx-auto max-w-6xl px-6 space-y-24">
                    <OurStory data={data} />
                    <OurVision data={data} />
                    <ContactCTA data={data} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
