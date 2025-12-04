import Footer from "@/components/Footer";
import PricingPageClient from "@/app/pricing/PricingPageClient";
import {getPricingPage} from "@/lib/strapi";
import NavbarServer from "@/components/NavbarServer";

export const dynamic = "force-dynamic";


export default async function PricingPageWrapper() {
    const data = await getPricingPage();

    if (!data) {
        return (
            <main className="min-h-screen w-full text-white pt-16">
                <NavbarServer/>

                <div className="p-12 text-center text-white/60">
                    Failed to load pricing data. Please try again later.
                </div>

                <Footer/>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-[#020617] bg-gradient-to-b from-[#0f172a] to-black text-white pt-16">
            <NavbarServer/>

            <section id="pricing">
                <PricingPageClient data={data}/>
            </section>

            <Footer/>
        </main>
    );
}

