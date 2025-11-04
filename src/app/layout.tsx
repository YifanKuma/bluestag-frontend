// app/layout.tsx
import type {ReactNode} from "react";
import "./globals.css";
import PerformanceProvider from "@/components/PerformanceProvider";
import GlobalBackgrounds from "@/components/GlobalBackgrounds"; // ← import client component

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="relative min-h-screen text-white overflow-x-hidden">
        <PerformanceProvider>
            <GlobalBackgrounds/>
            <div className="relative z-10">{children}</div>
        </PerformanceProvider>
        </body>
        </html>
    );
}