// /types/home-page.ts

import type {ProductTab, ProductIconKey} from "@/types/product-tab";
import type {IntegrationIconKey} from "@/data/integrations";
import {IndustryItem} from "@/types/industries";

/* -----------------------------------------------------------
   HERO
------------------------------------------------------------ */
export interface HeroKpi {
    label: string;
    value: string;
}

/* -----------------------------------------------------------
   PRODUCT TABS  (Already fully typed in product-tab.ts)
------------------------------------------------------------ */
// 👇 Do NOT redefine ProductTab, IndustryItem, FeatureItem here.
// They now come directly from: /types/product-tab
// product_tabs will use ProductTab[] exactly.

export type {ProductTab}; // optional export if you want re-export


/* -----------------------------------------------------------
   CAROUSEL ITEMS
------------------------------------------------------------ */
export interface CarouselItem {
    id: number;
    title: string;
    desc: string;
    icon_key: ProductIconKey; // strongly typed
}

/* -----------------------------------------------------------
   USE CASE GRID
------------------------------------------------------------ */
export interface UseCase {
    id: number;
    title: string;
    desc: string;
    icon_key: ProductIconKey;
}


/* -----------------------------------------------------------
   INTEGRATIONS
------------------------------------------------------------ */
export interface IntegrationItem {
    id: number;
    name: string;
    desc: string;
    icon_key: IntegrationIconKey;
}

/* -----------------------------------------------------------
   LANGUAGES
------------------------------------------------------------ */
export interface LanguageItem {
    id: number;
    code: string;
    name: string;
    native: string;
    flag: string;
}

/* -----------------------------------------------------------
   MAIN HOMEPAGE PAYLOAD (Strapi Single Type)
------------------------------------------------------------ */
export interface HomePageData {
    hero_title: string;
    hero_subtitle: string;
    hero_description: string;
    hero_rotating_words: string[];
    hero_kpis: HeroKpi[];

    product_tabs: ProductTab[];
    carousel_items: CarouselItem[];
    use_cases: UseCase[];
    integrations: IntegrationItem[];
    languages: LanguageItem[];

    industries: IndustryItem[];   // ⭐ ADD THIS
}
