"use client";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {Menu, X} from "lucide-react";

const nav = [
    {href: "/", label: "Home"},
    {href: "/voice-ai", label: "Voice AI"},
    {href: "/industries", label: "Industries"},
    {href: "/pricing", label: "Pricing"},
    {href: "/resources", label: "Resources"},
    {href: "/about", label: "About"},
    {href: "/contact", label: "Contact"},
];

export default function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {/* put /public/logo.png */}
                    <Image src="/logo.png" alt="Bluestag.AI" width={36} height={36} className="rounded"/>
                    <span className="font-extrabold text-xl text-sky-700">BLUESTAG.AI</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {nav.map((n) => (
                        <Link key={n.href} href={n.href} className="hover:text-gray-700">
                            {n.label}
                        </Link>
                    ))}
                    <Link
                        href="/voice-ai"
                        className="ml-4 inline-flex items-center rounded-xl border border-sky-600 px-3 py-1.5 text-sm font-semibold text-sky-700 hover:bg-sky-50"
                    >
                        Book a Demo
                    </Link>
                </nav>
                <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
                    {open ? <X/> : <Menu/>}
                </button>
            </div>
            {open && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-3 grid gap-2">
                        {nav.map((n) => (
                            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2">
                                {n.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}