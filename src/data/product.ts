import {
    Phone,
    CreditCard,
    Headphones,
    Sparkles,
    Mic,
    Video,
    MessageCircle,
    AppWindow,
    Share2,
    Briefcase,
    Building2,
    GraduationCap,
    HeartHandshake,
    Users,
    LineChart,
    Rocket,
    Shield,
    Globe,
    Plug,
    Zap,
    Brain,
    LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------
   Unified icon map (product icons + use case icons)
------------------------------------------------------------ */
export const PRODUCT_ICON_MAP: Record<string, LucideIcon> = {
    // Product tabs
    voice: Mic,
    video: Video,
    chatbot: MessageCircle,
    app: AppWindow,
    social: Share2,

    phone: Phone,
    "credit-card": CreditCard,
    headphones: Headphones,
    sparkles: Sparkles,

    // Use Case icons (your original)
    phone_call: Phone,
    customer_service: Headphones,
    real_estate: Building2,
    investment: LineChart,
    payment: CreditCard,
    education: GraduationCap,
    wellbeing: HeartHandshake,
    recruitment: Briefcase,
    community: Users,

    // ⭐ NEW icons from Strapi (your missing ones)
    rocket: Rocket,
    shield: Shield,
    globe: Globe,
    plug: Plug,
    zap: Zap,
    brain: Brain,

    // fallback
    default: Sparkles,
};
