// app/layout.tsx
import type {Metadata, Viewport} from "next";
import "./globals.css";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"], variable: "--font-inter"});

export const metadata: Metadata = {
    title: "BLUESTAG.AI — Voice AI for Aussie SMBs",
    description:
        "Modern Voice AI for Australian small businesses: sales, payments, customer service, and more.",
};

export const viewport: Viewport = {
    themeColor: "#0b1020",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full">
        <body className={`${inter.variable} min-h-screen antialiased`}>
        {children}
        </body>
        </html>
    );
}