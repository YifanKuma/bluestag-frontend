"use client";

import type {ReactNode} from "react";
import "./globals.css";

import GlobalBackgrounds from "@/components/effects/GlobalBackgrounds";
import ClientErrorLogger from "@/components/ClientErrorLogger";
import NavbarServer from "@/components/NavbarServer";
import Footer from "@/components/Footer";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="relative min-h-screen text-white overflow-x-hidden">

        <ClientErrorLogger />
        <GlobalBackgrounds />

        <NavbarServer />

        <div className="relative z-10 pt-16">
            {children}
        </div>

        <Footer />

        </body>
        </html>
    );
}
