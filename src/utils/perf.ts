export type PerfMode = "high" | "low";

// Extend navigator type safely for optional hardware info
type NavigatorExtra = Navigator & {
    hardwareConcurrency?: number;
    deviceMemory?: number;
};

export function detectLowPowerDevice(): boolean {
    if (typeof navigator === "undefined" || typeof window === "undefined") return false;

    const ua = navigator.userAgent || "";
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    const isOldSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const reducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Safely read optional properties
    const nav = navigator as NavigatorExtra;
    const cores = nav.hardwareConcurrency ?? 4;
    const memGB = nav.deviceMemory ?? 4;

    // Heuristic for low-power devices
    return (
        reducedMotion ||
        isMobile ||
        isOldSafari ||
        cores <= 4 ||
        memGB <= 4 ||
        window.devicePixelRatio > 2.5
    );
}