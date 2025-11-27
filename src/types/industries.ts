export interface StrapiMedia {
    url: string;
    alternativeText?: string | null;
    caption?: string | null;
}

export interface DemoStep {
    actor: "Agent" | "Customer";
    text: string;
    title?: string;
    icon?: string;
}

export interface CTA {
    label: string;
    href: string;
}

export type IndustryIconKey =
    | "real_estate"
    | "retail"
    | "finance"
    | "logistics"
    | "contact_center"
    | "healthcare"
    | "education";

export interface IndustryItem {
    id: number | string;
    slug: string;
    title: string;
    summary: string;
    icon_key: IndustryIconKey;

    bullets?: string[] | null;
    cta?: CTA | null;
    demo?: DemoStep[] | null;

    icon?: StrapiMedia | null;
}

export interface Industry {
    id: number;
    title: string;
    slug: string;
    summary: string;

    icon_key: IndustryIconKey;

    bullets: string[];
    cta?: CTA;
    demo: DemoStep[];
}
