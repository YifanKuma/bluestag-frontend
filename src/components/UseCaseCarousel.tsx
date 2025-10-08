"use client";

import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
    PhoneCall,
    Headphones,
    Home,
    CreditCard,
    GraduationCap,
    Heart,
    Briefcase,
    DollarSign,
    Users,
} from "lucide-react";

const useCases = [
    {
        icon: <PhoneCall size={44}/>,
        title: "Sales Outreach",
        desc: "Autodial prospects, qualify leads, and book meetings automatically.",
    },
    {
        icon: <Headphones size={44}/>,
        title: "Customer Service",
        desc: "Provide instant answers, handle complaints, and boost satisfaction.",
    },
    {
        icon: <Home size={44}/>,
        title: "Real Estate",
        desc: "Pre-qualify buyers, schedule inspections, and manage follow-ups.",
    },
    {
        icon: <DollarSign size={44}/>,
        title: "Investment Advisory",
        desc: "Engage investors and automate updates with human-like voice clarity.",
    },
    {
        icon: <CreditCard size={44}/>,
        title: "Payment Collection",
        desc: "Send secure payment links and automate overdue follow-ups.",
    },
    {
        icon: <GraduationCap size={44}/>,
        title: "Training & Education",
        desc: "Conduct voice-driven lessons, quizzes, and reminders for learners.",
    },
    {
        icon: <Heart size={44}/>,
        title: "Counselling & Wellbeing",
        desc: "Offer compassionate, AI-powered emotional support conversations.",
    },
    {
        icon: <Briefcase size={44}/>,
        title: "Recruitment & HR",
        desc: "Screen candidates and automate interview scheduling instantly.",
    },
    {
        icon: <Users size={44}/>,
        title: "Community Engagement",
        desc: "Call members for event reminders and collect feedback efficiently.",
    },
];

export default function UseCaseCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % useCases.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative py-28 text-white overflow-visible">
            <h2 className="text-5xl font-extrabold text-center mb-14">
                What can Bluestag Voice AI do?
            </h2>

            <div className="flex justify-center items-center relative h-[420px] md:h-[480px]">
                {useCases.map((useCase, i) => {
                    const offset = (i - index + useCases.length) % useCases.length;
                    const center = offset === 0;
                    const left = offset === useCases.length - 1;
                    const right = offset === 1;

                    let x = 0;
                    let scale = 1;
                    let opacity = 1;

                    if (left) {
                        x = -360;
                        scale = 0.8;
                        opacity = 0.4;
                    } else if (right) {
                        x = 360;
                        scale = 0.8;
                        opacity = 0.4;
                    } else if (!center) {
                        opacity = 0;
                        scale = 0.6;
                    }

                    return (
                        <AnimatePresence key={i}>
                            {Math.abs(offset) <= 1 || offset === useCases.length - 1 ? (
                                <motion.div
                                    key={i}
                                    initial={{opacity: 0, scale: 0.7}}
                                    animate={{x, scale, opacity}}
                                    transition={{duration: 0.8, ease: "easeInOut"}}
                                    className={`absolute w-[420px] h-[340px] rounded-3xl backdrop-blur bg-white/10 border border-white/10 shadow-2xl text-center p-10 flex flex-col justify-center items-center ${
                                        center ? "z-20" : "z-10"
                                    }`}
                                >
                                    <div className="mb-5 text-blue-400">{useCase.icon}</div>
                                    <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                                    <p className="text-base text-gray-300">{useCase.desc}</p>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    );
                })}
            </div>
        </section>
    );
}