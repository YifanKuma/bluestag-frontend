// lib/strapi.ts

import {VideoAIData} from "@/types/video-ai";
import type {PricingPageData, PricingPlan, StrapiPlanRaw} from "@/types/pricing";
import {SocialMediaData} from "@/types/social-media";
import qs from "qs";
import {ContactPageData} from "@/types/contact";
import type {UseCaseItem} from "@/types/use-cases";


const STRAPI_URL = process.env.STRAPI_URL!;
const TOKEN = process.env.STRAPI_TOKEN!;

/* -------------------------------------------------------
   GENERIC FETCHER (STRAPI V5)
------------------------------------------------------- */
export async function strapiFetch(endpoint: string) {
    try {
        const res = await fetch(`${STRAPI_URL}${endpoint}`, {
            headers: {Authorization: `Bearer ${TOKEN}`},
            next: {revalidate: 1},
        });

        if (!res.ok) {
            console.error(`❌ Strapi fetch failed (${res.status}):`, endpoint);
            return null;
        }

        const json = await res.json();
        return json.data ?? null; // ⭐ v5 data directly
    } catch (err) {
        console.error("❌ Strapi fetch error:", err);
        return null;
    }
}

/* -------------------------------------------------------
   SERVICES PAGE (Single Type)
------------------------------------------------------- */
export async function getServicesPage() {
    try {
        const res = await fetch(`${STRAPI_URL}/api/services-page?populate=*`, {
            headers: {Authorization: `Bearer ${TOKEN}`},
            next: {revalidate: 1},
        });

        const json = await res.json();
        return json?.data ?? null; // ⭐ v5
    } catch (e) {
        console.error("💥 getServicesPage error:", e);
        return null;
    }
}

/* -------------------------------------------------------
   SERVICES TABS (Single Type)
------------------------------------------------------- */
export async function getServicesTabs() {
    try {
        const url = `${STRAPI_URL}/api/services-tab?populate=*`;

        const res = await fetch(url, {
            headers: {Authorization: `Bearer ${TOKEN}`},
            next: {revalidate: 1},
        });

        const raw = await res.text();
        const json = JSON.parse(raw);

        if (!json.data) {
            console.log("🔥 SERVICES TABS (server): NO ENTRY");
            return null;
        }

        const attrs = json.data;
        const tabs = attrs.service_tab;
        return tabs ?? null;

    } catch (err) {
        console.error("❌ getServicesTabs error:", err);
        return null;
    }
}


/* -------------------------------------------------------
   VOICE AI (Collection)
------------------------------------------------------- */
export async function getVoiceAISection() {
    const json = await strapiFetch(`/api/voice-ai-sections?populate=*`);
    return json?.[0] ?? null; // ⭐ v5: no attributes
}

/* -------------------------------------------------------
   VIDEO AI (Single Type)
------------------------------------------------------- */
export async function getVideoAISection(): Promise<VideoAIData | null> {
    try {
        const res = await fetch(`${STRAPI_URL}/api/video-ai-section?populate=*`, {
            headers: {Authorization: `Bearer ${TOKEN}`},
            next: {revalidate: 1},
        });

        const json = await res.json();
        return json?.data ?? null;
    } catch (e) {
        console.error("💥 getVideoAISection crashed:", e);
        return null;
    }
}

/* -------------------------------------------------------
   AI CHATBOT (Single Type)
------------------------------------------------------- */
export async function getAIChatbotSection() {
    return await strapiFetch(
        `/api/ai-chatbot?populate[features][populate]=*&populate[value_pills][populate]=*`
    );
}

/* -------------------------------------------------------
   APP DEV (Single Type)
------------------------------------------------------- */
export async function getAppDevSection() {
    return await strapiFetch(
        `/api/app-dev-section?populate[story_panels]=*&populate[showcases][populate][bullets]=*&populate[kpis]=*`
    );
}

/* -------------------------------------------------------
   SOCIAL MEDIA SECTION (Single Type)
------------------------------------------------------- */
export async function getSocialMediaSection(): Promise<SocialMediaData | null> {
    try {
        const res = await fetch(`${STRAPI_URL}/api/social-media-section?populate=*`, {
            headers: {Authorization: `Bearer ${TOKEN}`},
            next: {revalidate: 1},
        });

        const json = await res.json();
        const entry = json?.data ?? null; // ⭐ v5

        if (!entry) return null;

        return {
            id: entry.id,
            title: entry.title,
            subtitle: entry.subtitle,
            description: entry.description,

            kpis: entry.kpis ?? [],
            steps: entry.steps ?? [],
            templates: entry.templates ?? [],
            performance_stats: entry.performance_stats ?? [],
            channels: entry.channels ?? [],

            json_preview: entry.json_preview ?? null,
        };
    } catch (err) {
        console.error("💥 getSocialMediaSection crashed:", err);
        return null;
    }
}


/* -------------------------------------------------------
   INDUSTRIES (Collection)
------------------------------------------------------- */
export async function getIndustries() {
    try {
        const data = await strapiFetch(
            `/api/industries?populate=cta&populate=demo`
        );

        return data ?? []; // Strapi v5: already attributes-level
    } catch (err) {
        console.error("❌ getIndustries error:", err);
        return [];
    }
}

export async function getIndustry(slug: string) {
    try {
        const data = await strapiFetch(
            `/api/industries?filters[slug][$eq]=${slug}&populate=cta&populate=demo`
        );

        return data?.[0] ?? null; // first entry
    } catch (err) {
        console.error("❌ getIndustry error:", err);
        return null;
    }
}

/* -------------------------------------------------------
   INDUSTRIES PAGE (Single Type)
------------------------------------------------------- */
export async function getIndustriesPage() {
    try {
        const data = await strapiFetch(`/api/industries-page?populate=*`);
        return data ?? null;
    } catch (err) {
        console.error("💥 getIndustriesPage crashed:", err);
        return null;
    }
}


export async function getPricingPage(): Promise<PricingPageData | null> {
    const query = qs.stringify(
        {
            populate: {
                plans: {populate: "*"},
                addons: {populate: "*"},
                faqs: {populate: "*"},
                comparison_rows: {populate: "*"},
            },
        },
        {encodeValuesOnly: true}
    );

    const res = await fetch(
        `${STRAPI_URL}/api/pricing-page?${query}`,
        {headers: {Authorization: `Bearer ${process.env.STRAPI_TOKEN}`}}
    );

    if (!res.ok) return null;

    const raw = await res.json();
    const data = raw.data;

    // ---- FIX HERE ----
    const plans: PricingPlan[] = data.plans.map((p: StrapiPlanRaw) => ({
        id: p.id,
        title: p.title,
        tagline: p.tagline ?? undefined,
        popular: p.popular ?? false,

        price_monthly: p.price_monthly,
        price_annual: p.price_annual,

        call_minutes_included: p.call_minutes_included,
        parallel_calls: p.parallel_calls,

        icon_key: p.icon_key ?? undefined,

        features: (p.Feature_Item ?? []).map(fi => ({
            label: fi.label
        }))
    }));

    return {
        hero_title: data.hero_title,
        hero_subtitle: data.hero_subtitle,
        hero_toggle_label_monthly: data.hero_toggle_label_monthly,
        hero_toggle_label_annual: data.hero_toggle_label_annual,

        plans,
        comparison_rows: data.comparison_rows ?? [],
        addons: data.addons ?? [],
        faqs: data.faqs ?? [],
    };
}


export async function getContactPageData(): Promise<ContactPageData | null> {
    const url = `${STRAPI_URL}/api/contact-page?populate=*`;

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
            },
            next: {revalidate: 1},
        });

        const json = await res.json();

        // HERE IS THE FIX
        if (!json?.data) {
            console.warn("⚠ [SERVER] No data returned from Strapi.");
            return null;
        }

        return json.data;  // FIXED
    } catch (error) {
        console.error("❌ [SERVER] Strapi fetch error:", error);
        return null;
    }
}

// src/lib/strapi.ts
export async function getAboutPage() {
    const url = `${STRAPI_URL}/api/about-content?populate=*`;

    try {
        const res = await fetch(url, {
            next: {revalidate: 1},
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_TOKEN}`, // 🔹 server-only token
            },
        });

        const json = await res.json();
        return json.data || null;
    } catch {
        return null;
    }
}


/* -------------------------------------------------------
   HOME PAGE — CLEAN & SAFE VERSION
------------------------------------------------------- */

export async function getHomePage() {

    const query = qs.stringify(
        {
            populate: {
                hero_kpis: "*",
                product_tabs: {populate: "*"},
                carousel_items: {populate: "*"},
                use_cases: {populate: "*"},
                integrations: {populate: "*"},
                languages: {populate: "*"},
                industries: {populate: "*"},
            },
        },
        {encodeValuesOnly: true}
    );

    const url = `${STRAPI_URL}/api/home-page?${query}`;

    try {
        const res = await fetch(url, {
            headers: {Authorization: `Bearer ${TOKEN}`},
            next: {revalidate: 1},
        });

        if (!res.ok) {
            console.error(`❌ getHomePage failed (${res.status})`);
            return null;
        }

        const json = await res.json();
        const data = json?.data ?? null;
        if (!data) return null;

        /* ------------------------------------------
           NORMALIZE PRODUCT TABS
        ------------------------------------------- */
        const mappedTabs = Array.isArray(data.product_tabs)
            ? data.product_tabs.map((t: unknown) => {
                const tab = t as Record<string, unknown>;

                return {
                    id: tab.id as number,
                    slug: tab.slug as string,
                    title: tab.title as string,
                    description: tab.description as string,
                    tab_label:
                        (tab.tab_label as string) ??
                        (tab.title as string) ??
                        "",
                    icon_key: tab.icon_key as string,
                    cta_label: (tab.cta_label as string) ?? null,
                    cta_link: (tab.cta_link as string) ?? null,
                    features: Array.isArray(tab.features) ? tab.features : [],
                    badge: Array.isArray(tab.badge) ? tab.badge : [],
                };
            })
            : [];


        /* ------------------------------------------
           NORMALIZE USE CASES (for display & cards)
        ------------------------------------------- */
        const mappedUseCases: UseCaseItem[] = Array.isArray(data.use_cases)
            ? data.use_cases.map((u: unknown) => {
                const uc = u as Record<string, unknown>;
                const img = uc.image as Record<string, unknown> | undefined;

                return {
                    id: uc.id as number,
                    title: (uc.title as string) ?? "",
                    description: (uc.desc as string) ?? "",
                    icon_key: (uc.icon_key as string) ?? null,
                    slug: (uc.slug as string) ?? null,
                    bullet_points: Array.isArray(uc.bullet_points)
                        ? uc.bullet_points
                        : [],
                    image: img?.url
                        ? {
                            url: img.url as string,
                            alternativeText:
                                (img.alternativeText as string) ?? null,
                        }
                        : null,
                };
            })
            : [];


        /* ------------------------------------------
           NORMALIZE INDUSTRIES
        ------------------------------------------- */
        const rawIndustries = data.industries;

        const industryArray = Array.isArray(rawIndustries)
            ? rawIndustries
            : Array.isArray(rawIndustries?.data)
                ? rawIndustries.data
                : [];

        const mappedIndustries = industryArray.map((i: unknown) => {
            const ind = i as Record<string, unknown>;
            return {
                id: ind.id as number,
                title: ind.title as string,
                slug: ind.slug as string,
                icon_key: ind.icon_key as string,
            };
        });


        /* ------------------------------------------
            NORMALIZE INTEGRATIONS (supports both shapes)
        ------------------------------------------- */
        let rawIntegrations = data.integrations;

        if (rawIntegrations?.data) {
            rawIntegrations = rawIntegrations.data.map((i: unknown) => {
                const item = i as Record<string, unknown>;
                return {
                    id: item.id as number,
                    ...(item.attributes as object),
                };
            });
        } else if (Array.isArray(rawIntegrations)) {
            rawIntegrations = rawIntegrations.map((i: unknown) => {
                const item = i as Record<string, unknown>;
                return {
                    id: item.id as number,
                    name: item.name as string,
                    desc: item.desc as string,
                    icon_key: item.icon_key as string,
                };
            });
        }

        /* ------------------------------------------
           FINAL CLEAN OBJECT RETURNED
        ------------------------------------------- */


        const finalResult = {
            id: data.id,

            hero_title: data.hero_title ?? "",
            hero_subtitle: data.hero_subtitle ?? "",
            hero_description: data.hero_description ?? "",
            hero_rotating_words: data.hero_rotating_words ?? [],
            hero_kpis: data.hero_kpis ?? [],

            product_tabs: mappedTabs,
            carousel_items: data.carousel_items ?? [],
            use_cases: mappedUseCases,

            // ⭐ ADD THIS BACK
            integrations: rawIntegrations,
            languages: data.languages ?? [],
            industries: mappedIndustries,
        };

        return finalResult;
    } catch (err) {
        console.error("💥 getHomePage crashed:", err);
        return null;
    }
}


export async function getPrivacyPolicy() {
    const query = qs.stringify(
        {
            populate: "*", // ⭐ Strapi v5 correct syntax
        },
        {encodeValuesOnly: true}
    );

    const url = `${STRAPI_URL}/api/privacy-policy?${query}`;

    try {
        const res = await fetch(url, {
            headers: {Authorization: `Bearer ${TOKEN}`},
            next: {revalidate: 1},
        });

        if (!res.ok) {
            console.error("❌ getPrivacyPolicy failed:", res.status);
            const errorText = await res.text();
            console.error("Server response:", errorText);
            return null;
        }

        const json = await res.json();
        return json.data;
    } catch (err) {
        console.error("❌ getPrivacyPolicy error:", err);
        return null;
    }
}

export async function getFooter() {
    const query = qs.stringify(
        {
            fields: ["description"],

            populate: {
                logo: {
                    populate: "*",
                },
                company_links: {
                    populate: "*",
                    fields: ["label", "href"],
                },
                social_links: {
                    populate: "*",
                    fields: ["facebook_url", "linkedin_url", "instagram_url"],
                },
            },
        },
        {encodeValuesOnly: true}
    );

    const url = `${STRAPI_URL}/api/footer?${query}`;

    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            next: {revalidate: 1},
        });

        if (!res.ok) {
            console.error("❌ getFooter() failed:", res.status, res.statusText);
            return null;
        }

        const json = await res.json();

        // ✅ Strapi v5 returns content directly inside data (NO attributes)
        return json?.data ?? null;

    } catch (err) {
        console.error("❌ getFooter() error:", err);
        return null;
    }
}

export async function getNavbar() {
    const query = qs.stringify(
        {
            fields: ["cta_label", "cta_href", "enable_scroll_style"],
            populate: {
                logo: {fields: ["url", "alternativeText", "width", "height"]},
                nav_link: {fields: ["label", "href"]},
            },
        },
        {encodeValuesOnly: true}
    );

    const url = `${STRAPI_URL}/api/navbar?${query}`;

    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${TOKEN}`, // 🔥 REQUIRED
            },
            cache: "force-cache",     // SSG
            next: {revalidate: 60}, // ISR
        });

        if (!res.ok) {
            console.error("❌ Navbar fetch failed:", await res.text());
            return null;
        }

        const json = await res.json();
        const data = json?.data;

        if (!data) {
            console.warn("⚠️ No navbar data found!");
            return null;
        }

        return {
            id: data.id,
            logo: data.logo ?? null,
            nav_link: data.nav_link ?? [],
            cta_label: data.cta_label ?? "",
            cta_href: data.cta_href ?? "",
            enable_scroll_style: Boolean(data.enable_scroll_style),
        };

    } catch (err) {
        console.error("💥 getNavbar crashed:", err);
        return null;
    }
}


