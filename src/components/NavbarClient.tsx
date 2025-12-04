"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {Menu, X} from "lucide-react";

/* -------------------------------------------------------
   TYPES
------------------------------------------------------- */
interface NavLinkItem {
    id: number;
    label: string;
    href: string;
}

interface NavbarLogo {
    url?: string | null;
}

interface NavbarData {
    logo?: NavbarLogo | null;
    nav_link?: NavLinkItem[];
    cta_label?: string | null;
    cta_href?: string | null;
    enable_scroll_style?: boolean;
}

export default function NavbarClient({navbar}: { navbar: NavbarData | null }) {
    /** -------------------------------------------------------
     *  HOOKS MUST ALWAYS RUN — EVEN IF NAVBAR IS NULL
     --------------------------------------------------------*/
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");

    const pathname = usePathname();

    /** If navbar is null, use safe defaults */
    const logo = navbar?.logo ?? null;
    const nav_link = navbar?.nav_link ?? [];
    const cta_label = navbar?.cta_label ?? null;
    const cta_href = navbar?.cta_href ?? null;
    const enable_scroll_style = navbar?.enable_scroll_style ?? false;

    /* -------------------------------------------------------
       Scroll styling
    ------------------------------------------------------- */
    useEffect(() => {
        if (!enable_scroll_style) return;

        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [enable_scroll_style]);

    /* -------------------------------------------------------
       Scroll spy
    ------------------------------------------------------- */
    useEffect(() => {
        if (!navbar) return;

        const sectionElements = nav_link
            .filter((item) => item.href.includes("#"))
            .map((item) => {
                const id = item.href.split("#")[1];
                return {id, element: document.getElementById(id)};
            })
            .filter((s) => s.element !== null);

        const onScroll = () => {
            let current = "";
            for (const s of sectionElements) {
                const top = s.element!.offsetTop - 120;
                if (window.scrollY >= top) current = s.id;
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [navbar, nav_link]);

    /* -------------------------------------------------------
       SAFE EARLY RETURN (AFTER hooks)
    ------------------------------------------------------- */
    if (!navbar) return null;

    const logoUrl =
        logo?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${logo.url}`
            : "/logo.png";

    const Underline = () => (
        <span
            className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full bg-cyan-300 rounded-full transition-all duration-300"/>
    );

    return (
        <header
            className={`fixed inset-x-0 top-0 z-[9999] transition-all ${
                scrolled && enable_scroll_style
                    ? "bg-slate-900/85 text-white backdrop-blur-xl border-b border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
                    : "bg-transparent text-white"
            }`}
        >
            <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={logoUrl}
                        alt="Logo"
                        width={28}
                        height={28}
                        className="object-contain"
                    />
                    <span className="text-xl font-extrabold text-blue-300">
            BLUESTAG.AI
          </span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    {nav_link.map((item) => {
                        const isRouteActive =
                            pathname === item.href ||
                            (item.href !== "/" &&
                                pathname.startsWith(item.href.split("#")[0]));

                        const sectionId = item.href.includes("#")
                            ? item.href.split("#")[1]
                            : null;

                        const isScrollActive =
                            sectionId !== null && activeSection === sectionId;

                        const active = isRouteActive || isScrollActive;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`relative px-1 pb-1 transition ${
                                    active
                                        ? "text-cyan-300 font-semibold"
                                        : "text-white/90 hover:text-cyan-300"
                                }`}
                            >
                                {item.label}
                                {active && <Underline/>}
                            </Link>
                        );
                    })}

                    {cta_href && (
                        <Link
                            href={cta_href}
                            className="rounded-xl px-4 py-2 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-white"
                        >
                            {cta_label}
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X/> : <Menu/>}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-slate-900/95 text-white border-t border-white/10">
                    <div className="px-6 py-4 flex flex-col gap-3">
                        {nav_link.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="text-lg text-white/90 hover:text-cyan-300"
                            >
                                {item.label}
                            </Link>
                        ))}
                        {cta_href && (
                            <Link
                                href={cta_href}
                                onClick={() => setOpen(false)}
                                className="rounded-xl border border-cyan-400 px-4 py-2 text-cyan-300"
                            >
                                {cta_label}
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
