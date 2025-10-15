// /components/SubPageLayout.tsx
"use client";

import {ReactNode} from "react";
import clsx from "clsx";

type Props = {
    title: string;
    /** Optional small line above the title */
    eyebrow?: string;
    /** Optional line under the title (kept for older pages) */
    subtitle?: string;
    /** Optional description text under the title */
    description?: string;
    children: ReactNode;
    className?: string;
};

export default function SubPageLayout({
                                          title,
                                          eyebrow,
                                          subtitle,
                                          description,
                                          children,
                                          className,
                                      }: Props) {
    return (
        <main className={clsx("relative min-h-screen text-white pt-20", className)}>
            <header className="max-w-5xl mx-auto px-6">
                {eyebrow ? (
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">{eyebrow}</p>
                ) : null}

                <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">{title}</h1>

                {subtitle ? (
                    <p className="mt-3 text-white/70">{subtitle}</p>
                ) : null}

                {description ? (
                    <p className="mt-3 text-white/70">{description}</p>
                ) : null}
            </header>

            <div className="max-w-6xl mx-auto px-6">
                {children}
            </div>
        </main>
    );
}