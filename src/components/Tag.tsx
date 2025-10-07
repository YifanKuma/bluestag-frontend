"use client";
import {Sparkles} from "lucide-react";

export default function Tag({children}: { children: React.ReactNode }) {
    return (
        <span
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
      <Sparkles className="h-3.5 w-3.5"/>
            {children}
    </span>
    );
}