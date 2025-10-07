"use client";
export default function Footer() {
    return (
        <footer id="contact" className="border-t border-white/10 py-10 text-center text-sm text-white/70">
            <div className="max-w-7xl mx-auto px-4">
                <p>© {new Date().getFullYear()} BLUESTAG.AI — Voice AI for Australian SMBs</p>
                <p className="mt-1">
                    <a href="#privacy" className="hover:text-white/90">Privacy Policy</a>
                    <span className="mx-2">•</span>
                    <a href="#terms" className="hover:text-white/90">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
}
