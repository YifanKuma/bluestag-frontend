import {getHomePage} from "@/lib/strapi";
import Hero from "@/components/Hero";
import ProductTabs from "@/components/ProductTabs";
import UseCaseCarousel from "@/components/UseCaseCarousel";
import UseCasesGrid from "@/components/UseCasesGrid";
import IntegrationsSection from "@/components/IntegrationsSection";
import Languages from "@/components/Languages";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function Page() {
    const home = await getHomePage();


    // ✅ Prevent null crash (fixes right panel disappearing)
    if (!home) {
        return (
            <main className="min-h-screen text-white flex items-center justify-center">
                <p className="text-white/60 text-lg">
                    Failed to load homepage content. Please try again.
                </p>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen text-white pt-16">
            <Navbar/>

            <section id="hero" data-bg={0}>
                <Hero
                    title={home.hero_title}
                    subtitle={home.hero_subtitle}
                    description={home.hero_description}
                    rotatingWords={home.hero_rotating_words}
                    kpis={home.hero_kpis}
                />
            </section>

            <section id="product" data-bg={1}>
                <ProductTabs
                    tabs={home.product_tabs}
                    industries={home.industries}
                />
            </section>

            <section id="carousel" data-bg={1}>
                <UseCaseCarousel items={home.carousel_items}/>
            </section>

            <section id="use-cases" data-bg={1}>
                <UseCasesGrid items={home.use_cases}/>

            </section>

            <section id="integrations" data-bg={2}>
                <IntegrationsSection items={home.integrations}/>
            </section>

            <section id="languages" data-bg={3}>
                <Languages items={home.languages}/>
            </section>

            <Footer/>
        </main>
    );
}
