"use client";

import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Send,
    Heart,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => {
                setEmail('');
                setIsSubscribed(false);
            }, 3000);
        }
    };

    const footerLinks = {
        company: [
            { name: 'About Us', href: '#' },
            { name: 'Our Team', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Press Kit', href: '#' },
            { name: 'Blog', href: '#' }
        ],
        resources: [
            { name: 'Help Center', href: '#' },
            { name: 'Documentation', href: '#' },
            { name: 'Guides', href: '#' },
            { name: 'API Status', href: '#' },
            { name: 'Community', href: '#' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'License', href: '#' },
            { name: 'Refund Policy', href: '#' }
        ],
        support: [
            { name: 'Contact Us', href: '#' },
            { name: 'FAQs', href: '#' },
            { name: 'Support Portal', href: '#' },
            { name: 'Live Chat', href: '#' },
            { name: 'Feedback', href: '#' }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: '#', color: 'hover:bg-blue-600', label: 'Facebook' },
        { icon: Twitter, href: '#', color: 'hover:bg-sky-500', label: 'Twitter' },
        { icon: Instagram, href: '#', color: 'hover:bg-pink-600', label: 'Instagram' },
        { icon: Linkedin, href: '#', color: 'hover:bg-blue-700', label: 'LinkedIn' },
        { icon: Youtube, href: '#', color: 'hover:bg-red-600', label: 'YouTube' }
    ];

    return (
        <footer className="relative bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4">
                {/* Newsletter Section */}
                <div className="py-16 border-b border-slate-700">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <Sparkles size={16} className="animate-pulse" />
                                <span>Stay Updated</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-3">
                                Subscribe to Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Newsletter</span>
                            </h3>
                            <p className="text-slate-400 text-lg">
                                Get the latest updates, exclusive offers, and insights delivered straight to your inbox.
                            </p>
                        </div>

                        <div>
                            <div className="relative">
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubscribe}
                                        className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                                    >
                                        {isSubscribed ? (
                                            <>
                                                <Heart className="w-5 h-5" />
                                                Subscribed!
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Subscribe
                                            </>
                                        )}
                                    </button>
                                </div>
                                {isSubscribed && (
                                    <p className="text-green-400 text-sm mt-3 flex items-center gap-2">
                                        <Heart className="w-4 h-4" />
                                        Thank you for subscribing! Check your inbox.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold">Events&Activities</h4>
                                <p className="text-xs text-slate-400">Empowering Connections</p>
                            </div>
                        </div>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Building amazing experiences that bring people together. Join thousands of satisfied customers worldwide.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href="tel:+1234567890" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span>+1 (234) 567-890</span>
                            </a>
                            <a href="mailto:hello@yourbrand.com" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span>events@activities.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-slate-400">
                                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span>123 Business St, Suite 100<br />Bangladesh, BD 1971</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            Company
                            <ArrowRight className="w-4 h-4 text-blue-400" />
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            Resources
                            <ArrowRight className="w-4 h-4 text-purple-400" />
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            Legal
                            <ArrowRight className="w-4 h-4 text-emerald-400" />
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            Support
                            <ArrowRight className="w-4 h-4 text-amber-400" />
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-8 border-t border-slate-700">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <span>© 2025 Events&Activities. Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                            <span>in Bangladesh</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className={`w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center ${social.color} hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Additional Links */}
                        <div className="flex items-center gap-6 text-sm text-slate-400">
                            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                            <span>•</span>
                            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
                            <span>•</span>
                            <a href="#" className="hover:text-white transition-colors">Language: EN</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-14 h-14 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50 z-50"
                aria-label="Scroll to top"
            >
                <ArrowRight className="w-6 h-6 -rotate-90" />
            </button>
        </footer>
    );
}
