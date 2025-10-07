export default function GlassCard({
                                      children,
                                      className = "",
                                  }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-2xl border border-white/15 bg-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl ${className}`}>
            {children}
        </div>
    );
}
