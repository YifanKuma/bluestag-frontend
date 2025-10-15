import type {ReactNode} from "react";
import "./globals.css";

import BackgroundSwitcher from "@/components/BackgroundSwitcher";
import BlueGlowBackground from "@/components/BlueGlowBackground";
import LogoGlowBackground from "@/components/LogoGlowBackground";
import CursorGlow from "@/components/CursorGlow";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="relative min-h-screen text-white overflow-x-hidden">
        {/* 🩵 Global layered backgrounds */}
        <div className="fixed inset-0 z-0">
            {/* 🔹 1. Base gradient background */}
            <BackgroundSwitcher/>

            {/* 🔹 2. Floating blue blobs */}
            <BlueGlowBackground/>

            {/* 🔹 3. Glowing Bluestag logo — appears on ALL pages */}
            <LogoGlowBackground/>
        </div>

        {/* 💫 Cursor-following glow (on top) */}
        <div className="fixed inset-0 z-[5] pointer-events-none">
            <CursorGlow/>
        </div>

        {/* 🧭 Page content */}
        <div className="relative z-10">
            {children}
        </div>
        </body>
        </html>
    );
}