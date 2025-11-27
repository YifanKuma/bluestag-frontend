"use client";

import type {ReactNode} from "react";
import "./globals.css";

import GlobalBackgrounds from "@/components/effects/GlobalBackgrounds";
import ClientErrorLogger from "@/components/ClientErrorLogger";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="relative min-h-screen text-white overflow-x-hidden">
        {/* Global error listener */}
        <ClientErrorLogger/>

        {/* 🌌 All full GPU effects enabled */}
        <GlobalBackgrounds/>

        {/* 🚀 Your app content */}
        <div className="relative z-10">
            {children}
        </div>
        </body>
        </html>
    );
}
