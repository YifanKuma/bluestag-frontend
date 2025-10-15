import type {Metadata} from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubPageLayout from "@/components/SubPageLayout";
import ServicesSwitcher from "@/app/ai-services/sections/ServicesSwitcher";

export const metadata: Metadata = {
    title: "Services | Bluestag AI",
    description: "Voice AI, Social Media, Managed IT, and AI Chatbots — all in one page.",
};

export default function Page() {
    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            <Navbar/>

            <section className="relative z-10 pt-20">
                <SubPageLayout
                    title="Services"
                    subtitle="Four ways Bluestag accelerates your business — human-free automation, secure IT, and intelligent assistants."
                >
                    {/* extra breathing room between title/subtitle and the tabs */}
                    <div className="mt-10 sm:mt-12">
                        <ServicesSwitcher/>
                    </div>
                </SubPageLayout>
            </section>
            <Footer/>
        </main>
    );
}