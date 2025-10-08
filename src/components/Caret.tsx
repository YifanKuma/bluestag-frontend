"use client";
import clsx from "clsx";

type Props = {
    variant?: "blink" | "shimmer";
    className?: string;
    width?: number;
    height?: number;
};

export default function Caret({
                                  variant = "blink",
                                  className,
                                  width = 2,
                                  height = 24,
                              }: Props) {
    return (
        <span
            aria-hidden
            className={clsx(
                "inline-block align-baseline bg-current",
                variant === "blink" ? "animate-caret-blink" : "animate-caret-shimmer",
                className
            )}
            style={{width, height}}
        />
    );
}