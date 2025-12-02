// src/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import { getFooter, getIndustries } from "@/lib/strapi";

/* -------------------------------------------------------------
   TYPES FOR FOOTER + INDUSTRIES (remove all "any")
------------------------------------------------------------- */
interface FooterLink {
    id: number;
    label: string;
    href: string;
}

interface SocialLinks {
    facebook_url?: string | null;
    linkedin_url?: string | null;
    instagram_url?: string | null;
}

interface FooterData {
    logo?: { url: string | null } | null;
    description?: string | null;
    company_links?: FooterLink[] | null;
    social_links?: SocialLinks | null;
}

interface IndustryItem {
    id: number;
    slug?: string | null;
    title: string;
}

/* -------------------------------------------------------------
   COMPONENT
------------------------------------------------------------- */
export default async function Footer() {
    const year = new Date().getFullYear();

    const footer: FooterData | null = await getFooter();
    const industries: IndustryItem[] | null = await getIndustries();

    const companyLinks = footer?.company_links ?? [];
    const socials = footer?.social_links ?? {};
    const description = footer?.description ?? undefined;

    const logoUrl =
        footer?.logo?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${footer.logo.url}`
            : "/logo.png";

    return (
        <footer className="py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div
                    className="rounded-[28px] border border-white/10 bg-[#111111]
                    shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]
                    px-6 py-10 md:px-10"
                >
                    <div className="grid gap-10 md:grid-cols-3">

                        {/* BRAND */}
                        <div>
                            <div className="flex items-center gap-3">
                                <Image
                                    src={logoUrl}
                                    alt="Bluestag AI"
                                    width={44}
                                    height={44}
                                    className="object-contain"
                                    priority
                                />
                                <span className="text-3xl font-extrabold text-white">
                                    Bluestag AI
                                </span>
                            </div>

                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
                                {description ??
                                    "Agentic voice automation that answers calls, qualifies leads, and improves ops for Australian businesses."}
                            </p>

                            {/* SOCIAL LINKS */}
                            <div className="mt-6 flex items-center gap-4">
                                {socials.facebook_url && (
                                    <a
                                        href={socials.facebook_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-neutral-200 transition hover:bg-white/10 hover:text-white"
                                    >
                                        <Facebook size={18} />
                                    </a>
                                )}

                                {socials.linkedin_url && (
                                    <a
                                        href={socials.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-neutral-200 transition hover:bg-white/10 hover:text-white"
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                )}

                                {socials.instagram_url && (
                                    <a
                                        href={socials.instagram_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-neutral-200 transition hover:bg-white/10 hover:text-white"
                                    >
                                        <Instagram size={18} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* LINKS */}
                        <div className="md:col-span-2 grid gap-10 sm:grid-cols-2">

                            {/* COMPANY LINKS */}
                            <div>
                                <h4 className="text-xl font-semibold text-white">Company</h4>
                                <ul className="mt-5 space-y-3">
                                    {companyLinks.map((l) => (
                                        <li key={l.id}>
                                            <Link
                                                href={l.href}
                                                className="text-neutral-300 transition hover:text-white"
                                                prefetch={false}
                                            >
                                                {l.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* INDUSTRIES */}
                            <div>
                                <h4 className="text-xl font-semibold text-white">
                                    Industries We Serve
                                </h4>

                                <ul className="mt-5 space-y-3">
                                    {industries?.map((ind) => {
                                        const slug = ind.slug ?? String(ind.id);
                                        return (
                                            <li key={ind.id}>
                                                <Link
                                                    href={{
                                                        pathname: "/industries",
                                                        query: { industry: slug },
                                                        hash: "industry-detail",
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

                    <div className="my-10 h-px w-full bg-white/10" />

                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <p className="text-neutral-400">
                            © {year} Bluestag AI. All rights reserved.
                        </p>

                        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-neutral-300">
                            <Link
                                href="/under-construction"
                                className="transition hover:text-white"
                                prefetch={false}
                            >
                                Terms & Conditions
                            </Link>

                            <Link
                                href="/privacy-policy"
                                className="transition hover:text-white"
                                prefetch={false}
                            >
                                Privacy Policy
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
