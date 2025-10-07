import Link from "next/link";

export default function CTAButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <Link
                href="/voice-ai"
                className="inline-flex items-center justify-center rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:opacity-90"
            >
                Try Voice AI
            </Link>
            <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-50"
            >
                Book a Demo
            </Link>
        </div>
    );
}