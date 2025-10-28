"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {Menu, X} from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navItems: Array<[string, string]> = [
        ["Home", "/"],
        ["About", "/about"],
        ["Services", "/ai-services"],
        ["Industries", "/industries"],
        ["Pricing", "/pricing"],
        ["Contact", "/contact"],
    ];

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all ${
                scrolled
                    ? "bg-slate-900/85 text-white backdrop-blur-xl border-b border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
                    : "bg-transparent text-white"
            }`}
        >
            <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 pointer-events-auto">
                    <Image
                        src="/logo.png"
                        alt="Bluestag AI Logo"
                        width={28}
                        height={28}
                        className="object-contain"
                    />
                    <span
                        className={`text-xl font-extrabold ${
                            scrolled ? "text-white" : "text-blue-300"
                        }`}
                    >
            BLUESTAG.AI
          </span>
                </Link>

                {/* Desktop */}
                <nav
                    className={`hidden md:flex items-center gap-8 text-sm font-medium ${
                        scrolled ? "text-white/90" : "text-white/80"
                    }`}
                >
                    {navItems.map(([label, href]) => (
                        <Link
                            key={label}
                            href={href}
                            className="transition hover:text-white"
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className={`rounded-xl px-4 py-2 transition border ${
                            scrolled
                                ? "border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white"
                                : "border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white"
                        }`}
                    >
                        Book a Demo
                    </Link>
                </nav>

                {/* Mobile */}
                <button
                    className={`md:hidden p-2 ${scrolled ? "text-white" : "text-white"}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                </button>
            </div>

            {open && (
                <div className="md:hidden bg-slate-900/95 text-white backdrop-blur-xl border-t border-white/10">
                    <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
                        {navItems.map(([label, href]) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="py-1"
                            >
                                {label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setOpen(false)}
                            className="mt-2 rounded-xl border border-cyan-400 px-4 py-2 text-cyan-300 hover:bg-cyan-500 hover:text-white transition"
                        >
                            Book a Demo
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}