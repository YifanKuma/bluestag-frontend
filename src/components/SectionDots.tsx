"use client";
import {useState, useEffect} from "react";

const sections = ["home", "voice-ai", "industries", "pricing", "resources", "about", "contact"] as const;

export default function SectionDots() {
    const [active, setActive] = useState<typeof sections[number]>("home");

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id as typeof sections[number]);
                });
            },
            {rootMargin: "0px 0px -40% 0px", threshold: 0.4}
        );
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 pointer-events-none">
            {sections.map((s) => (
                <a
                    key={s}
                    href={`#${s}`}
                    className={`h-3 w-3 rounded-full pointer-events-auto transition ${
                        active === s ? "bg-cyan-400 scale-125" : "bg-white/30 hover:bg-cyan-300"
                    }`}
                    aria-label={s}
                />
            ))}
        </div>
    );
}