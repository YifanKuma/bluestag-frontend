export const revalidate = 60;
// OR: export const dynamic = "force-dynamic";

import type {Metadata} from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyPolicyClient from "./PrivacyPolicyClient";
import {getPrivacyPolicy} from "@/lib/strapi";

export const metadata: Metadata = {
    title: "Privacy Policy | Bluestag AI",
    description:
        "This document sets forth the Privacy Policy for the Bluestag AI website, www.bluestag.ai.",
};

export default async function PrivacyPolicyPage() {
    const data = await getPrivacyPolicy();

    if (!data) {
        return (
            <main className="min-h-screen text-white">
                <Navbar/>
                <div className="p-20 text-center text-white/70">
                    Failed to load Privacy Policy.
                </div>
                <Footer/>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen overflow-hidden text-white">
            <Navbar/>
            <PrivacyPolicyClient data={data}/>
            <Footer/>
        </main>
    );
}
