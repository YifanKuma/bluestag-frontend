"use client";

import dynamic from "next/dynamic";

// Always load all effects
const BackgroundSwitcher = dynamic(() => import("@/components/effects/BackgroundSwitcher"), {ssr: false});
const BlueGlowBackground = dynamic(() => import("@/components/effects/BlueGlowBackground"), {ssr: false});
const LogoGlowBackground = dynamic(() => import("@/components/effects/LogoGlowBackground"), {ssr: false});
const CursorGlow = dynamic(() => import("@/components/effects/CursorGlow"), {ssr: false});

export default function GlobalBackgrounds() {
    return (
        <div className="fixed inset-0 pointer-events-none -z-10">
            <BackgroundSwitcher/>
            <BlueGlowBackground/>
            <LogoGlowBackground/>
            <CursorGlow lowPerf={false}/>
        </div>
    );
}
