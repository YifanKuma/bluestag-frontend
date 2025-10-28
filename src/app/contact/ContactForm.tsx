"use client";

import {motion} from "framer-motion";
import {Send} from "lucide-react";
import InputField from "./fields/InputField";
import TextareaField from "./fields/TextareaField";

type Props = {
    formAction?: string;
    cc?: string;
    bcc?: string;
    nextUrl?: string;
};

export default function ContactForm({
                                        formAction = "https://formsubmit.co/support@bluestag.ai",
                                        cc = "yifan.h@federationacademy.edu.au,mel@bluestag.ai",
                                        bcc = "records@bluestag.ai",
                                        nextUrl = "/contact?sent=1",
                                    }: Props) {
    return (
        <motion.form
            initial={{opacity: 0, x: 30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.7}}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-lg"
            action={formAction}
            method="POST"
        >
            {/* FormSubmit config */}
            <input type="hidden" name="_subject" value="New message from Bluestag.ai Contact Form"/>
            <input type="hidden" name="_cc" value={cc}/>
            <input type="hidden" name="_bcc" value={bcc}/>
            <input type="hidden" name="_captcha" value="false"/>
            <input type="hidden" name="_template" value="table"/>
            <input type="hidden" name="_next" value={nextUrl}/>
            {/* honey pot */}
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off"/>

            <h2 className="text-2xl font-semibold mb-6 text-sky-400">Send us a message</h2>

            <div className="space-y-5">
                <InputField id="name" label="Name" required autoComplete="name"/>
                <InputField id="email" label="Email" required type="email" autoComplete="email"/>
                <TextareaField id="message" label="Message" required rows={4}/>

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