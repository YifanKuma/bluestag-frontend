"use client";

import Image from "next/image";
import {
    Twitter,
    Linkedin,
    Youtube,
    Instagram,
} from "lucide-react";

const company = [
    {label: "Blogs", href: "#"},
    {label: "Newsletters", href: "#"},
    {label: "Use Cases", href: "#"},
    {label: "Pricing", href: "#"},
    {label: "Careers", href: "#"},
    {label: "Book A Demo", href: "#"},
    {label: "Contact Us", href: "#"},
];

const industries = [
    {label: "Pharma & Healthcare", href: "#"},
    {label: "Supply & Logistics", href: "#"},
    {label: "E-commerce & Retail", href: "#"},
    {label: "Finance & Fintech", href: "#"},
    {label: "Talent & Hiring", href: "#"},
    {label: "EdTech & Learning", href: "#"},
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="
          rounded-[28px] border border-white/10 bg-[#111111]
          shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]
          px-6 py-10 md:px-10
        ">
                    {/* top */}
                    <div className="grid gap-10 md:grid-cols-3">
                        {/* logo + description */}
                        <div>
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/logo.png"   // 👈 replace with your actual logo file path (e.g. /logo.svg)
                                    alt="Bluestag AI Logo"
                                    width={44}
                                    height={44}
                                    className="object-contain"
                                />
                                <span className="text-3xl font-extrabold text-white">
                  Bluestag AI
                </span>
                            </div>

                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
                                Bluestag AI is a no-code platform that uses AI voice assistants
                                to automate calls, capture leads, and boost business efficiency.
                            </p>

                            {/* socials */}
                            <div className="mt-6 flex items-center gap-4">
                                {[
                                    {Icon: Twitter, href: "#"},
                                    {Icon: Linkedin, href: "#"},
                                    {Icon: Youtube, href: "#"},
                                    {Icon: Instagram, href: "#"},
                                ].map(({Icon, href}, i) => (
                                    <a
                                        key={i}
                                        href={href}
                                        aria-label="social"
                                        className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-neutral-200 hover:bg-white/10 hover:text-white transition"
                                    >
                                        <Icon size={18}/>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* link columns */}
                        <div className="md:col-span-2 grid gap-10 sm:grid-cols-2">
                            <div>
                                <h4 className="text-xl font-semibold text-white">Company</h4>
                                <ul className="mt-5 space-y-3">
                                    {company.map((l) => (
                                        <li key={l.label}>
                                            <a
                                                href={l.href}
                                                className="text-neutral-300 hover:text-white transition"
                                            >
                                                {l.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-white">
                                    Industries We Serve
                                </h4>
                                <ul className="mt-5 space-y-3">
                                    {industries.map((l) => (
                                        <li key={l.label}>
                                            <a
                                                href={l.href}
                                                className="text-neutral-300 hover:text-white transition"
                                            >
                                                {l.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* divider */}
                    <div className="my-10 h-px w-full bg-white/10"/>

                    {/* bottom bar */}
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <p className="text-neutral-400">
                            © {year} Bluestag AI. All rights reserved.
                        </p>
                        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-neutral-300">
                            <a href="#" className="hover:text-white transition">Terms and Conditions</a>
                            <a href="#" className="hover:text-white transition">Return Policy</a>
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}