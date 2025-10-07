// components/Section.tsx
export default function Section({
                                    id,
                                    className = "",
                                    children,
                                    variant = "auto",
                                }: {
    id?: string;
    className?: string;
    children: React.ReactNode;
    /**
     * auto  - natural height with padding
     * tall  - ≈70svh for richer content without emptiness
     * full  - full viewport hero
     */
    variant?: "auto" | "tall" | "full";
}) {
    const base = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
    const size =
        variant === "full"
            ? "min-h-[100svh] flex items-center"
            : variant === "tall"
                ? "min-h-[70svh] flex items-center"
                : "py-14";

    return (
        <section id={id} className={`${base} ${size} ${className}`}>
            <div className="w-full">{children}</div>
        </section>
    );
}