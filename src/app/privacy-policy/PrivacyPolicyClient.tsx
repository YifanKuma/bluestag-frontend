"use client";

import {motion, type Variants} from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/* -------------------------------
   Types
-------------------------------- */
export interface PrivacyPolicySection {
    section_id?: string | null;
    heading: string;
    content: string;
}

export interface PrivacyPolicyData {
    title: string;
    intro_text: string;
    policy_section: PrivacyPolicySection[];
    last_updated: string;
    contact_block?: string | null;
}

/* -------------------------------
   Animation
-------------------------------- */
const fadeUp: Variants = {
    hidden: {opacity: 0, y: 12},
    show: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.45, ease: [0.16, 1, 0.3, 1]},
    },
};

/* -------------------------------
   Component
-------------------------------- */
export default function PrivacyPolicyClient({
                                                data,
                                            }: {
    data: PrivacyPolicyData;
}) {
    const {title, intro_text, policy_section, last_updated, contact_block} = data;

    return (
        <section className="relative z-10 mx-auto max-w-4xl px-6 py-20">

            {/* Title */}
            <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-3xl font-bold tracking-tight"
            >
                {title}
            </motion.h1>

            {/* Intro Markdown */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-4 text-white/80 leading-relaxed prose prose-invert max-w-none"
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                >
                    {intro_text}
                </ReactMarkdown>
            </motion.div>

            {/* Policy Sections */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.15, duration: 0.4}}
                className="mt-10 space-y-12 text-white/80 leading-relaxed"
            >
                {policy_section.map((section, i) => (
                    <section
                        key={section.section_id ?? i}
                        id={section.section_id ?? undefined}
                    >
                        <h2 className="text-xl font-semibold text-white mb-3">
                            {section.heading}
                        </h2>

                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {section.content}
                            </ReactMarkdown>
                        </div>
                    </section>
                ))}

                {/* Optional Contact Block */}
                {contact_block && (
                    <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {contact_block}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}

                <p className="text-xs text-white/60 pt-4">
                    Last updated: {last_updated}
                </p>
            </motion.div>
        </section>
    );
}
