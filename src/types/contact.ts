export interface ContactPageData {
    intro_title: string;
    intro_description: string;

    email: string;
    phone: string;
    location: string;

    hours_label: string;
    hours_description: string;

    banner_title: string;
    banner_caption: string;
    banner_image: { url: string };

    services: string[];

    form_submit_email: string;
    cc_emails: string[];
}
