// src/data/industries-icon.ts

import {
    Building2,
    ShoppingCart,
    CreditCard,
    Truck,
    Headphones,
    HeartPulse,
    GraduationCap,
    CircleHelp,
} from "lucide-react";

import type {IndustryIconKey} from "@/types/product-tab";
import type {LucideIcon} from "lucide-react";

export const INDUSTRY_ICON_MAP: Record<IndustryIconKey | "default", LucideIcon> = {
    real_estate: Building2,
    ecommerce: ShoppingCart,
    finance: CreditCard,
    logistics: Truck,
    customer_support: Headphones,
    healthcare: HeartPulse,
    education: GraduationCap,

    default: CircleHelp,
};
