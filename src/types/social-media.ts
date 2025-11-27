/* -----------------------------------------------------------
   Social Media Section (Strapi single type)
----------------------------------------------------------- */

export interface KPIEntry {
    label: string;
    value: number;
    prefix?: string | null;
    suffix?: string | null;
}

export interface StepEntry {
    title: string;
    description: string;
}

export interface TemplateEntry {
    key: string;
    title: string;
    description: string;
    chips: string[];
}

export interface ChannelEntry {
    name: string;
    highlighted?: boolean;
}

export interface SocialMediaData {
    id: number;

    title: string;
    subtitle: string;
    description: string;

    kpis: KPIEntry[];
    steps: StepEntry[];
    templates: TemplateEntry[];

    performance_stats: KPIEntry[];
    channels: ChannelEntry[];

    json_preview: string;
}
