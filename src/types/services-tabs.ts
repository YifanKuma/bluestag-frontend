// -------------------------------------------------------
// Strapi v5 Types for Services Tabs
// -------------------------------------------------------

export type ServiceTabKey =
    | "voice"
    | "video"
    | "chatbot"
    | "appdev"
    | "social";

export interface ServicesTab {
    id: number;
    key: ServiceTabKey;
    label: string;
    enabled?: boolean | null;
    order?: number | null;
}

export interface StrapiServicesTabsResponse {
    data: {
        id: number;
        tabs: ServicesTab[];
    } | null;
}
