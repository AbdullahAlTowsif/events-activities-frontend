import AIEventSuggestion from "@/components/ai/AIEventSuggestion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Event Recommendations",
    description: "Get personalized event recommendations powered by AI",
};

export default function AIRecommendationsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        AI Event Recommendations
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Let our AI find the perfect events for you based on your interests and past experiences
                    </p>
                </div>

                <AIEventSuggestion />

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>✨ Your recommendations are personalized and updated in real-time</p>
                </div>
            </div>
        </div>
    );
}
