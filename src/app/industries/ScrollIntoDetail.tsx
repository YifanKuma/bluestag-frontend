"use client";
import {useEffect} from "react";

function isInViewport(el: HTMLElement, margin = 0) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    // consider partially visible + margin
    return r.top >= -margin && r.top <= vh - margin;
}

export default function ScrollIntoDetail({selected}: { selected?: string | null }) {
    useEffect(() => {
        if (!selected) return;

        let cancelled = false;
        let tries = 0;

        const NAV_OFFSET = 80; // adjust for your fixed header height (pt-20 ≈ 80px)
        const tryScroll = () => {
            if (cancelled) return;
            const el = document.getElementById("industry-detail") as HTMLElement | null;

            if (!el || el.offsetHeight === 0) {
                if (++tries < 60) requestAnimationFrame(tryScroll);
                return;
            }

            if (!isInViewport(el, NAV_OFFSET)) {
                const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
                window.scrollTo({top, behavior: "smooth"});
            }
        };

        const t = setTimeout(() => requestAnimationFrame(tryScroll), 120);
        return () => {
            cancelled = true;
            clearTimeout(t);
        };
    }, [selected]);

    return null;
}