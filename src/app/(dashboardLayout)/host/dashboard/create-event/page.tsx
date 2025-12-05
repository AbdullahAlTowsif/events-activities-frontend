import { Metadata } from "next";
import { Calendar, MapPin, Users, DollarSign, Image as ImageIcon, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CreateEventForm from "@/components/modules/Host/CreateEventForm";

export const metadata: Metadata = {
    title: "Create New Event | EventHub",
    description: "Organize and create amazing events for your community",
};

const CreateEventPage = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Create a New Event
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Share your passion, connect with people, and create memorable experiences.
                        Fill out the form below to get started.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <Card className="shadow-xl border-0">
                            <CardContent className="p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Event Details
                                        </h2>
                                        <p className="text-gray-500 mt-1">
                                            All fields marked with <span className="text-red-500">*</span> are required
                                        </p>
                                    </div>
                                    <div className="hidden md:flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                                        <Shield className="w-4 h-4" />
                                        <span className="text-sm font-medium">Secure & Private</span>
                                    </div>
                                </div>

                                <CreateEventForm />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Tips & Guidelines */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {/* Tips Card */}
                            <Card className="shadow-lg border-0 bg-linear-to-br from-blue-50 to-indigo-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                        Pro Tips
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                            <span className="text-gray-700">
                                                <strong>Be specific</strong> with your event title and description
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                            <span className="text-gray-700">
                                                <strong>High-quality images</strong> increase engagement by 40%
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                            <span className="text-gray-700">
                                                <strong>Clear pricing</strong> helps avoid confusion
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                            <span className="text-gray-700">
                                                <strong>Set realistic</strong> participant limits
                                            </span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Guidelines Card */}
                            <Card className="shadow-lg border-0 bg-linear-to-br from-emerald-50 to-teal-50">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                                        Community Guidelines
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                                                <Users className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            <span className="text-gray-700">
                                                Events must be inclusive and welcoming to all
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                                                <MapPin className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            <span className="text-gray-700">
                                                Provide accurate location information
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                                                <DollarSign className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            <span className="text-gray-700">
                                                Transparent pricing with no hidden fees
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                                                <ImageIcon className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            <span className="text-gray-700">
                                                Upload original, appropriate images
                                            </span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Bottom Info Section */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center space-x-6 text-gray-500 text-sm">
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Real-time form validation
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Live event updates
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                            Mobile responsive design
                        </span>
                    </div>
                    <p className="mt-4 text-gray-400 text-sm">
                        By creating an event, you help build connections, encourage participation, and bring communities together.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateEventPage;
