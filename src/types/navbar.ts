export interface NavLink {
    id: number;
    label: string;
    href: string;
}

export interface MediaData {
    id: number;
    url: string;
    mime: string;
    width?: number;
    height?: number;
}

export interface NavbarData {
    id: number;
    logo: MediaData | null;
    nav_link: NavLink[];
    cta_label?: string | null;
    cta_href?: string | null;
    enable_scroll_style?: boolean;
}
