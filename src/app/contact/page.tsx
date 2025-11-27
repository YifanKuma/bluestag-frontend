import {getContactPageData} from "@/lib/strapi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlueGlowBackground from "@/components/effects/BlueGlowBackground";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import SuccessToast from "./SuccessToast";
import AutofillFixStyle from "./AutofillFixStyle";
import type {ContactPageData} from "@/types/contact";

export const dynamic = "force-dynamic";

export default async function Page() {

    const data: ContactPageData | null = await getContactPageData();

    if (!data) {
        console.log("❌ [SERVER] Failed to load contact page data");
        return (
            <main className="pt-40 text-center text-white">
                Failed to load Contact Page — check Strapi or API token.
            </main>
        );
    }

    // ⭐ OPTION A — NORMALIZE cc_emails TO ALWAYS BE ARRAY
    const normalizedCcEmails = Array.isArray(data.cc_emails)
        ? data.cc_emails
        : data.cc_emails
            ? [data.cc_emails]
            : [];

    return (
        <main className="relative min-h-screen text-white pt-16 overflow-hidden flex flex-col">
            <BlueGlowBackground/>
            <Navbar/>

            {/* Hero */}
            <section className="relative z-10 text-center max-w-3xl mx-auto mt-20 px-6">
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600">
                    {data.intro_title}
                </h1>

                <p className="text-gray-400 text-lg">
                    {data.intro_description}
                </p>
            </section>

            {/* Main Content */}
            <section className="relative z-10 mt-8 mb-32 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">
                <ContactInfo
                    email={data.email}
                    phone={data.phone}
                    location={data.location}
                    hoursLabel={data.hours_label}
                    hoursDescription={data.hours_description}
                    bannerImage={data.banner_image?.url}
                    bannerTitle={data.banner_title}
                    bannerCaption={data.banner_caption}
                    introDescription={data.intro_description}
                />

                <ContactForm
                    services={data.services}
                    submitEmail={data.form_submit_email}
                    ccEmails={normalizedCcEmails}   // ⭐ FIXED HERE
                />
            </section>

            <Footer/>
            <SuccessToast/>
            <AutofillFixStyle/>
        </main>
    );
}
