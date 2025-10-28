"use client";

import {AnimatePresence, motion} from "framer-motion";
import {Suspense, useEffect, useMemo, useState} from "react";
import {useSearchParams} from "next/navigation";
import {X} from "lucide-react";

function Inner() {
    const params = useSearchParams();
    const sent = useMemo(() => params.get("sent") === "1", [params]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!sent) return;
        setOpen(true);
        const t = setTimeout(() => setOpen(false), 5000);
        const url = new URL(window.location.href);
        url.searchParams.delete("sent");
        window.history.replaceState({}, "", url.toString());
        return () => clearTimeout(t);
    }, [sent]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 16}}
                    transition={{duration: 0.25}}
                    className="fixed z-[60] bottom-6 left-1/2 -translate-x-1/2 w-[92vw] max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl"
                    role="status"
                    aria-live="polite"
                >
                    <div className="flex items-start gap-3 p-4">
                        <div
                            className="mt-0.5 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]"/>
                        <div className="flex-1">
                            <p className="text-white font-medium">Message sent successfully</p>
                            <p className="text-sm text-gray-300">Thanks! We’ll get back to you soon.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-lg p-1.5 text-gray-300 hover:text-white hover:bg-white/10 transition"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4"/>
                        </button>
                    </div>
                    <motion.div
                        initial={{width: "100%"}}
                        animate={{width: "0%"}}
                        transition={{duration: 5, ease: "linear"}}
                        className="h-1 rounded-b-2xl bg-green-400/80"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/** Suspense wrapper to satisfy App Router rule for useSearchParams */
export default function SuccessToast() {
    return (
        <Suspense fallback={null}>
            <Inner/>
        </Suspense>
    );
}