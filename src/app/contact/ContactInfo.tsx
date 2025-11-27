"use client";

import {motion} from "framer-motion";
import {Mail, MapPin, Phone, Clock} from "lucide-react";

export default function ContactInfo({
                                        email,
                                        phone,
                                        location,
                                        hoursLabel,
                                        hoursDescription,
                                        bannerImage,
                                        bannerTitle,
                                        bannerCaption,
                                        introDescription,
                                    }: {
    email: string;
    phone: string;
    location: string;
    hoursLabel: string;
    hoursDescription: string;
    bannerImage: string;
    bannerTitle: string;
    bannerCaption: string;
    introDescription: string;
}) {
    // Ensure full Strapi URL for the image
    const fullBannerImage = bannerImage?.startsWith("/")
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${bannerImage}`
        : bannerImage;

    return (
        <motion.div
            initial={{opacity: 0, x: -30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.7}}
            className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_20px_rgba(56,189,248,0.15)] flex flex-col gap-8"
        >
            {/* Intro */}
            <div>
                <h2 className="text-2xl font-semibold text-sky-400 mb-2">
                    Get in Touch
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                    {introDescription}
                </p>
            </div>

            {/* Banner */}
            <div
                className="rounded-2xl overflow-hidden relative h-44 sm:h-52 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${fullBannerImage})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/90 via-[#0b1120]/40 to-transparent"/>

                <div className="absolute bottom-3 left-4">
                    <p className="text-sky-400 font-medium text-sm">{bannerTitle}</p>
                    <p className="text-xs text-gray-400">{bannerCaption}</p>
                </div>
            </div>

            {/* Contact details */}
            <div className="space-y-6 text-sm">
                <div className="flex items-center gap-3">
                    <Mail className="text-sky-400 w-5 h-5"/>
                    <a href={`mailto:${email}`} className="font-medium hover:underline">
                        {email}
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    <Phone className="text-sky-400 w-5 h-5"/>
                    <a href={`tel:${phone}`} className="font-medium hover:underline">
                        {phone}
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    <MapPin className="text-sky-400 w-5 h-5"/>
                    <p className="font-medium">{location}</p>
                </div>
            </div>

            {/* Hours */}
            <div className="border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                    <Clock className="text-sky-400 w-5 h-5 mt-1"/>
                    <div>
                        <p className="font-medium text-gray-300">{hoursLabel}</p>
                        <p className="text-gray-400 text-sm">{hoursDescription}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
