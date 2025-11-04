"use client";
import {motion} from "framer-motion";
import {Mail, MapPin, Phone, Clock, Users, MessageSquare} from "lucide-react";

export default function ContactInfo() {
    return (
        <motion.div
            initial={{opacity: 0, x: -30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.7}}
            className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_20px_rgba(56,189,248,0.15)] flex flex-col justify-between"
        >
            {/* Blue ambient glow */}
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none rounded-3xl"/>

            <div className="relative z-10 flex flex-col gap-8 text-gray-200">
                {/* Intro */}
                <div>
                    <h2 className="text-2xl font-semibold text-sky-400 mb-2">
                        Get in Touch
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Whether you’re curious about AI solutions, partnership opportunities,
                        or tailored support — our team is here to help you scale your business
                        with intelligence.
                    </p>
                </div>

                {/* Image banner */}
                <div
                    className="rounded-2xl overflow-hidden relative h-44 sm:h-52 bg-cover bg-center"
                    style={{backgroundImage: "url('/Brisbane_CBD.jpg')"}}
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/90 via-[#0b1120]/40 to-transparent"/>
                    <div className="absolute bottom-3 left-4">
                        <p className="text-sky-400 font-medium text-sm">
                            Bluestag AI — Based in Brisbane
                        </p>
                        <p className="text-xs text-gray-400">Proudly Australian Owned</p>
                    </div>
                </div>

                {/* Contact details */}
                <div className="space-y-5 text-sm mt-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sky-500/10">
                            <Mail className="text-sky-400 w-5 h-5"/>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Email</p>
                            <a
                                href="mailto:support@bluestag.ai"
                                className="font-medium hover:underline"
                            >
                                support@bluestag.ai
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sky-500/10">
                            <Phone className="text-sky-400 w-5 h-5"/>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Phone</p>
                            <a
                                href="tel:+61488359021"
                                className="font-medium hover:underline"
                            >
                                +61 488 359 021
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sky-500/10">
                            <MapPin className="text-sky-400 w-5 h-5"/>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Location</p>
                            <p className="font-medium">Brisbane City, QLD, Australia</p>
                        </div>
                    </div>
                </div>

                {/* Divider + highlights */}
                <div className="border-t border-white/10 pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                        <Clock className="text-sky-400 w-5 h-5 mt-1"/>
                        <p className="text-gray-400 text-sm leading-relaxed">
              <span className="font-medium text-gray-300">
                Monday–Friday, 9am–5pm (AEST)
              </span>
                            <br/>
                            We’ll usually get back within a few hours.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
