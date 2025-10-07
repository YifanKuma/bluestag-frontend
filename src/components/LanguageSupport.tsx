"use client";

type Item = {
    flag: string; // emoji flag or small emoji for “Indian”
    name: string;
    voices: string;
};

const ITEMS: Item[] = [
    {flag: "🇮🇳", name: "Indian", voices: "24 voices"},
    {flag: "🇪🇸", name: "Spanish", voices: "10 voices"},
    {flag: "🇫🇷", name: "French", voices: "3 voices"},
    {flag: "🇩🇪", name: "German", voices: "5 voices"},
    {flag: "🇮🇹", name: "Italian", voices: "2 voices"},
    {flag: "🇵🇹", name: "Portuguese", voices: "8 voices"},
    {flag: "🇷🇺", name: "Russian", voices: "4 voices"},
    {flag: "🔴", name: "Japanese", voices: "9 voices"}, // circle like the screenshot
    {flag: "🇬🇧", name: "English", voices: "7 voices"},
    {flag: "🌐", name: "More", voices: "12 voices"},
];

export default function LanguageSupport() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20">
            <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight">
                We support over 20+ languages.
            </h2>

            <p className="mt-6 text-center text-lg text-gray-600">
                Hindi, Tamil, Telugu, Marathi, Kannada, Indian English, Arabic, Dutch,
                German, French and more.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {ITEMS.map((it) => (
                    <div
                        key={it.name}
                        className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                    >
            <span className="grid h-9 w-12 place-items-center rounded-md text-xl">
              {it.flag}
            </span>
                        <div className="min-w-0">
                            <p className="font-semibold">{it.name}</p>
                            <p className="text-sm text-gray-600">{it.voices}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}