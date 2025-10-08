// components/GlassCard.tsx
import * as React from "react";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
    children: React.ReactNode;
};

export default function GlassCard({
                                      className = "",
                                      children,
                                      ...rest
                                  }: GlassCardProps) {
    return (
        <div
            {...rest}
            className={`rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl ${className}`}
        >
            {children}
        </div>
    );
}