/* -------------------------------------------------------------
   ICON KEYS
------------------------------------------------------------- */
export type ProductIconKey =
    | "voice"
    | "video"
    | "chatbot"
    | "app"
    | "social"
    | "phone"
    | "credit-card"
    | "headphones"
    | "sparkles";

/* Industries icon keys */
export type IndustryIconKey =
    | "real_estate"
    | "ecommerce"
    | "finance"
    | "logistics"
    | "customer_support"
    | "healthcare"
    | "education";

/* -------------------------------------------------------------
   Product Feature
------------------------------------------------------------- */
export interface ProductFeature {
    id: number;
    text: string;
    icon_key: ProductIconKey;
    cta_link?: string | null;
}

/* -------------------------------------------------------------
   Product Badge
------------------------------------------------------------- */
export interface ProductBadge {
    id: number;
    badge_icon_key: string; // e.g. "cloud", "shield"
    badge_text: string;
}

/* -------------------------------------------------------------
   Industry (used inside ProductTabs right panel)
------------------------------------------------------------- */
export interface ProductIndustry {
    id: number;
    title: string;
    slug: string;
    icon_key: IndustryIconKey;
}

/* -------------------------------------------------------------
   Product Tab type (Strapi)
------------------------------------------------------------- */
export interface ProductTab {
    id: number;
    title: string;
    description: string;
    slug: string;

    tab_label?: string | null;

    cta_label?: string | null;
    cta_link?: string | null;

    icon_key: ProductIconKey;

    features: ProductFeature[];

    badge?: ProductBadge[];
}
