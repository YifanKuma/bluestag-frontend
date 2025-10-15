import type {Metadata} from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundSwitcher from "@/components/BackgroundSwitcher";
import BlueGlowBackground from "@/components/BlueGlowBackground";
import CursorGlow from "@/components/CursorGlow";

import AboutHero from "@/app/about/AboutHero";
import OurStory from "@/app/about/OurStory";
import MissionVision from "@/app/about/MissionVision";
import TeamSection from "@/app/about/TeamSection";
import Partners from "@/app/about/Partners";
import ContactCTA from "@/app/about/ContactCTA";

export const metadata: Metadata = {
    title: "About Us | Bluestag AI",
    description:
        "Learn how Bluestag AI started, our mission & vision, the team, and our partners.",
};

export default function AboutPage() {
    return (
        <main className="relative min-h-screen text-white overflow-hidden">
            {/* 🧭 header */}
            <Navbar/>

            {/* 📖 content */}
            <section id="about" className="relative z-10 pt-16 md:pt-20">
                {/* ✅ unified container + spacing */}
                <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-24">
                    <AboutHero/>
                    <OurStory/>
                    <MissionVision/>
                    <TeamSection/>
                    <Partners/>
                    <ContactCTA/>
                </div>
            </section>

            {/* 🔚 footer */}
            <Footer/>
        </main>
    );
}