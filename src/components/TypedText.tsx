"use client";

import {motion} from "framer-motion";
import RotatingTyped from "@/components/RotatingTyped";

export default function TypedText() {
    return (
        <motion.h3
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.05}}
            className="mt-2 text-4xl sm:text-5xl font-extrabold text-blue-600"
        >
            <RotatingTyped
                words={["Lead Qual", "Bookings", "Support",'Bluestag']}
                typingMs={80}
                backspaceMs={40}
                holdMs={700}
            />
        </motion.h3>
    );
}