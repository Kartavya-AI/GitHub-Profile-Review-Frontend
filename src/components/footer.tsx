import React from "react";
import Link from "next/link";

function Footer() {
    return (
        <div>
            <footer className="px-4 md:px-36 text-gray-700 bg-zinc-100 py-10 pt-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Logo + Description */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            GitHub Profile Review Assistant
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Empowering hiring teams with AI-driven analysis of GitHub profiles—
                            surfacing skills, project strengths, and collaboration habits for 
                            smarter, data-informed developer hiring.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-md font-semibold mb-2">Quick Links</h4>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <Link href="/" className="hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link href="/profile-review" className="hover:underline">Review Profiles</Link>
                            </li>
                            <li>
                                <Link href="/features" className="hover:underline">Features</Link>
                            </li>
                            <li>
                                <Link href="/use-cases" className="hover:underline">Use Cases</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-md font-semibold mb-2">Connect With Us</h4>
                        <ul className="flex gap-4 text-sm">
                            <li>
                                <a href="#" className="hover:text-blue-600">Twitter</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-pink-600">Instagram</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-800">LinkedIn</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-green-600">GitHub</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom note */}
                <div className="mt-10 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} Kartavya Technology. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Footer;
