export type IndustryIconKey =
    | "real_estate"
    | "finance"
    | "logistics"
    | "contact_center"
    | "healthcare"
    | "education"
    | "retail";

export type Step = {
    id: number;
    actor: "Agent" | "CUSTOMER" | "Customer";  // must match EXACT strings
    text: string;
};


export type Industry = {
    id: number;              // numeric from Strapi
    documentId?: string;     // Strapi v5 field
    slug: string;            // required
    title: string;
    summary: string;
    icon_key: IndustryIconKey;   // ← KEY FIX
    bullets: string[];
    demo: Step[];
    cta?: {
        href: string;
        label: string;
    };
};
