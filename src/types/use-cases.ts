/* -----------------------------------------------------------
   Use Case Item (Strapi collection type)
----------------------------------------------------------- */

export interface UseCaseItem {
    id: number;

    title: string;
    description?: string | null;

    // Optional icon key (if later you want icons)
    icon_key?: string | null;

    // Slug (if you added it in Strapi)
    slug?: string | null;

    // You may have additional fields depending on your Strapi model
    // (e.g., bullet points, media, CTA, etc.)
    bullet_points?: string[] | null;

    // If you have an image/media relation:
    image?: {
        url: string;
        alternativeText?: string | null;
    } | null;
}
