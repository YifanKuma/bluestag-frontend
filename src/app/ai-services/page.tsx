import {getServicesPage, getServicesTabs} from "@/lib/strapi";
import ServicesSwitcher from "@/app/ai-services/sections/ServicesSwitcher";
import SubPageLayout from "@/components/SubPageLayout";
import Footer from "@/components/Footer";
import NavbarServer from "@/components/NavbarServer";

export const dynamic = "force-dynamic";

export default async function Page() {
    const tabs = await getServicesTabs();
    const page = await getServicesPage();

    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            <NavbarServer/>

            <section className="relative z-10 pt-20">
                <SubPageLayout
                    title={page?.title ?? "Services"}
                    subtitle={page?.subtitle ?? ""}
                >
                    <div className="mt-10 sm:mt-12">
                        <ServicesSwitcher tabs={tabs ?? []}/>
                    </div>
                </SubPageLayout>
            </section>

            <Footer/>
        </main>
    );
}
