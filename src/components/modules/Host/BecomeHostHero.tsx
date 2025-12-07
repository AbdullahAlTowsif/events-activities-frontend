"use client";

import { Crown, Users, DollarSign, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BecomeHostHero() {
    return (
        <section className="relative py-20 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-linear-to-r from-amber-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-linear-to-r from-emerald-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                            <Crown className="w-4 h-4" />
                            <span>Turn Your Passion Into Profit</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                            Become a{' '}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                                Host
                            </span>{' '}
                            & Share Your{' '}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-pink-500">
                                Passion
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 leading-relaxed">
                            Create amazing experiences, connect with like-minded people, and earn money doing what you love.
                            From hiking trips to cooking classes, art workshops to gaming tournaments—share your expertise and build a community.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { label: 'Active Hosts', value: '5K+', icon: Users, color: 'text-blue-500' },
                                { label: 'Avg. Earnings', value: '$500+', icon: DollarSign, color: 'text-emerald-500' },
                                { label: 'Host Rating', value: '4.8', icon: Star, color: 'text-amber-500' }
                            ].map((stat, idx) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={idx} className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Icon className={`w-6 h-6 ${stat.color}`} />
                                            <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                                        </div>
                                        <p className="text-sm text-slate-600">{stat.label}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href="#apply"
                                className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                <span>Apply Now</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Image/Illustration */}
                    <div className="relative">
                        <div className="relative bg-linear-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-8 border border-blue-100">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {[
                                    { label: 'Create Events', color: 'from-blue-500 to-cyan-500' },
                                    { label: 'Set Prices', color: 'from-purple-500 to-pink-500' },
                                    { label: 'Manage Bookings', color: 'from-emerald-500 to-teal-500' },
                                    { label: 'Earn Money', color: 'from-amber-500 to-orange-500' }
                                ].map((item, idx) => (
                                    <div key={idx} className={`bg-linear-to-br ${item.color} rounded-2xl p-4 text-center text-white font-medium`}>
                                        {item.label}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-linear-to-r from-slate-50 to-white p-6 rounded-2xl border border-slate-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">Community Leader</div>
                                        <div className="text-sm text-slate-600">Share experiences with others</div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        'Create memorable experiences',
                                        'Build your personal brand',
                                        'Earn extra income',
                                        'Flexible schedule'
                                    ].map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                            <span className="text-slate-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-r from-amber-400 to-orange-400 rounded-full opacity-20 blur-2xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-2xl"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </section>
    );
}
