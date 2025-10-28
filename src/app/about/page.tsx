import type {Metadata} from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurStory from "@/app/about/OurStory";
import OurVision from "@/app/about/OurVision";
import ContactCTA from "@/app/about/ContactCTA";

export const metadata: Metadata = {
    title: "About Us | Bluestag AI",
    description:
        "Learn how Bluestag AI started and where we’re headed next.",
};

export default function AboutPage() {
    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            {/* 🧭 header */}
            <Navbar/>

            {/* 📖 content */}
            <section id="about" className="relative z-10 pt-32 pb-24">
                <div className="mx-auto max-w-6xl px-6 space-y-24">
                    <OurStory imageSrc="/about-image.png"/>
                    <OurVision/>
                    <ContactCTA/>
                </div>
            </section>

            {/* 🔚 footer */}
            <Footer/>
        </main>
    );
}