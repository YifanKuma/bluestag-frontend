"use client";

import BackgroundSwitcher from "@/components/BackgroundSwitcher";
import BlueGlowBackground from "@/components/BlueGlowBackground";
import LogoGlowBackground from "@/components/LogoGlowBackground";
import CursorGlow from "@/components/CursorGlow";
import {usePerfMode} from "@/components/PerformanceProvider";

export default function GlobalBackgrounds() {
    const {mode} = usePerfMode();      // ✅ safe in client component
    const high = mode === "high";

    return (
        <>
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 z-0">
                    <BackgroundSwitcher/>
                </div>

                <div className="absolute inset-0 z-[1]">
                    {/* pass lowPerf to lighten work if you implemented it */}
                    <BlueGlowBackground lowPerf={!high}/>
                </div>

                {high && (
                    <div className="absolute inset-0 z-[2]">
                        <LogoGlowBackground/>
                    </div>
                )}
            </div>

            {high && (
                <div className="fixed inset-0 z-[5] pointer-events-none">
                    <CursorGlow lowPerf={!high}/>
                </div>
            )}
        </>
    );
}