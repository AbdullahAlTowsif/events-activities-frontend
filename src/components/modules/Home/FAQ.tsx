"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Shield, Users, Calendar } from 'lucide-react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqCategories = [
        {
            title: "Getting Started",
            icon: HelpCircle,
            color: "from-blue-500 to-cyan-500",
            questions: [
                {
                    question: "How do I sign up for the platform?",
                    answer: "Signing up is easy! Click on the 'Register' button in the top navigation, provide your email address, create a password, and fill in your basic information. You can also sign up using Google or Facebook for faster registration.",
                    details: [
                        "Email verification required",
                        "Profile setup takes 5 minutes",
                        "No credit card required to start"
                    ]
                },
                {
                    question: "Is the platform free to use?",
                    answer: "Yes, creating an account and browsing events is completely free. You only pay when you join paid events created by hosts. Hosts may also set their own event fees to cover costs or make a profit.",
                    details: [
                        "Free registration and browsing",
                        "Only pay for events you join",
                        "Hosts set event prices"
                    ]
                },
                {
                    question: "Can I use the platform without a smartphone?",
                    answer: "Absolutely! Our platform is fully responsive and works perfectly on desktop computers, laptops, tablets, and smartphones. You can access all features through any modern web browser.",
                    details: [
                        "Full desktop support",
                        "Mobile-responsive design",
                        "No app download required"
                    ]
                }
            ]
        },
        {
            title: "Events & Activities",
            icon: Calendar,
            color: "from-purple-500 to-pink-500",
            questions: [
                {
                    question: "How do I find events near me?",
                    answer: "Use our search filters to find events by location, date, category, or price range. You can also enable location services to automatically see events happening near you. Our algorithm suggests events based on your interests and past activities.",
                    details: [
                        "Location-based search",
                        "Interest matching algorithm",
                        "Save favorite events"
                    ]
                },
                {
                    question: "Can I create my own events?",
                    answer: "Yes! Any registered user can create events. Simply click 'Create Event', fill in the details (title, description, date, location, price if any), and set participant limits. Your event will be visible to other users who match your criteria.",
                    details: [
                        "Set participant limits",
                        "Add event images",
                        "Set custom pricing"
                    ]
                },
                {
                    question: "What happens if an event gets cancelled?",
                    answer: "If a host cancels an event, all participants receive a full refund (for paid events) and are notified immediately. You'll receive an email notification and can find alternative events through our platform.",
                    details: [
                        "Automatic refunds",
                        "Email notifications",
                        "Alternative suggestions"
                    ]
                }
            ]
        },
        {
            title: "Safety & Security",
            icon: Shield,
            color: "from-emerald-500 to-teal-500",
            questions: [
                {
                    question: "How do you ensure user safety?",
                    answer: "We prioritize safety through user verification, secure messaging, and a rating system. All users can rate their experiences, and we have a dedicated moderation team. We also provide safety guidelines and encourage public meetups for first-time events.",
                    details: [
                        "User verification process",
                        "Rating and review system",
                        "24/7 moderation support"
                    ]
                },
                {
                    question: "What payment methods are accepted?",
                    answer: "We support multiple secure payment options including credit/debit cards (Visa, MasterCard, American Express), digital wallets (Apple Pay, Google Pay), and bank transfers. All payments are processed through PCI-compliant secure gateways.",
                    details: [
                        "Credit/Debit cards",
                        "Digital wallets",
                        "Secure encryption"
                    ]
                },
                {
                    question: "Are my personal details secure?",
                    answer: "Absolutely. We use end-to-end encryption for all personal data and comply with GDPR regulations. Your payment information is never stored on our servers, and we use industry-standard security protocols to protect your data.",
                    details: [
                        "GDPR compliant",
                        "End-to-end encryption",
                        "Secure payment processing"
                    ]
                }
            ]
        },
        {
            title: "Community & Support",
            icon: Users,
            color: "from-amber-500 to-orange-500",
            questions: [
                {
                    question: "How does the rating system work?",
                    answer: "After attending an event, both hosts and participants can rate each other on a 1-5 star scale and leave reviews. These ratings help build trust within our community. Your average rating is displayed on your profile.",
                    details: [
                        "1-5 star rating system",
                        "Written reviews",
                        "Profile rating display"
                    ]
                },
                {
                    question: "What if I have issues during an event?",
                    answer: "We provide 24/7 support through multiple channels. You can contact our support team via in-app messaging, email, or phone. For urgent safety concerns, we have an emergency contact system in place.",
                    details: [
                        "24/7 support availability",
                        "Multiple contact channels",
                        "Emergency contact system"
                    ]
                },
                {
                    question: "Can I connect with other users before events?",
                    answer: "Yes! Our platform includes secure messaging that allows participants to communicate before events. You can discuss details, coordinate meeting points, and get to know your event companions in a safe environment.",
                    details: [
                        "Secure group messaging",
                        "Media sharing",
                        "Event-specific chats"
                    ]
                }
            ]
        }
    ];

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <HelpCircle size={16} />
                        <span>Find Answers Quickly</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
                    </h2>

                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Got questions? We&apos;ve got answers! Find everything you need to know about using our platform.
                        Can&apos;t find what you&apos;re looking for? Contact our support team.
                    </p>
                </div>

                {/* Search Bar */}
                {/* <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for questions or topics..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
                        />
                        <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    </div>
                </div> */}

                {/* FAQ Categories */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {faqCategories.map((category, categoryIndex) => {
                        const CategoryIcon = category.icon;
                        return (
                            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                                {/* Category Header */}
                                <div className={`bg-gradient-to-r ${category.color} p-6`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                            <CategoryIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                                    </div>
                                </div>

                                {/* Questions */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {category.questions.map((faq, questionIndex) => {
                                            const isOpen = openIndex === (categoryIndex * 3 + questionIndex);
                                            return (
                                                <div
                                                    key={questionIndex}
                                                    className={`border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'ring-2 ring-blue-100' : 'hover:border-slate-300'
                                                        }`}
                                                >
                                                    <button
                                                        onClick={() => toggleFAQ(categoryIndex * 3 + questionIndex)}
                                                        className="w-full flex items-center justify-between p-5 text-left"
                                                    >
                                                        <span className="font-semibold text-slate-800 pr-8">
                                                            {faq.question}
                                                        </span>
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isOpen
                                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                                            : 'bg-slate-100 text-slate-500'
                                                            }`}>
                                                            {isOpen ? (
                                                                <ChevronUp className="w-4 h-4" />
                                                            ) : (
                                                                <ChevronDown className="w-4 h-4" />
                                                            )}
                                                        </div>
                                                    </button>

                                                    {/* Answer */}
                                                    <div
                                                        className={`px-5 overflow-hidden transition-all duration-300 ${isOpen ? 'pb-5 max-h-[500px]' : 'max-h-0'
                                                            }`}
                                                    >
                                                        <p className="text-slate-600 mb-4">{faq.answer}</p>

                                                        {/* Details List */}
                                                        <div className="space-y-2">
                                                            {faq.details.map((detail, detailIndex) => (
                                                                <div key={detailIndex} className="flex items-start gap-2">
                                                                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                                                    <span className="text-sm text-slate-600">{detail}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Help Section */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                <HelpCircle className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Get Started</h3>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Begin your journey with ease. Sign up to explore events, connect with companions, and dive into activities tailored to your interests.
                        </p>
                        <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                            Be a Member →
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Live Events Join</h3>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Discover and participate in exciting local events with ease. Connect instantly with companions who share your interests.
                        </p>
                        <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                            Start Joining →
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Community Forum</h3>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Connect with other users, share experiences, and get advice from our active community.
                        </p>
                        <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                            Join Community →
                        </button>
                    </div>
                </div>

                {/* Contact CTA */}
                {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-center shadow-xl">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold text-white mb-4">Still have questions?</h3>
                        <p className="text-blue-100 text-lg mb-8">
                            Our support team is here to help you 24/7. Get in touch with us for personalized assistance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
                                Contact Support
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                                Schedule a Call
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
}
