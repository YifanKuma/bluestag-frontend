import type {Metadata} from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
    title: "Privacy Policy | Bluestag AI",
    description:
        "This document sets forth the Privacy Policy for the Bluestag AI website, www.bluestag.ai.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="relative min-h-screen overflow-hidden text-white">
            {/* If your RootLayout already renders global backgrounds/cursor, no need to add them here */}
            <Navbar/>
            <PrivacyPolicyClient/>
            <Footer/>
        </main>
    );
}