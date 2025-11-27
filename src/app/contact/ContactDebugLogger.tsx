"use client";

import {useEffect} from "react";
import type {ContactPageData} from "@/types/contact";

// Extend window typing safely
declare global {
    interface Window {
        _contact_intro_description?: string;
    }
}

interface ContactDebugLoggerProps {
    data: ContactPageData;
}

export default function ContactDebugLogger({data}: ContactDebugLoggerProps) {
    useEffect(() => {
        console.log("🟦 [CLIENT] intro_description:", data.intro_description);

        // Safe window assignment
        window._contact_intro_description = data.intro_description;
    }, [data]);

    return null;
}
