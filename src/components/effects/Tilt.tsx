"use client";
import {motion, useMotionValue, useTransform} from "framer-motion";
import {ReactNode} from "react";

export default function Tilt({children}: { children: ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-40, 40], [8, -8]);
    const rotateY = useTransform(x, [-40, 40], [-8, 8]);

    return (
        <motion.div
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - (r.left + r.width / 2));
                y.set(e.clientY - (r.top + r.height / 2));
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            style={{rotateX, rotateY, transformStyle: "preserve-3d" as any}}
            className="will-change-transform"
        >
            {children}
        </motion.div>
    );
}