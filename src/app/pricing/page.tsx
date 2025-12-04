import Footer from "@/components/Footer";

import PricingPageClient from "@/app/pricing/PricingPageClient";
import {getPricingPage} from "@/lib/strapi";
import NavbarServer from "@/components/NavbarServer";

export const dynamic = "force-dynamic";

export default async function PricingPageWrapper() {
    const data = await getPricingPage();
    if (!data) {
        return (
            <main className="min-h-screen text-white pt-16">
                <NavbarServer />
                <div className="p-12">Failed to load pricing data.</div>
            </main>
        );
    }

    return <PricingPageClient data={data}/>;
}
