// -------------------------------------------------------------
// 🧱 PLAN (for PlansGrid + PlanCard)
// -------------------------------------------------------------
export interface PricingPlan {
    id: number;                      // Strapi ID
    title: string;                   // Plan name
    tagline?: string;                // Optional subtitle
    popular?: boolean;               // "Most Popular" marker

    price_monthly: number;
    price_annual: number;

    call_minutes_included: number;   // e.g., 500
    parallel_calls: number;          // e.g., 3

    // Matches Strapi Feature_Item component:
    // features: [{ label: "…" }]
    features: { label: string }[];

    icon_key?: string;               // optional Lucide icon mapping
}


// -------------------------------------------------------------
// 🧱 ADD-ON (for AddonsGrid)
// -------------------------------------------------------------
export interface AddonItem {
    id: number;
    title: string;
    description: string;
    price: string;                   // "$49/month", "$250 once", etc.
    icon_key?: string;               // for future icon support
}


// -------------------------------------------------------------
// 🧱 FAQ (for FAQ component)
// -------------------------------------------------------------
export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}


// -------------------------------------------------------------
// 🧱 COMPARISON ROW (for ComparisonTable)
// Example structure:
// { feature: "AI voice agents", values: ["1", "Up to 2", "Up to 3"] }
// -------------------------------------------------------------
export interface ComparisonRow {
    feature: string;
    values: (string | number | null)[];   // one per plan column
}


// -------------------------------------------------------------
// 🏗   PRICING PAGE ROOT TYPE
// -------------------------------------------------------------
export interface PricingPageData {
    hero_title: string;
    hero_subtitle: string;

    hero_toggle_label_monthly: string;
    hero_toggle_label_annual: string;

    plans: PricingPlan[];                // from Plan component
    comparison_rows: ComparisonRow[];    // comparison table rows
    addons: AddonItem[];                 // Addon component
    faqs: FAQItem[];                     // FAQ entries
}


export interface StrapiPlanRaw {
    id: number;
    title: string;
    tagline?: string | null;
    popular?: boolean | null;

    price_monthly: number;
    price_annual: number;

    call_minutes_included: number;
    parallel_calls: number;

    icon_key?: string | null;

    Feature_Item?: { id: number; label: string }[];
}
