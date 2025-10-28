import type {Metadata} from "next";
import {Suspense} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubPageLayout from "@/components/SubPageLayout";
import IndustriesContent from "./IndustriesContent";
import ScrollIntoDetail from "./ScrollIntoDetail"; // client

export const metadata: Metadata = {
    title: "Industries | Bluestag AI",
    description: "Voice AI solutions tailored for each industry with live demos.",
};

export default function Page() {
    return (
        <main className="relative min-h-screen text-white overflow-x-clip">
            <Navbar/>
            <section className="relative z-10 pt-20">
                <Suspense fallback={null}>
                    <ScrollIntoDetail/>
                </Suspense>

                <SubPageLayout
                    title="AI Voice Solutions by Industry"
                    subtitle="Bluestag adapts to real estate, logistics, education, healthcare, and more — pick an industry to see a live demo."
                >
                    <div className="mt-10 sm:mt-12">
                        {/* If IndustriesContent reads URL, keep it in Suspense too */}
                        <Suspense fallback={null}>
                            <IndustriesContent/>
                        </Suspense>
                    </div>
                </SubPageLayout>
            </section>
            <Footer/>
        </main>
    );
}