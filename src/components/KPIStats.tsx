export default function KPIStats() {
    const stats = [
        {kpi: "5x", label: "Concurrent calls right now"},
        {kpi: "24/7", label: "Always-on voice agent"},
        {kpi: "83%", label: "Common queries resolved"},
        {kpi: "99.9%", label: "Uptime"},
    ];
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => (
                <div key={s.kpi} className="rounded-2xl border border-gray-200 p-6 text-center shadow-sm">
                    <p className="text-3xl font-extrabold">{s.kpi}</p>
                    <p className="mt-1 text-sm text-gray-600">{s.label}</p>
                </div>
            ))}
        </div>
    );
}