const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchAPI(endpoint: string) {
    const res = await fetch(`${API_URL}/api/${endpoint}?populate=*`, {
        headers: {"Content-Type": "application/json"},
        next: {revalidate: 60}, // cache for 1 min
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
    }

    return res.json();
}
