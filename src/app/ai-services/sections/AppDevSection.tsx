"use client";

import {JSX, useEffect, useRef, useState} from "react";
import {motion, useInView} from "framer-motion";
import {
    Rocket,
    Workflow,
    PencilRuler,
    ServerCog,
    Lock,
    RocketIcon,
    ArrowLeft,
    ArrowRight
} from "lucide-react";

/* -------------------------------------------------------
   GLOBAL WINDOW TYPES
------------------------------------------------------- */
declare global {
    interface Window {
        __appdev_scroll_left?: () => void;
        __appdev_scroll_right?: () => void;
    }
}

/* -------------------------------------------------------
   DATA TYPES (MATCH STRAPI RESPONSE)
------------------------------------------------------- */

interface StoryPanel {
    title?: string;
    description?: string;
    icon?: string;
    attributes?: StoryPanel; // sometimes Strapi wraps
}

interface ShowcaseBullet {
    text?: string;
    attributes?: ShowcaseBullet;
}

interface ShowcaseItem {
    title?: string;
    note?: string;
    bullets?: ShowcaseBullet[] | undefined;
    attributes?: {
        title?: string;
        note?: string;
        bullets?: ShowcaseBullet[];
    };
}

interface KPIItem {
    label?: string;
    value?: string;
    attributes?: KPIItem;
}

interface AppDevRaw {
    hero_badge?: string;
    hero_title?: string;
    hero_description?: string;

    story_panels?: StoryPanel[];
    showcases?: ShowcaseItem[];
    kpis?: KPIItem[];

    cta_text?: string;
    cta_link?: string;
}

interface AppDevSectionProps {
    data: { attributes?: AppDevRaw } | AppDevRaw;
}

/* -------------------------------------------------------
   ANIMATION PRESET
------------------------------------------------------- */
const fade = {
    hidden: {opacity: 0, y: 16},
    show: {opacity: 1, y: 0, transition: {duration: 0.6}}
};

/* -------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------- */
export default function AppDevSection({data}: AppDevSectionProps) {
    if (!data) return null;

    const root: AppDevRaw =
        "attributes" in data && data.attributes
            ? data.attributes
            : (data as AppDevRaw);


    /* -------------------------------------------------------
       HERO
    ------------------------------------------------------- */
    const hero = {
        badge: root.hero_badge ?? "From idea → App Store/Web",
        title: root.hero_title ?? "App Development, without the boring parts",
        description:
            root.hero_description ??
            "We craft production-ready apps with a design-first flow, typed APIs, and observability baked in."
    };

    /* -------------------------------------------------------
       STORY PANELS (normalize attributes)
    ------------------------------------------------------- */
    const storyPanels: StoryPanel[] = Array.isArray(root.story_panels)
        ? root.story_panels.map((p) => p.attributes ?? p)
        : [];

    /* -------------------------------------------------------
       SHOWCASES (normalize bullets + attributes)
    ------------------------------------------------------- */
    const showcases = Array.isArray(root.showcases)
        ? root.showcases.map((s) => {
            const x = s.attributes ?? s;

            const bullets = Array.isArray(x.bullets)
                ? x.bullets.map((b) => b.attributes?.text ?? b.text ?? "")
                : [];

            return {
                title: x.title ?? "",
                note: x.note ?? "",
                bullets
            };
        })
        : [];

    /* -------------------------------------------------------
       KPIs
    ------------------------------------------------------- */
    const kpis = Array.isArray(root.kpis)
        ? root.kpis.map((k) => k.attributes ?? k)
        : [];

    return (
        <section className="relative z-10 text-white">
            {/* Glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-20 -top-24 h-52 blur-3xl"
                style={{
                    background:
                        "radial-gradient(40% 60% at 50% 10%, rgba(56,189,248,.16), transparent 60%)"
                }}
            />

            {/* =====================================================
         HERO
      ===================================================== */}
            <motion.div
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{once: true}}
                className="mx-auto max-w-6xl px-4 text-center"
            >
        <span
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <Rocket className="h-3.5 w-3.5"/> {hero.badge}
        </span>

                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                    {hero.title}
                </h2>

                <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                    {hero.description}
                </p>
            </motion.div>

            {/* =====================================================
         STORY PANELS
      ===================================================== */}
            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)] gap-8 px-4">
                <aside className="md:sticky md:top-24 self-start">
                    <h3 className="text-xl font-medium">How we build</h3>
                    <p className="mt-2 text-sm text-white/70">A guided path → Scroll</p>
                    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"/>

                    <ul className="mt-6 space-y-3 text-sm text-white/70">
                        {storyPanels.map((p, idx) => (
                            <li key={idx}>• {p.description}</li>
                        ))}
                    </ul>
                </aside>

                <div className="space-y-6">
                    {storyPanels.map((p, idx) => (
                        <StoryPanel
                            key={idx}
                            icon={selectIcon(p.icon)}
                            title={p.title}
                            desc={p.description}
                        />
                    ))}
                </div>
            </div>

            {/* =====================================================
         SHOWCASE
      ===================================================== */}
            <div className="mx-auto mt-12 max-w-6xl px-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium">Recent patterns</h3>
                    <CarouselControls/>
                </div>

                <HorizontalShowcase showcases={showcases}/>
            </div>

            {/* =====================================================
         KPIs
      ===================================================== */}
            <motion.div
                variants={fade}
                initial="hidden"
                whileInView="show"
                className="mx-auto mt-12 max-w-6xl px-4"
            >
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                        {kpis.map((k, i) => (
                            <KPI key={i} label={k.label ?? ""} value={k.value ?? ""}/>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* CTA */}
            <div className="mx-auto max-w-6xl px-4">
                <motion.div
                    whileHover={{scale: 1.02}}
                    className="mt-10 mb-2 text-center"
                >
                    <a
                        href={root.cta_link ?? "/contact"}
                        className="inline-flex items-center gap-2 rounded-2xl border border-sky-400/40 bg-sky-400/10 px-5 py-3 text-sm font-medium hover:bg-sky-400/15"
                    >
                        <Workflow className="h-4 w-4"/>
                        {root.cta_text ?? "Plan my app"}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------
   ICON SELECTOR
------------------------------------------------------- */
function selectIcon(iconName?: string) {
    switch (iconName) {
        case "design":
            return <PencilRuler className="h-5 w-5"/>;
        case "server":
            return <ServerCog className="h-5 w-5"/>;
        case "secure":
            return <Lock className="h-5 w-5"/>;
        case "launch":
            return <RocketIcon className="h-5 w-5"/>;
        default:
            return <PencilRuler className="h-5 w-5"/>;
    }
}

/* -------------------------------------------------------
   STORY PANEL
------------------------------------------------------- */
function StoryPanel({
                        icon,
                        title,
                        desc
                    }: {
    icon: JSX.Element;
    title?: string;
    desc?: string;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, {amount: 0.45});

    return (
        <motion.article
            ref={ref}
            initial={{opacity: 0.4, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {opacity: 0.4, y: 10}}
            transition={{duration: 0.5}}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
            <div className="flex items-center gap-2 text-white/80">
                {icon}
                <h4 className="font-medium">{title}</h4>
            </div>
            <p className="mt-2 text-sm text-white/70">{desc}</p>
        </motion.article>
    );
}

/* -------------------------------------------------------
   HORIZONTAL SHOWCASE
------------------------------------------------------- */
function HorizontalShowcase({
                                showcases
                            }: {
    showcases: { title: string; note: string; bullets: string[] }[];
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [, force] = useState(0);

    useEffect(() => {
        window.__appdev_scroll_left = () => {
            ref.current?.scrollBy({
                left: -Math.round((ref.current?.clientWidth ?? 0) * 0.85),
                behavior: "smooth"
            });
            force((x) => x + 1);
        };

        window.__appdev_scroll_right = () => {
            ref.current?.scrollBy({
                left: Math.round((ref.current?.clientWidth ?? 0) * 0.85),
                behavior: "smooth"
            });
            force((x) => x + 1);
        };

        return () => {
            delete window.__appdev_scroll_left;
            delete window.__appdev_scroll_right;
        };
    }, []);

    return (
        <div
            ref={ref}
            className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
            style={{scrollBehavior: "smooth"}}
        >
            {showcases.map((s, i) => (
                <ShowcaseCard
                    key={i}
                    title={s.title}
                    note={s.note}
                    bullets={s.bullets}
                />
            ))}
        </div>
    );
}

/* -------------------------------------------------------
   SHOWCASE CARD
------------------------------------------------------- */
function ShowcaseCard({
                          title,
                          note,
                          bullets
                      }: {
    title: string;
    note: string;
    bullets: string[];
}) {
    return (
        <motion.div
            whileHover={{y: -4}}
            className="snap-center shrink-0 w-[85%] md:w-[55%] lg:w-[40%] rounded-2xl border border-white/10 bg-white/5 p-6"
        >
            <div className="text-sm text-white/60">{note}</div>
            <h4 className="mt-1 text-lg font-semibold">{title}</h4>

            <ul className="mt-3 space-y-1.5 text-sm text-white/70">
                {bullets.map((b, i) => (
                    <li key={i}>• {b}</li>
                ))}
            </ul>
        </motion.div>
    );
}

/* -------------------------------------------------------
   KPI
------------------------------------------------------- */
function KPI({label, value}: { label: string; value: string }) {
    return (
        <div className="px-2 py-3">
            <div className="text-2xl font-semibold">{value}</div>
            <div className="mt-0.5 text-xs text-white/60">{label}</div>
        </div>
    );
}

/* -------------------------------------------------------
   ARROWS
------------------------------------------------------- */
function CarouselControls() {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => window.__appdev_scroll_left?.()}
                className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
            >
                <ArrowLeft className="h-4 w-4"/>
            </button>

            <button
                onClick={() => window.__appdev_scroll_right?.()}
                className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
            >
                <ArrowRight className="h-4 w-4"/>
            </button>
        </div>
    );
}
