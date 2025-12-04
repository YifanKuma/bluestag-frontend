import { getNavbar } from "@/lib/strapi";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
    const data = await getNavbar();

    if (!data) return null;

    // Fix: prepend full URL on the server
    const logoUrl = data.logo?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.logo.url}`
        : null;

    return <NavbarClient navbar={{ ...data, logoUrl }} />;
}
