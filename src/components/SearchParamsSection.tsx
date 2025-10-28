// src/components/SearchParamsSection.tsx
"use client";

import {useSearchParams} from "next/navigation";

export default function SearchParamsSection() {
    const sp = useSearchParams();
    const plan = sp.get("plan") ?? "starter";
    // ...render whatever needs the query string...
    return <div data-plan={plan}/>;
}