import {
    PhoneCall, Headphones, Home, DollarSign, CreditCard,
    GraduationCap, Heart, Briefcase, Users,
    Rocket, ShieldCheck, Globe, Plug, Zap, Brain,
    Calendar, Database, Bot, Video, Mail, ShoppingBag,
    FileText
} from "lucide-react";

import type {LucideIcon} from "lucide-react";

// 🚀 FIXED: no more `any`
export const ICONS: Record<string, LucideIcon> = {
    // Carousel + Use Case
    phone_call: PhoneCall,
    customer_service: Headphones,
    real_estate: Home,
    investment: DollarSign,
    payment: CreditCard,
    education: GraduationCap,
    wellbeing: Heart,
    recruitment: Briefcase,
    community: Users,

    // Why Choose
    rocket: Rocket,
    shield: ShieldCheck,
    globe: Globe,
    plug: Plug,
    zap: Zap,
    brain: Brain,

    // Integrations
    calendar: Calendar,
    drive: Database,
    freshworks: Bot,
    zoom: Video,
    hubspot: Mail,
    shopify: ShoppingBag,
    twilio: PhoneCall,
    zendesk: FileText,
    sendbird: PhoneCall,
    api: Globe,
};
