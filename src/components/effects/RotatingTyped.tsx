"use client";

import React, {useEffect, useRef, useState} from "react";

type Props = {
    words: string[];
    typingMs?: number;     // per character
    backspaceMs?: number;  // per character
    holdMs?: number;       // pause before backspacing
    loop?: boolean;
    className?: string;
    cursor?: string;
};

export default function RotatingTyped({
                                          words,
                                          typingMs = 80,
                                          backspaceMs = 40,
                                          holdMs = 700,
                                          loop = true,
                                          className,
                                          cursor = "|",
                                      }: Props) {
    const [i, setI] = useState(0);                // which word
    const [text, setText] = useState("");         // shown substring
    const [phase, setPhase] = useState<"typing" | "holding" | "backspacing">("typing");
    const timer = useRef<number | null>(null);

    useEffect(() => {
        const clear = () => {
            if (timer.current) window.clearTimeout(timer.current);
        };

        const word = words[i % words.length];

        if (phase === "typing") {
            if (text.length < word.length) {
                timer.current = window.setTimeout(() => setText(word.slice(0, text.length + 1)), typingMs);
            } else {
                timer.current = window.setTimeout(() => setPhase("holding"), holdMs);
            }
        } else if (phase === "holding") {
            timer.current = window.setTimeout(() => setPhase("backspacing"), holdMs);
        } else if (phase === "backspacing") {
            if (text.length > 0) {
                timer.current = window.setTimeout(() => setText(text.slice(0, -1)), backspaceMs);
            } else {
                if (!loop && i + 1 >= words.length) return clear();
                setI((v) => (v + 1) % words.length);
                setPhase("typing");
            }
        }

        return clear;
    }, [text, phase, i, words, typingMs, backspaceMs, holdMs, loop]);

    return (
        <span className={className} aria-live="polite">
      {text}
            <span className="animate-pulse">{cursor}</span>
    </span>
    );
}