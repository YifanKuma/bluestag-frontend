"use client";

import {Twitter, Linkedin, Youtube, Instagram} from "lucide-react";
import {FaDiscord} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-300">
            <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8">

                {/* Left Section */}
                <div>
                    <h2 className="text-white text-lg font-bold flex items-center gap-2">
                        <span className="text-2xl">≡</span> Bluestag AI
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                        Bluestag AI is a no-code platform that uses AI voice assistants to
                        automate calls, capture leads, and boost business efficiency.
                    </p>

                    <div className="flex gap-4 mt-4 text-gray-400">
                        <Twitter className="w-5 h-5 hover:text-white cursor-pointer"/>
                        <Linkedin className="w-5 h-5 hover:text-white cursor-pointer"/>
                        <FaDiscord className="w-5 h-5 hover:text-white cursor-pointer"/>
                        <Youtube className="w-5 h-5 hover:text-white cursor-pointer"/>
                        <Instagram className="w-5 h-5 hover:text-white cursor-pointer"/>
                    </div>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Blogs</a></li>
                        <li><a href="#" className="hover:text-white">Newsletters</a></li>
                        <li><a href="#" className="hover:text-white">Use Cases</a></li>
                        <li><a href="#" className="hover:text-white">Pricing</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Book A Demo</a></li>
                        <li><a href="#" className="hover:text-white">Contact Us</a></li>
                    </ul>
                </div>

                {/* Industries Links */}
                <div>
                    <h3 className="text-white font-semibold mb-3">Industries We Serve</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Pharma & Healthcare</a></li>
                        <li><a href="#" className="hover:text-white">Supply & Logistics</a></li>
                        <li><a href="#" className="hover:text-white">E-commerce & Retail</a></li>
                        <li><a href="#" className="hover:text-white">Finance & Fintech</a></li>
                        <li><a href="#" className="hover:text-white">Talent & Hiring</a></li>
                        <li><a href="#" className="hover:text-white">EdTech & Learning</a></li>
                    </ul>
                </div>
            </div>

            <div
                className="border-t border-gray-700 px-6 py-6 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
                <p>© 2024 Bluestag AI is a brand under Stoic AI Pvt Ltd.</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-white">Terms and Conditions</a>
                    <a href="#" className="hover:text-white">Return Policy</a>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}