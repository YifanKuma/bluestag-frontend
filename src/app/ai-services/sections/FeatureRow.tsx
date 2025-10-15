"use client";
import {motion} from "framer-motion";
import {CheckCircle} from "lucide-react";

export default function FeatureRow({children}: { children: React.ReactNode }) {
    return (
        <motion.li
            initial={{opacity: 0, y: 8}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.35}}
            viewport={{once: true, margin: "-40px"}}
            className="flex items-start gap-3"
        >
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400"/>
            <span className="text-white/85">{children}</span>
        </motion.li>
    );
}