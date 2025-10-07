"use client";

import React, {useEffect, useRef, useState} from "react";

type Props = {
    words: string[];
    typingMs?: number; // per character typing speed
    backspaceMs?: number; // per character backspacing speed
    holdMs?: number; // delay before backspacing
    loop?: boolean;
    className?: string;
    cursor?: string;
};

export default function RotatingTyped({
                                          words,
                                          typingMs = 90,
                                          backspaceMs = 40,
                                          holdMs = 800,
                                          loop = true,
                                          className,
                                          cursor = "|",
                                      }: Props) {
    const [index, setIndex] = useState(0); // which word in list
    const [text, setText] = useState(""); // currently displayed text
    const [phase, setPhase] = useState<"typing" | "holding" | "backspacing">(
        "typing"
    );
    const timer = useRef<number | null>(null);

    useEffect(() => {
        const clear = () => {
            if (timer.current) window.clearTimeout(timer.current);
        };

        const currentWord = words[index % words.length];

        if (phase === "typing") {
            if (text.length < currentWord.length) {
                timer.current = window.setTimeout(() => {
                    setText(currentWord.slice(0, text.length + 1));
                }, typingMs);
            } else {
                timer.current = window.setTimeout(() => setPhase("holding"), holdMs);
            }
        } else if (phase === "holding") {
            timer.current = window.setTimeout(() => setPhase("backspacing"), holdMs);
        } else if (phase === "backspacing") {
            if (text.length > 0) {
                timer.current = window.setTimeout(() => {
                    setText(text.slice(0, -1));
                }, backspaceMs);
            } else {
                if (!loop && index + 1 >= words.length) return clear();
                setIndex((v) => (v + 1) % words.length);
                setPhase("typing");
            }
        }

        return clear;
    }, [text, phase, index, words, typingMs, backspaceMs, holdMs, loop]);

    return (
        <span className={`inline-flex items-center ${className}`} aria-live="polite">
      <span>{text}</span>
      <span className="animate-blink ml-0.5">{cursor}</span>
    </span>
    );
}