import Image from "next/image";
import Link from "next/link";
import {Linkedin, Instagram, Facebook} from "lucide-react";
import {INDUSTRIES} from "@/data/industries";

const company = [
    {label: "Blog", href: "/under-construction"},
    {label: "Pricing", href: "/pricing"},
    {label: "Book a Demo", href: "/contact"},
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="rounded-[28px] border border-white/10 bg-[#111111]
                        shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]
                        px-6 py-10 md:px-10">
                    <div className="grid gap-10 md:grid-cols-3">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/logo.png"
                                    alt="Bluestag AI"
                                    width={44}
                                    height={44}
                                    className="object-contain"
                                    priority
                                />
                                <span className="text-3xl font-extrabold text-white">Bluestag AI</span>
                            </div>

                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
                                Agentic voice automation that answers calls, qualifies leads, and
                                improves ops for Australian businesses.
                            </p>

                            {/* Socials */}
                            <div className="mt-6 flex items-center gap-4">
                                {[
                                    {Icon: Facebook, href: "https://facebook.com/bluestagai", label: "Facebook"},
                                    {
                                        Icon: Linkedin,
                                        href: "https://linkedin.com/company/bluestag-ai",
                                        label: "LinkedIn"
                                    },
                                    {Icon: Instagram, href: "https://instagram.com/bluestag.ai", label: "Instagram"},
                                ].map(({Icon, href, label}) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-neutral-200 transition hover:bg-white/10 hover:text-white"
                                    >
                                        <Icon size={18} aria-hidden="true"/>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="md:col-span-2 grid gap-10 sm:grid-cols-2">
                            <div>
                                <h4 className="text-xl font-semibold text-white">Company</h4>
                                <ul className="mt-5 space-y-3">
                                    {company.map((l) => (
                                        <li key={l.label}>
                                            <Link href={l.href} className="text-neutral-300 transition hover:text-white"
                                                  prefetch={false}>
                                                {l.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-white">Industries We Serve</h4>
                                <ul className="mt-5 space-y-3">
                                    {INDUSTRIES.map((ind) => {
                                        const slug = ind.slug ?? ind.id;
                                        return (
                                            <li key={ind.id}>
                                                <Link
                                                    href={{
                                                        pathname: "/industries",
                                                        query: {industry: slug},
                                                        hash: "industry-detail"
                                                    }}
                                                    className="text-neutral-300 transition hover:text-white"
                                                    prefetch={false}
                                                >
                                                    {ind.title}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="my-10 h-px w-full bg-white/10"/>

                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <p className="text-neutral-400">© {year} Bluestag AI. All rights reserved.</p>
                        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-neutral-300">
                            <Link href="/under-construction" className="transition hover:text-white" prefetch={false}>
                                Terms & Conditions
                            </Link>
                            <Link href="/privacy-policy" className="transition hover:text-white" prefetch={false}>
                                Privacy Policy
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}