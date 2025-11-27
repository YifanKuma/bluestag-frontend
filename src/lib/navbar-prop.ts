import {getNavbar} from "@/lib/strapi";
import type {NavbarData} from "@/types/navbar";

export const navbarData: NavbarData | null = await getNavbar();