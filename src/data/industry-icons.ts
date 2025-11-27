// src/data/industry-icons.ts

import {
    Building2,
    GraduationCap,
    Stethoscope,
    Package,
    Headphones,
    ShoppingBag,   // retail
    Banknote,       // finance
    CircleHelp,     // fallback
} from "lucide-react";

import type {LucideIcon} from "lucide-react";
import type {IndustryIconKey} from "@/types/industries";

export const ICON_MAP: Record<IndustryIconKey | "default", LucideIcon> = {
    real_estate: Building2,
    education: GraduationCap,
    healthcare: Stethoscope,
    logistics: Package,
    contact_center: Headphones,
    retail: ShoppingBag,
    finance: Banknote,
    default: CircleHelp,
};
