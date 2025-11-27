import {
    PhoneCall,
    MessageSquare,
    Bot,
    Headset,
    SatelliteDish,
    Mic,
    AlarmCheck,
    Cpu,
    Globe,
    Cloud,
    Sparkles,
    Settings,

    ShieldCheck,
    Brain,
    Database,
    LayoutDashboard,
    Link2,
    Contact,
} from "lucide-react";

import type {LucideIcon} from "lucide-react";

// ⭐ All icon keys MUST match Strapi "icon_key" strings exactly.
export const ICON_MAP: Record<string, LucideIcon> = {
    // --- Communication / AI ---
    phone_call: PhoneCall,
    sms: MessageSquare,
    ai_bot: Bot,
    microphone: Mic,

    // --- Business / Support ---
    support: Headset,
    broadcast: SatelliteDish,

    // --- System / Functional ---
    verified: AlarmCheck,
    compute: Cpu,
    global: Globe,
    cloud: Cloud,
    magic: Sparkles,
    settings: Settings,

    // --- Extra icons from pricing/addons ---
    shield_check: ShieldCheck,
    brain: Brain,
    database: Database,
    dashboard: LayoutDashboard,
    link: Link2,
    contact: Contact,

    // fallback
    default: PhoneCall,
};
