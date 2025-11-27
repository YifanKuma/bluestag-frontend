// src/data/usecase-carousel-icons.ts

import {
    Phone,
    UserCheck,
    DollarSign,
    Calendar,
    MessageCircle,
    CreditCard,
    Headphones,
    Sparkles,
} from "lucide-react";

export type UseCaseIconKey =
    | "phone"
    | "user-check"
    | "dollar"
    | "calendar"
    | "message"
    | "credit-card"
    | "headphones"
    | "sparkles";

// Strongly typed icon map
export const USECASE_ICON_MAP: Record<UseCaseIconKey, React.ComponentType<{ size?: number }>> = {
    phone: Phone,
    "user-check": UserCheck,
    dollar: DollarSign,
    calendar: Calendar,
    message: MessageCircle,
    "credit-card": CreditCard,
    headphones: Headphones,
    sparkles: Sparkles,
};
