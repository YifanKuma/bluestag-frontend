// /src/data/integrations.ts

import type {LucideIcon} from "lucide-react";
import {
    Calendar,
    Database,
    Bot,
    Video,
    Mail,
    ShoppingBag,
    PhoneCall,
    FileText,
    Globe,
} from "lucide-react";

/**
 * These must match Strapi "integration.icon_key"
 */
export type IntegrationIconKey =
    | "calendly"
    | "drive"
    | "freshworks"
    | "zoom"
    | "hubspot"
    | "shopify"
    | "twilio"
    | "zendesk"
    | "sendbird"
    | "api";

/**
 * Map icon_key → Lucide Icon component
 */
export const INTEGRATION_ICON_MAP: Record<IntegrationIconKey, LucideIcon> = {
    calendly: Calendar,
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
