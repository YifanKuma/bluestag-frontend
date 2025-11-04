"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Send} from "lucide-react";
import InputField from "./fields/InputField";
import TextareaField from "./fields/TextareaField";

export default function ContactForm() {
    const services = [
        "Voice AI",
        "Video AI",
        "AI Chatbot",
        "App Development",
        "Social Media Management",
        // "AI MSP",
    ];

    const [selected, setSelected] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const toggle = (srv: string) =>
        setSelected((prev) =>
            prev.includes(srv) ? prev.filter((x) => x !== srv) : [...prev, srv]
        );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const phone =
            (e.currentTarget.elements.namedItem("phone") as HTMLInputElement)?.value ||
            "";

        if (selected.length === 0) {
            e.preventDefault();
            setError("Please select at least one service.");
            return;
        }
        setError(null);

        const ausRegex = /^(?:\+61|0)4\d{8}$/;
        if (!ausRegex.test(phone.replace(/\s+/g, ""))) {
            e.preventDefault();
            setPhoneError(
                "Please enter a valid Australian number (04xx xxx xxx or +61 4xx xxx xxx)."
            );
            return;
        }
        setPhoneError(null);
    };

    return (
        <motion.form
            initial={{opacity: 0, x: 30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.7}}
            onSubmit={handleSubmit}
            action="https://formsubmit.co/yifan.h@federationacademy.edu.au"
            method="POST"
            className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_20px_rgba(56,189,248,0.15)]"
        >
            {/* CC to multiple recipients */}
            <input
                type="hidden"
                name="_cc"
                value="mel@bluestag.ai,Nanda.kumar@firstpointit.com.au"
            />

            {/* Include selected services in submission */}
            <input type="hidden" name="services" value={selected.join(", ")}/>

            <h2 className="text-2xl font-semibold mb-6 text-sky-400">
                Send us a message
            </h2>

            <div className="space-y-5 relative z-10">
                <InputField id="name" label="Name" required/>
                <InputField id="phone" label="Phone" required type="tel"/>
                {phoneError && (
                    <p className="text-red-400 text-sm -mt-3">{phoneError}</p>
                )}
                <InputField id="email" label="Email" required type="email"/>
                <InputField id="business" label="Business Name (optional)"/>

                {/* prettier glowing checkboxes */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-white/80">
                        Select Services{" "}
                        <span className="text-sky-400">(choose at least one)</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {services.map((srv) => {
                            const checked = selected.includes(srv);
                            return (
                                <button
                                    key={srv}
                                    type="button"
                                    onClick={() => toggle(srv)}
                                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                        checked
                                            ? "bg-sky-600/40 border-sky-400 text-white shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-sky-500/10 hover:text-white"
                                    }`}
                                >
                                    {srv}
                                </button>
                            );
                        })}
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>

                <TextareaField id="message" label="Message (optional)" rows={4}/>

                <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    type="submit"
                    className="mt-4 w-full flex justify-center items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-xl transition-all duration-300"
                >
                    <Send className="w-4 h-4"/> Send Message
                </motion.button>
            </div>
        </motion.form>
    );
}