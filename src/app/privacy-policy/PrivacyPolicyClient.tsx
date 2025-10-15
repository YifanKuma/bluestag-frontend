"use client";

import {motion, type Variants} from "framer-motion";

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 12},
    show: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.45, ease: [0.16, 1, 0.3, 1]}, // TS-safe easing
    },
};

export default function PrivacyPolicyClient() {
    return (
        <section className="relative z-10 mx-auto max-w-4xl px-6 py-20">
            <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-3xl font-bold tracking-tight"
            >
                Privacy Policy
            </motion.h1>

            <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-4 text-white/80 leading-relaxed"
            >
                This following document sets forth the Privacy Policy for the Bluestag AI website,
                <span className="text-emerald-400"> www.bluestag.ai</span>.
            </motion.p>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.15, duration: 0.4}}
                className="mt-10 space-y-8 text-white/80 leading-relaxed"
            >
                <section>
                    <h2 className="text-xl font-semibold text-white mb-2">
                        Our Commitment to Your Privacy
                    </h2>
                    <p>
                        <strong>Bluestag AI</strong> is committed to providing you with the best
                        possible customer service experience. Bluestag AI is bound by the
                        <em> Information Privacy Act 2009 (QLD) </em>
                        and the <em>Privacy Act 1988 (Cth)</em>, which set out a number of principles
                        concerning the privacy of individuals.
                    </p>
                </section>

                <section id="collection">
                    <h2 className="text-xl font-semibold text-white mb-2">
                        1. Collection of Your Personal Information
                    </h2>
                    <p>
                        There are many aspects of the site which can be viewed without providing
                        personal information. However, for access to certain Bluestag AI customer
                        support features, you may be required to submit personal information. This may
                        include, but is not limited to, creating a unique username and password, or
                        providing sensitive information to recover a lost password.
                    </p>
                </section>

                <section id="sharing">
                    <h2 className="text-xl font-semibold text-white mb-2">
                        2. Sharing of Your Personal Information
                    </h2>
                    <p>
                        We may occasionally hire other companies to provide services on our behalf,
                        including but not limited to handling customer support enquiries, processing
                        transactions, or managing customer communications. Those companies will only be
                        permitted to obtain the personal information they need to deliver the service.
                        <strong> Bluestag AI</strong> takes reasonable steps to ensure that these
                        organisations are bound by confidentiality and privacy obligations in relation
                        to the protection of your personal information.
                    </p>
                </section>

                <section id="use">
                    <h2 className="text-xl font-semibold text-white mb-2">
                        3. Use of Your Personal Information
                    </h2>
                    <p>
                        For each visitor to the site, we expressly collect the following non-personally
                        identifiable information, including but not limited to browser type, version
                        and language, operating system, pages viewed while browsing the site, page
                        access times, and referring website addresses. This collected information is
                        used solely for the purpose of gauging visitor traffic, trends, and delivering
                        personalised content to you while you are on this site.
                    </p>
                    <p className="mt-3">
                        From time to time, we may use customer information for new, unanticipated uses
                        not previously disclosed in our privacy notice. If our information practices
                        change in the future, we will use data collected from the time of the policy
                        change forward in accordance with our updated practices.
                    </p>
                </section>

                <section id="changes">
                    <h2 className="text-xl font-semibold text-white mb-2">
                        4. Changes to This Privacy Policy
                    </h2>
                    <p>
                        <strong>Bluestag AI</strong> reserves the right to make amendments to this
                        Privacy Policy at any time. If you have objections to the Privacy Policy, you
                        should not access or use the site.
                    </p>
                </section>

                <section id="access">
                    <h2 className="text-xl font-semibold text-white mb-2">
                        5. Accessing Your Personal Information
                    </h2>
                    <p>
                        You have a right to access your personal information, subject to exceptions
                        allowed by law. If you would like to do so, please contact us. You may be
                        required to submit your request in writing for security reasons.
                        <strong> Bluestag AI</strong> reserves the right to charge a fee for searching
                        for and providing access to your information on a per-request basis.
                    </p>
                </section>

                <section id="contact">
                    <h2 className="text-xl font-semibold text-white mb-2">6. Contacting Us</h2>
                    <p>
                        <strong>Bluestag AI</strong> welcomes your comments regarding this Privacy
                        Policy. If you have any questions about this Privacy Policy and would like
                        further information, please contact us by any of the following means during
                        business hours (9:00 am – 5:00 pm) Monday to Friday.
                    </p>
                    <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                        <p>📞 <span className="text-white/90">+61 1300 20 22 66</span></p>
                        <p className="mt-1">
                            📮 <span className="text-white/90">Attn: Privacy Policy, Bluestag AI, GPO Box 1609, Brisbane City, QLD 4001</span>
                        </p>
                        <p className="mt-1">
                            🌐 <a className="underline text-emerald-400"
                                 href="https://www.bluestag.ai">www.bluestag.ai</a>
                        </p>
                        <p className="mt-1">
                            📧 <a className="underline text-emerald-400"
                                 href="mailto:support@bluestag.ai">support@bluestag.ai</a>
                        </p>
                    </div>
                </section>

                <p className="text-xs text-white/60 pt-4">Last updated: 15 October 2025</p>
            </motion.div>
        </section>
    );
}