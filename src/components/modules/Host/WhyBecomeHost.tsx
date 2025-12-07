import { DollarSign, Calendar, Users, Heart, Shield, TrendingUp } from 'lucide-react';

export default function WhyBecomeHost() {
    const benefits = [
        {
            icon: DollarSign,
            title: "Earn Extra Income",
            description: "Set your own prices and earn money from your events and activities.",
            color: "from-emerald-500 to-teal-500"
        },
        {
            icon: Calendar,
            title: "Flexible Schedule",
            description: "Create events on your own time. No fixed hours or commitments.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Users,
            title: "Build Community",
            description: "Connect with people who share your interests and passions.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Heart,
            title: "Share Your Passion",
            description: "Turn your hobbies and skills into meaningful experiences for others.",
            color: "from-rose-500 to-pink-500"
        },
        {
            icon: Shield,
            title: "Verified Platform",
            description: "Safe and secure platform with verified participants and secure payments.",
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: TrendingUp,
            title: "Grow Your Brand",
            description: "Build your reputation and grow as an expert in your field.",
            color: "from-amber-500 to-orange-500"
        }
    ];

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Why Become a{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                            Host?
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Join thousands of hosts who are sharing their passions, building communities, and earning income on their own terms.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, idx) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-linear-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500"
                            >
                                <div className={`absolute top-4 right-4 w-16 h-16 bg-linear-to-br ${benefit.color} rounded-xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>

                                <div className={`w-14 h-14 bg-linear-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {benefit.title}
                                </h3>

                                <p className="text-slate-600">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Host Testimonial */}
                <div className="mt-20 bg-linear-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                                <span>Host Success Story</span>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">
                                &quot;I turned my hiking hobby into a thriving business&quot;
                            </h3>
                            <p className="text-slate-600 text-lg mb-6">
                                Sarah started hosting weekend hiking trips six months ago. Today, she&apos;s organizing 3-4 events per week and has earned over $15,000 while doing what she loves most.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                <div>
                                    <div className="font-bold text-slate-900">Sarah Johnson</div>
                                    <div className="text-slate-600">Adventure Guide • 4.9★ Rating</div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: '250+', label: 'Events Hosted' },
                                { value: '2,500+', label: 'Happy Participants' },
                                { value: '$15K+', label: 'Total Earnings' },
                                { value: '4.9', label: 'Average Rating' }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white text-center">
                                    <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                    <div className="text-sm text-slate-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
