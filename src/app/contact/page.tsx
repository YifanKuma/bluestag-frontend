"use client";

import {motion} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlueGlowBackground from "@/components/BlueGlowBackground";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import SuccessToast from "./SuccessToast";
import AutofillFixStyle from "./AutofillFixStyle";

export default function Page() {
    return (
        <main className="relative min-h-screen text-white pt-16 overflow-hidden">
            <BlueGlowBackground/>
            <Navbar/>

            {/* Hero */}
            <section className="relative z-10 text-center max-w-3xl mx-auto mt-20 px-6">
                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600"
                >
                    Get in Touch
                </motion.h1>
                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-gray-400 text-lg"
                >
                    Whether you’re curious about features, a demo, or partnership opportunities — we’re here to help
                    your business scale with Voice&nbsp;AI.
                </motion.p>
            </section>

            {/* Content */}
            <section className="relative z-10 mt-8 mb-32 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10">
                <ContactInfo/>
                <ContactForm/>
            </section>

            <Footer/>
            <SuccessToast/>
            <AutofillFixStyle/>
        </main>
    );
}