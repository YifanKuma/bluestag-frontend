// src/types/appdev.ts

export interface StoryPanel {
    title: string;
    description: string;
    icon: string;
}

export interface ShowcaseBullet {
    text: string;
}

export interface ShowcaseItem {
    title: string;
    note: string;
    bullets: string[];
}

export interface KPIItem {
    label: string;
    value: string;
}

export interface AppDevDataRaw {
    hero_badge?: string;
    hero_title?: string;
    hero_description?: string;

    story_panels?: Array<{ attributes?: StoryPanel } | StoryPanel>;

    showcases?: Array<{
        attributes?: {
            title: string;
            note: string;
            bullets?: Array<{ attributes?: ShowcaseBullet } | ShowcaseBullet>;
        };
        title?: string;
        note?: string;
        bullets?: Array<{ attributes?: ShowcaseBullet } | ShowcaseBullet>;
    }>;

    kpis?: Array<{ attributes?: KPIItem } | KPIItem>;

    cta_text?: string;
    cta_link?: string;
}

export interface AppDevSectionProps {
    data: { attributes?: AppDevDataRaw } | AppDevDataRaw;
}
