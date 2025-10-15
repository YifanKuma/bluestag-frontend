"use client";
import {ReactNode, useRef} from "react";

export default function Magnetic({children, strength = 20}: { children: ReactNode; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div
            ref={ref}
            onMouseMove={(e) => {
                const el = ref.current!;
                const r = el.getBoundingClientRect();
                const dx = (e.clientX - (r.left + r.width / 2)) / strength;
                const dy = (e.clientY - (r.top + r.height / 2)) / strength;
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            }}
            onMouseLeave={() => {
                const el = ref.current!;
                el.style.transform = `translate(0,0)`;
            }}
            className="inline-block will-change-transform"
        >
            {children}
        </div>
    );
}