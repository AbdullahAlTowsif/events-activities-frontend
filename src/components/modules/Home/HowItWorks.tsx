"use client";

import { useState } from 'react';
import {
    UserPlus,
    Search,
    CalendarCheck,
    Users,
    CreditCard,
    Star,
    ArrowRight,
    Sparkles,
    Shield,
    Heart
} from 'lucide-react';

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            number: 1,
            title: "Create Your Profile",
            description: "Sign up and create your personal profile. Add your interests, hobbies, and location to help us match you with the perfect events and companions.",
            Icon: UserPlus, // Capitalize to indicate it's a component
            color: "from-blue-500 to-cyan-500",
            details: [
                "Add your favorite activities",
                "Set your location preferences",
                "Upload a profile picture",
                "Set your availability"
            ]
        },
        {
            number: 2,
            title: "Browse & Discover Events",
            description: "Explore events in your area. Filter by category, date, location, or price. Find events that match your interests and schedule.",
            Icon: Search,
            color: "from-purple-500 to-pink-500",
            details: [
                "Search by category or keyword",
                "Filter by date and location",
                "See event ratings and reviews",
                "Save events for later"
            ]
        },
        {
            number: 3,
            title: "Join or Create Events",
            description: "Found something interesting? Join an existing event or create your own. Set participant limits, fees, and requirements.",
            Icon: CalendarCheck,
            color: "from-emerald-500 to-teal-500",
            details: [
                "Join with one click",
                "Create custom events",
                "Set participant limits",
                "Add joining fees if needed"
            ]
        },
        {
            number: 4,
            title: "Connect & Participate",
            description: "Meet your event companions through our secure messaging system. Coordinate details and get ready for an amazing experience together.",
            Icon: Users,
            color: "from-amber-500 to-orange-500",
            details: [
                "Secure group messaging",
                "Share event details",
                "Coordinate meetup points",
                "Share photos and updates"
            ]
        },
        {
            number: 5,
            title: "Secure Payment",
            description: "For paid events, enjoy secure payment processing. Hosts receive payments after successful event completion.",
            Icon: CreditCard,
            color: "from-indigo-500 to-blue-500",
            details: [
                "SSL encrypted payments",
                "Multiple payment methods",
                "Secure escrow system",
                "24/7 payment support"
            ]
        },
        {
            number: 6,
            title: "Rate & Review",
            description: "After the event, share your experience. Rate hosts and participants to build a trustworthy community.",
            Icon: Star,
            color: "from-rose-500 to-pink-500",
            details: [
                "Rate from 1-5 stars",
                "Leave detailed reviews",
                "Build your reputation",
                "Help others choose wisely"
            ]
        }
    ];

    const features = [
        {
            Icon: Shield,
            title: "Verified Members",
            description: "All users go through verification to ensure a safe community",
            color: "text-blue-500"
        },
        {
            Icon: Heart,
            title: "Interest Matching",
            description: "Smart algorithms match you with events based on your profile",
            color: "text-pink-500"
        },
        {
            Icon: Sparkles,
            title: "Easy Process",
            description: "Simple, intuitive interface from start to finish",
            color: "text-amber-500"
        }
    ];

    const activeStepData = steps[activeStep];

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Sparkles size={16} />
                        <span>Simple & Secure Process</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Works</span>
                    </h2>

                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        From finding events to creating memories, our platform makes it easy to connect with like-minded people.
                        Follow these simple steps to start your journey.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="relative h-2 bg-slate-200 rounded-full max-w-4xl mx-auto mb-6">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                        ></div>
                    </div>

                    <div className="flex justify-center gap-2">
                        {steps.map((step, index) => (
                            <button
                                key={step.number}
                                onClick={() => setActiveStep(index)}
                                className={`flex flex-col items-center group cursor-pointer ${index <= activeStep ? 'opacity-100' : 'opacity-60'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${index <= activeStep
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110'
                                    : 'bg-slate-200 text-slate-400'
                                    } group-hover:scale-110`}>
                                    <span className="font-bold">{step.number}</span>
                                </div>
                                <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                                    Step {step.number}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Left - Active Step Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100">
                            <div className="flex items-start gap-6 mb-8">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeStepData.color} flex items-center justify-center flex-shrink-0`}>
                                    <activeStepData.Icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full mb-2">
                                        <span className="text-sm font-medium text-blue-600">Step {activeStepData.number}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                                        {activeStepData.title}
                                    </h3>
                                    <p className="text-lg text-slate-600">
                                        {activeStepData.description}
                                    </p>
                                </div>
                            </div>

                            {/* Step Details */}
                            <div className="grid md:grid-cols-2 gap-4 mb-8">
                                {activeStepData.details.map((detail, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">{index + 1}</span>
                                        </div>
                                        <span className="text-slate-700">{detail}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                                <button
                                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                                    disabled={activeStep === 0}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeStep === 0
                                        ? 'opacity-50 cursor-not-allowed text-slate-400'
                                        : 'text-slate-700 hover:bg-slate-100 hover:scale-105'
                                        }`}
                                >
                                    <ArrowRight className="w-5 h-5 rotate-180" />
                                    Previous
                                </button>

                                <div className="text-center">
                                    <span className="text-sm text-slate-500">Step</span>
                                    <div className="text-2xl font-bold text-slate-900">
                                        {activeStep + 1} <span className="text-slate-400">/ {steps.length}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                                    disabled={activeStep === steps.length - 1}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeStep === steps.length - 1
                                        ? 'opacity-50 cursor-not-allowed text-slate-400'
                                        : 'text-blue-600 hover:bg-blue-50 hover:scale-105'
                                        }`}
                                >
                                    Next
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right - All Steps Overview */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                            <h4 className="text-lg font-bold text-slate-900 mb-4">Quick Overview</h4>
                            <div className="space-y-3">
                                {steps.map((step, index) => {
                                    const StepIcon = step.Icon;
                                    return (
                                        <button
                                            key={step.number}
                                            onClick={() => setActiveStep(index)}
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${index === activeStep
                                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 transform scale-[1.02]'
                                                : 'hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${index === activeStep
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                                : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                <StepIcon className="w-4 h-4" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-medium text-slate-800">{step.title}</div>
                                                <div className="text-xs text-slate-500 truncate">{step.description.substring(0, 50)}...</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                            <h4 className="text-lg font-bold text-slate-900 mb-4">Why It&apos;s Great</h4>
                            <div className="space-y-4">
                                {features.map((feature, index) => {
                                    const FeatureIcon = feature.Icon;
                                    return (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                                <FeatureIcon className={`w-5 h-5 ${feature.color}`} />
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-800">{feature.title}</div>
                                                <div className="text-sm text-slate-600">{feature.description}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-center">
                            <h4 className="text-lg font-bold text-white mb-2">Ready to Start?</h4>
                            <p className="text-blue-100 mb-4">Join thousands of people having fun together</p>
                            <button className="w-full bg-white text-blue-600 font-bold py-3 px-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { label: 'Events Created', value: '10,000+', color: 'text-blue-600' },
                        { label: 'Active Users', value: '50,000+', color: 'text-purple-600' },
                        { label: 'Cities Covered', value: '200+', color: 'text-emerald-600' },
                        { label: 'Success Rate', value: '98%', color: 'text-amber-600' }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                            <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                            <div className="text-slate-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
