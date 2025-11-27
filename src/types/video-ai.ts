// --------------------------------------
// ICON ENUM TYPE
// --------------------------------------
export type VideoAIIconName =
    | "Gauge"
    | "Clock"
    | "BadgeCheck"
    | "Layers"
    | "Wand2"
    | "Captions"
    | "Video"
    | "Users"
    | "GraduationCap"
    | "Presentation";

// --------------------------------------
// KPI Items
// --------------------------------------
export interface KPIItem {
    id: number;
    kpi: string;
    label: string;
    icon: "Gauge" | "Clock" | "BadgeCheck" | "Layers";
}

// --------------------------------------
// Feature Cards
// --------------------------------------
export interface FeatureItem {
    id: number;
    icon: "Wand2" | "Captions" | "Video";
    title: string;
    description: string;
    badge: string;
}

// --------------------------------------
// Use Cases
// --------------------------------------
export interface UseCaseItem {
    id: number;
    icon: "Users" | "GraduationCap" | "Presentation";
    title: string;
    description: string;
    badge: string;
}

// --------------------------------------
// Showcase Item
// --------------------------------------
export interface ShowcaseItem {
    id: number;
    icon: VideoAIIconName;
    badge: string;
    title: string;
    description: string;
    ratio: string;
    length: string;
}

// --------------------------------------
// Flow Steps
// --------------------------------------
export interface FlowStep {
    id: number;
    step_number: string;
    title: string;
    text: string;
}

// --------------------------------------
// MAIN VIDEO AI SECTION
// --------------------------------------
export interface VideoAIData {
    id: number;

    badge_label: string;
    badge_state: "Coming soon" | "New";

    title: string;
    subtitle: string;

    kpi_item: KPIItem[];
    features: FeatureItem[];
    usecases: UseCaseItem[];
    showcase: ShowcaseItem[];
    flow_steps: FlowStep[];

    cta_title: string;
    cta_description: string;
    cta_button_label: string;
    cta_button_link: string;
}
