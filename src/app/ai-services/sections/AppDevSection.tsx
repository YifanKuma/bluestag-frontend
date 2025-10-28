"use client";
import {useEffect, useRef, useState} from "react";
import {motion, useInView} from "framer-motion";
import {Rocket, Workflow, PencilRuler, ServerCog, Lock, RocketIcon, ArrowLeft, ArrowRight} from "lucide-react";

/** ───────────────────────── Global window augmentation (types for our scroll helpers) */
declare global {
    interface Window {
        __appdev_scroll_left?: () => void;
        __appdev_scroll_right?: () => void;
    }
}

/* ───────────────────────── Anim helpers */
const fade = {hidden: {opacity: 0, y: 16}, show: {opacity: 1, y: 0, transition: {duration: .6}}};

/* ───────────────────────── Main */
export default function AppDevSection() {
    return (
        <section className="relative z-10 text-white">
            {/* ambient halo */}
            <div aria-hidden className="pointer-events-none absolute -inset-x-20 -top-24 h-52 blur-3xl"
                 style={{background: "radial-gradient(40% 60% at 50% 10%, rgba(56,189,248,.16), transparent 60%)"}}/>

            {/* Hero */}
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{once: true, margin: "-10% 0px"}}
                        className="mx-auto max-w-6xl px-4 text-center">
        <span
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <Rocket className="h-3.5 w-3.5"/> From idea → App Store/Web
        </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                    App Development, without the boring parts
                </h2>
                <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                    We craft production-ready apps with a design-first flow, typed APIs, and observability baked in.
                </p>
            </motion.div>

            {/* Sticky story rail (no grid) */}
            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)] gap-8 px-4">
                <aside className="md:sticky md:top-24 self-start">
                    <h3 className="text-xl font-medium">How we build</h3>
                    <p className="mt-2 text-sm text-white/70">
                        A guided path from discovery to launch. Scroll the panels →
                    </p>
                    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"/>
                    <ul className="mt-6 space-y-3 text-sm text-white/70">
                        <li>• Collaborative discovery & user journeys</li>
                        <li>• System design & component library</li>
                        <li>• Type-safe APIs & CI/CD</li>
                        <li>• Analytics, A/B tests, and rollout</li>
                    </ul>
                </aside>

                <div className="space-y-6">
                    <StoryPanel
                        icon={<PencilRuler className="h-5 w-5"/>}
                        title="Discover → Design"
                        desc="Workshops, success metrics, and a living UI kit. Figma components map 1:1 to code, so handoff is instant."
                    />
                    <StoryPanel
                        icon={<ServerCog className="h-5 w-5"/>}
                        title="Build → Integrate"
                        desc="Next.js + TypeScript + Postgres/Prisma, with Stripe, Twilio/WhatsApp, and Auth.js wired with tests."
                    />
                    <StoryPanel
                        icon={<Lock className="h-5 w-5"/>}
                        title="Secure → Observe"
                        desc="Role-based auth, rate-limits, logging, tracing, and dashboards. Incidents get signals, not noise."
                    />
                    <StoryPanel
                        icon={<RocketIcon className="h-5 w-5"/>}
                        title="Launch → Iterate"
                        desc="Feature flags, staged rollouts, and experiment loops so the app gets better every week."
                    />
                </div>
            </div>

            {/* Horizontal case showcase (scroll-snap + buttons) */}
            <div className="mx-auto mt-12 max-w-6xl px-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium">Recent patterns</h3>
                    <CarouselControls/>
                </div>
                <HorizontalShowcase/>
            </div>

            {/* KPIs (not cards — a single expressive bar) */}
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{once: true}}
                        className="mx-auto mt-12 max-w-6xl px-4">
                <div
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/[.03] p-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                        <KPI label="Avg. build time" value="6–10 weeks"/>
                        <KPI label="Crash-free sessions" value="99.8%"/>
                        <KPI label="P95 API latency" value="< 180ms"/>
                        <KPI label="Client NPS" value="+62"/>
                    </div>
                    <div aria-hidden className="pointer-events-none absolute inset-0"
                         style={{background: "radial-gradient(120px 120px at 20% 50%, rgba(56,189,248,.12), transparent 60%)"}}/>
                </div>
            </motion.div>

            {/* CTA */}
            <div className="mx-auto max-w-6xl px-4">
                <motion.div whileHover={{scale: 1.02}} className="mt-10 mb-2 text-center">
                    <a href="/contact"
                       className="inline-flex items-center gap-2 rounded-2xl border border-sky-400/40 bg-sky-400/10 px-5 py-3 text-sm font-medium hover:border-sky-300/60 hover:bg-sky-400/15">
                        <Workflow className="h-4 w-4"/> Plan my app
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

/* ───────────────────────── Pieces (all non-grid) */

function StoryPanel({icon, title, desc}: { icon: React.ReactNode; title: string; desc: string }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, {amount: 0.45, margin: "-20% 0px"});
    return (
        <motion.article
            ref={ref}
            initial={{opacity: .4, y: 10}}
            animate={inView ? {opacity: 1, y: 0} : {opacity: .4, y: 10}}
            transition={{duration: .5}}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
        >
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-sky-400/50 to-indigo-400/50"/>
            <div className="ml-4">
                <div className="flex items-center gap-2 text-white/80">
                    {icon}<h4 className="font-medium">{title}</h4>
                </div>
                <p className="mt-2 text-sm text-white/70">{desc}</p>
            </div>
        </motion.article>
    );
}

function HorizontalShowcase() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [, force] = useState(0); // ignore state value; only use setter to force re-render

    // Expose controls via window for the small arrows in the header
    useEffect(() => {
        window.__appdev_scroll_left = () => {
            const el = ref.current;
            if (!el) return;
            el.scrollBy({left: -Math.round(el.clientWidth * 0.85), behavior: "smooth"});
            force(x => x + 1);
        };
        window.__appdev_scroll_right = () => {
            const el = ref.current;
            if (!el) return;
            el.scrollBy({left: Math.round(el.clientWidth * 0.85), behavior: "smooth"});
            force(x => x + 1);
        };

        // cleanup to avoid leaking globals on fast nav
        return () => {
            delete window.__appdev_scroll_left;
            delete window.__appdev_scroll_right;
        };
    }, []);

    return (
        <div
            ref={ref}
            className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none]"
            style={{scrollBehavior: "smooth"}}
        >
            {/* hide scrollbar on webkit */}
            <style>{`.hide-scroll::-webkit-scrollbar{display:none}`}</style>

            <ShowcaseCard
                title="Booking + Payments"
                note="Stripe, taxes, refunds"
                bullets={["2-step booking flow", "Apple/Google Pay", "PCI-aware endpoints"]}
            />
            <ShowcaseCard
                title="Chat + Notifications"
                note="WhatsApp/SMS + email"
                bullets={["Unified inbox", "Templates & variables", "Read receipts"]}
            />
            <ShowcaseCard
                title="Admin & Analytics"
                note="RBAC + metrics"
                bullets={["Role-based auth", "Events pipeline", "A/B test switches"]}
            />
            <ShowcaseCard
                title="Offline-first Mobile"
                note="Sync + conflict-free"
                bullets={["Local cache", "Background sync", "Push actions"]}
            />
        </div>
    );
}

function ShowcaseCard({title, note, bullets}: { title: string; note: string; bullets: string[] }) {
    return (
        <motion.div
            whileHover={{y: -4}}
            className="snap-center shrink-0 w-[85%] md:w-[55%] lg:w-[40%] rounded-2xl border border-white/10 bg-white/5 p-6"
        >
            <div className="text-sm text-white/60">{note}</div>
            <h4 className="mt-1 text-lg font-semibold">{title}</h4>
            <ul className="mt-3 space-y-1.5 text-sm text-white/70">
                {bullets.map((b) => <li key={b}>• {b}</li>)}
            </ul>
        </motion.div>
    );
}

function KPI({label, value}: { label: string; value: string }) {
    return (
        <div className="px-2 py-3">
            <div className="text-2xl font-semibold">{value}</div>
            <div className="mt-0.5 text-xs text-white/60">{label}</div>
        </div>
    );
}

function CarouselControls() {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => window.__appdev_scroll_left?.()}
                className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                aria-label="Scroll left"
            >
                <ArrowLeft className="h-4 w-4"/>
            </button>
            <button
                onClick={() => window.__appdev_scroll_right?.()}
                className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                aria-label="Scroll right"
            >
                <ArrowRight className="h-4 w-4"/>
            </button>
        </div>
    );
}