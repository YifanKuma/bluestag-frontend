"use client";
import clsx from "clsx";
import React, {useEffect, useState} from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    safariLite?: boolean;
};

export default function GlassCard({className, safariLite, ...rest}: Props) {
    const [isSafari, setIsSafari] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();
        setIsSafari(/safari/.test(ua) && !/chrome|android/.test(ua));
    }, []);

    const useLite = safariLite || isSafari;

    return (
        <div
            className={clsx(
                "rounded-3xl border border-white/10",
                useLite
                    ? "bg-white/[0.04]" // ✅ Safari-safe fallback
                    : "bg-white/10 backdrop-blur-lg",
                className
            )}
            style={{
                transform: "translateZ(0)",
                willChange: "transform, opacity",
            }}
            {...rest}
        />
    );
}
