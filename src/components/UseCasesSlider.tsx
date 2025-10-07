"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

type Slide = {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    stat1: string; stat1Label: string;
    stat2: string; stat2Label: string;
    partners: string[];
};

// === Your data (1 object = 1 card) ===
const BASE: Slide[] = [
    {
        id: "appointments", icon: "📞", title: "Appointment Booking Calls",
        subtitle: "Identify patient needs and screen appointment preferences. Automate scheduling for better conversions.",
        stat1: "180K+", stat1Label: "Appointment booking calls processed",
        stat2: "15", stat2Label: "Active healthcare clients",
        partners: ["Practo"]
    },
    {
        id: "support", icon: "💬", title: "Customer Support",
        subtitle: "Identify potential issues and help customers. Automate operations for better customer experience.",
        stat1: "100K+", stat1Label: "Total calls done",
        stat2: "5", stat2Label: "Ongoing projects",
        partners: ["CRED", "Practo"]
    },
    {
        id: "lead", icon: "🧲", title: "Lead Generation",
        subtitle: "Identify potential clients and screen prospects. Automate outreach for better conversions.",
        stat1: "3M+", stat1Label: "Total calls done",
        stat2: "5", stat2Label: "Ongoing projects",
        partners: ["Shiprocket", "GrowthSchool"]
    },
    {
        id: "loan", icon: "💳", title: "Loan Collection",
        subtitle: "Identify overdue accounts and screen payment capabilities. Automate follow-ups for better recovery rates.",
        stat1: "150K+", stat1Label: "Collection calls completed",
        stat2: "12", stat2Label: "Active recovery campaigns",
        partners: ["CRED", "Aavas Financiers", "Lorien Finance"]
    },
    {
        id: "delivery", icon: "📦", title: "Last Mile Delivery Calls",
        subtitle: "Identify delivery windows and screen recipient availability. Automate coordination for better success rates.",
        stat1: "200K+", stat1Label: "Delivery coordination calls handled",
        stat2: "8", stat2Label: "Active logistics partnerships",
        partners: ["Shiprocket", "Freight Tiger"]
    },
];

const REPEAT = 5;          // duplicate list to enable seamless looping
const AUTO_MS = 3000;

export default function CenterCarousel() {
    // Build extended array (no empty edges)
    const EXT = useMemo(
        () => Array.from({length: BASE.length * REPEAT}, (_, i) => BASE[i % BASE.length]),
        []
    );
    const BASE_LEN = BASE.length;
    const START = BASE_LEN * Math.floor(REPEAT / 2);

    const wrapIdx = (i: number) => (i + EXT.length) % EXT.length;

    const viewportRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);
    const [idx, setIdx] = useState(START); // active index in EXT
    const [anim, setAnim] = useState(true);
    const hoverRef = useRef(false);

    // Center helper (centers any item using real DOM sizes)
    const centerTo = (i: number, smooth = true) => {
        const vp = viewportRef.current;
        const el = itemRefs.current[i];
        if (!vp || !el) return;

        const elRect = el.getBoundingClientRect();
        const vpRect = vp.getBoundingClientRect();
        const currentScroll = vp.scrollLeft;
        const target =
            currentScroll +
            (elRect.left + elRect.width / 2) -
            (vpRect.left + vpRect.width / 2);

        vp.scrollTo({left: target, behavior: smooth ? "smooth" : "auto"});
    };

    // Initial center
    useEffect(() => {
        // allow layout to settle
        const t = setTimeout(() => centerTo(idx, false), 0);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Auto-advance
    useEffect(() => {
        const tick = () => {
            if (!hoverRef.current && document.visibilityState === "visible") {
                go(+1);
            }
        };
        const id = setInterval(tick, AUTO_MS);
        return () => clearInterval(id);
    }, []);

    // Jump back to middle batch when near edges (no visual flash)
    useEffect(() => {
        const leftGuard = BASE_LEN * 1;
        const rightGuard = BASE_LEN * (REPEAT - 2);
        if (idx <= leftGuard || idx >= rightGuard) {
            const logical = START + (idx % BASE_LEN + BASE_LEN) % BASE_LEN;
            // after smooth scroll ends, jump to logical twin without animation
            const t = setTimeout(() => {
                setAnim(false);
                setIdx(logical);
                centerTo(logical, false);
                requestAnimationFrame(() => setAnim(true));
            }, 360);
            return () => clearTimeout(t);
        }
    }, [idx, BASE_LEN, START]);

    const go = (delta: number) => {
        const next = wrapIdx(idx + delta);
        setIdx(next);
        centerTo(next, true);
    };

    return (
        <section
            className="relative mx-auto max-w-7xl px-4"
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
        >
            {/* Viewport */}
            <div
                ref={viewportRef}
                className={`flex items-stretch overflow-x-hidden scroll-smooth`}
            >
                {/* Track */}
                <div className={`flex items-stretch gap-6 ${anim ? "" : ""}`}>
                    {EXT.map((s, i) => {
                        // distance from active (for shrink/fade)
                        const d = Math.abs(i - idx);
                        const isActive = d === 0;
                        const isNear = d === 1;

                        const scaleCls = isActive ? "scale-105" : isNear ? "scale-95" : "scale-90";
                        const opacityCls = isActive ? "opacity-100" : isNear ? "opacity-80" : "opacity-60";
                        const blurCls = isActive ? "" : isNear ? "" : "blur-[1px]";
                        const pointer = d > 5 ? "pointer-events-none invisible" : ""; // cull far items

                        return (
                            <div
                                key={`${s.id}-${i}`}
                                ref={(el) => {
                                    if (el) itemRefs.current[i] = el;
                                }}
                                className={`snap-center shrink-0 transition-all duration-500 ease-out ${scaleCls} ${opacityCls} ${blurCls} ${pointer}`}
                            >
                                {/* Card width purely via Tailwind, responsive: */}
                                <div className="w-[280px] sm:w-[320px] lg:w-[360px]">
                                    <Card slide={s}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Arrows */}
            <button
                onClick={() => go(-1)}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-50"
            >
                <ChevronLeft/>
            </button>
            <button
                onClick={() => go(+1)}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-50"
            >
                <ChevronRight/>
            </button>
        </section>
    );
}

function Card({slide: s}: { slide: Slide }) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-gray-100">
            <div className="mb-4 text-4xl">{s.icon}</div>
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{s.subtitle}</p>

            <div className="mt-4 flex gap-8">
                <Stat value={s.stat1} label={s.stat1Label}/>
                <Stat value={s.stat2} label={s.stat2Label}/>
            </div>

            <button className="mt-5 rounded-lg bg-black px-3 py-2 text-white text-sm">
                ▶ Live Call
            </button>

            <div className="mt-4 text-sm font-medium text-gray-700">
                {s.partners.join(" • ")}
            </div>
        </div>
    );
}

function Stat({value, label}: { value: string; label: string }) {
    return (
        <div>
            <div className="text-2xl font-extrabold">{value}</div>
            <div className="text-gray-500 text-xs">{label}</div>
        </div>
    );
}