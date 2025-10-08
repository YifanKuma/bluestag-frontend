// app/layout.tsx  (server component is fine)
import type {ReactNode} from "react";
import "./globals.css";
import BackgroundSwitcher from "@/components/BackgroundSwitcher";
import BlueGlowBackground from "@/components/BlueGlowBackground";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen text-white">
        {/* Fixed, site-wide backgrounds */}
        <BackgroundSwitcher/>
        <BlueGlowBackground/>

        {/* All pages render above the backgrounds */}
        <div className="relative z-10">{children}</div>
        </body>
        </html>
    );
}