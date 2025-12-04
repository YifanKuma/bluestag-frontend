// components/NavbarServer.tsx
import {getNavbar} from "@/lib/strapi";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
    const navbar = await getNavbar();  // SERVER fetch
    return <NavbarClient navbar={navbar}/>;
}
