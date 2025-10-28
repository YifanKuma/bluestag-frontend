"use client";
import {motion} from "framer-motion";
import {Mail, MapPin, Phone} from "lucide-react";

export default function ContactInfo() {
    return (
        <motion.div
            initial={{opacity: 0, x: -30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.7}}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-lg flex flex-col justify-center"
        >
            <h2 className="text-2xl font-semibold mb-6 text-sky-400">Contact Information</h2>

            <div className="space-y-5 text-gray-300 text-sm">
                <div className="flex items-center gap-3">
                    <Mail className="text-sky-400 w-5 h-5"/><span>support@bluestag.ai</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="text-sky-400 w-5 h-5"/><span>+61 488 359 021</span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="text-sky-400 w-5 h-5"/><span>South Brisbane, QLD, Australia</span>
                </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-gray-400 text-sm">
                    Our team is based in Brisbane and available Monday–Friday, 9am–6pm (AEST). We’ll usually get back
                    within a few hours.
                </p>
            </div>
        </motion.div>
    );
}