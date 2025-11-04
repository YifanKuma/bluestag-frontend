// GlassCard.tsx
"use client";
import clsx from "clsx";
import React from "react";

function isSafariUA() {
    if (typeof navigator === "undefined") return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
    safariLite?: boolean; // force non-blur for Safari
};

export default function GlassCard({className, safariLite, ...rest}: Props) {
    const safari = isSafariUA();
    const useLite = safariLite || safari;

    return (
        <div
            className={clsx(
                "rounded-3xl border border-white/10",
                useLite
                    ? // Safari-friendly: no backdrop-blur, use faint fill + inner glow
                    "bg-white/[0.04]"
                    : // Non-Safari: original look
                    "bg-white/10 backdrop-blur-lg",
                className
            )}
            style={{
                // avoid costly shadows; let the border + subtle fill do the work
                transform: "translateZ(0)",
                willChange: "transform, opacity",
            }}
            {...rest}
        />
    );
}