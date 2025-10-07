export default function ContactPage() {
    return (
        <section className="mx-auto max-w-2xl px-4 py-16">
            <h1 className="text-4xl font-extrabold">Contact</h1>
            <p className="mt-3 text-gray-700">
                Book a demo or ask anything. We usually reply within one business day.
            </p>
            <form className="mt-6 grid gap-4">
                <input className="rounded-xl border p-3" placeholder="Your name" required/>
                <input className="rounded-xl border p-3" type="email" placeholder="Email" required/>
                <input className="rounded-xl border p-3" placeholder="Business name"/>
                <textarea className="rounded-xl border p-3" rows={5} placeholder="How can we help?"/>
                <button className="rounded-xl bg-sky-700 text-white py-3 font-semibold hover:opacity-90">
                    Send
                </button>
            </form>
            <p className="mt-6 text-sm text-gray-500">South Brisbane, QLD · hello@bluestag.ai</p>
        </section>
    );
}