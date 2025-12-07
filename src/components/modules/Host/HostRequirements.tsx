import { CheckCircle, XCircle, AlertCircle, Clock, Shield, Star } from 'lucide-react';

export default function HostRequirements() {
    const requirements = [
        {
            title: "Must be 18+ years old",
            description: "You need to be at least 18 years old to host events.",
            icon: CheckCircle,
            color: "text-emerald-500"
        },
        {
            title: "Valid government ID",
            description: "We verify all hosts to ensure community safety.",
            icon: Shield,
            color: "text-blue-500"
        },
        {
            title: "Good communication skills",
            description: "Ability to clearly communicate with participants.",
            icon: CheckCircle,
            color: "text-emerald-500"
        },
        {
            title: "No criminal record",
            description: "Background check required for all hosts.",
            icon: Shield,
            color: "text-blue-500"
        },
        {
            title: "Event planning ability",
            description: "Basic organizational skills to manage events.",
            icon: CheckCircle,
            color: "text-emerald-500"
        },
        {
            title: "Positive attitude",
            description: "Friendly and welcoming to all participants.",
            icon: Star,
            color: "text-amber-500"
        }
    ];

    const disqualifiers = [
        "History of violent behavior",
        "Fraudulent activity",
        "Multiple user complaints",
        "Unverified identity",
        "Under 18 years old"
    ];

    return (
        <section className="py-20 px-4 bg-linear-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Host{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                            Requirements
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        To ensure the best experience for everyone, we have some basic requirements for becoming a host.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Requirements */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">What You Need</h3>
                                <p className="text-slate-600">Essential requirements to become a host</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {requirements.map((req, idx) => {
                                const Icon = req.icon;
                                return (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-lg ${req.color.replace('text', 'bg')} bg-opacity-10 flex items-center justify-center shrink-0 mt-1`}>
                                            <Icon className={`w-5 h-5 ${req.color}`} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 mb-1">{req.title}</h4>
                                            <p className="text-slate-600 text-sm">{req.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <div className="font-medium text-blue-800">Processing Time</div>
                                    <p className="text-blue-600 text-sm">
                                        Applications are typically reviewed within 2-3 business days. You&apos;ll receive an email notification once your application is approved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disqualifiers */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-linear-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Disqualifiers</h3>
                                <p className="text-slate-600">Things that will prevent approval</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            {disqualifiers.map((disqualifier, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                                    <span className="text-red-700">{disqualifier}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                                <div>
                                    <div className="font-medium text-amber-800">Important Notes</div>
                                    <ul className="text-amber-600 text-sm space-y-1 mt-2">
                                        <li>• All information provided must be accurate and truthful</li>
                                        <li>• Hosts are responsible for following local laws and regulations</li>
                                        <li>• Platform fees apply to paid events (5-10% depending on event type)</li>
                                        <li>• You can appeal a rejection by contacting support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Process Steps */}
                <div className="mt-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
                    <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Submit Application",
                                description: "Fill out the host application form with your details"
                            },
                            {
                                step: "02",
                                title: "Verification",
                                description: "We review your application and verify your identity"
                            },
                            {
                                step: "03",
                                title: "Approval",
                                description: "Get approved and access host dashboard"
                            },
                            {
                                step: "04",
                                title: "Create Events",
                                description: "Start hosting events and building your community"
                            }
                        ].map((step, idx) => (
                            <div key={idx} className="relative text-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                                    {step.step}
                                </div>
                                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                <p className="text-blue-100">{step.description}</p>
                                {idx < 3 && (
                                    <div className="hidden md:block absolute top-8 -right-10 w-20 h-1 bg-white/30"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}