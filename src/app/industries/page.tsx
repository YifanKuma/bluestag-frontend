import type {Metadata} from "next";
import {Suspense} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubPageLayout from "@/components/SubPageLayout";
import IndustriesContent from "./IndustriesContent";
import ScrollIntoDetail from "./ScrollIntoDetail";
import {getIndustriesPage} from "@/lib/strapi";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Industries | Bluestag AI",
    description: "Voice AI solutions tailored for each industry with live demos.",
};

export default async function Page() {
    const page = await getIndustriesPage();

    if (!page) {
        return (
            <main className="text-white">
                <Navbar/>
                <div className="pt-24 px-6">
                    <h1 className="text-3xl font-bold">No CMS Entry Found</h1>
                    <p className="opacity-70 mt-3">
                        Please create & publish the *Industries Page* entry in Strapi.
                    </p>
                </div>
                <Footer/>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen text-white overflow-x-clip">
            <Navbar/>

            <section className="relative z-10 pt-20">
                <Suspense fallback={null}>
                    <ScrollIntoDetail selected={page.hero_scroll_text}/>
                </Suspense>

                <SubPageLayout
                    title={page.title}
                    subtitle={page.subtitle}
                >
                    <div className="mt-10 sm:mt-12">
                        <Suspense fallback={null}>
                            <IndustriesContent industries={page.industries}/>
                        </Suspense>
                    </div>
                </SubPageLayout>
            </section>

            <Footer/>
        </main>
    );
}
