// src/types/about.ts
export interface VisionItem {
    id: number;
    label: string;
}

export interface AboutPageData {
    id: number;

    story_title: string;
    story_description: string;
    story_image: {
        url: string;
    };
    story_image_caption_title: string;
    story_image_caption_subtitle: string;

    vision_title: string;
    vision_description: string;
    vision_items: VisionItem[];

    cta_title: string;
    cta_description: string;
    cta_button_text: string;
    cta_button_link: string;
}
