"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Calendar,
    Loader2,
    MapPin,
    Sparkles,
    Users,
    DollarSign,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AISuggestedEvent } from "@/types/ai-event.interface";
import { getAIEventRecommendations } from "@/services/ai/ai.service";

export default function AIEventSuggestion() {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedEvents, setSuggestedEvents] = useState<AISuggestedEvent[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleGetRecommendations = async () => {
        setIsLoading(true);
        setSuggestedEvents([]);
        setShowSuggestions(false);

        try {
            const response = await getAIEventRecommendations();

            if (response.success && response.data) {
                const events = Array.isArray(response.data)
                    ? response.data
                    : [response.data];
                setSuggestedEvents(events);
                setShowSuggestions(true);
                toast.success("AI event recommendations generated successfully!");
            } else {
                toast.error(response.message || "Failed to get AI recommendations");
            }
        } catch (error) {
            console.error("Error getting AI recommendations:", error);
            toast.error("Failed to get AI recommendations. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="bg-linear-to-br from-purple-500/10 via-white to-pink-500/10 border-purple-500/30 shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-gray-800">AI Event Recommendations</CardTitle>
                        <CardDescription className="text-gray-600">
                            Personalized events based on your interests and history
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="bg-white/50 p-4 rounded-lg border border-purple-500/20">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        Our AI analyzes your interests, past events, and location to find the perfect events for you.
                    </p>
                </div>

                <Button
                    onClick={handleGetRecommendations}
                    disabled={isLoading}
                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25"
                    size="lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing your preferences...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Get Personalized Recommendations
                        </>
                    )}
                </Button>

                {showSuggestions && suggestedEvents.length > 0 && (
                    <div className="space-y-4 mt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-purple-500/10 text-purple-700 border-purple-500/30"
                                >
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    AI Recommended for You ({suggestedEvents.length})
                                </Badge>
                            </div>
                            <p className="text-xs text-gray-500">
                                Based on your interests & history
                            </p>
                        </div>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                            {suggestedEvents.map((event, index) => (
                                <div
                                    key={event.id || index}
                                    className="group p-4 bg-white rounded-lg border border-purple-500/20 hover:border-purple-500/50 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Rank Badge */}
                                        <div className="shrink-0">
                                            <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-pink-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                                #{index + 1}
                                            </div>
                                        </div>

                                        {/* Event Content */}
                                        <div className="flex-1 space-y-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                                                    {event.title}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="secondary" className="text-xs">
                                                        {event.type}
                                                    </Badge>
                                                    {event.participantsCount&& event.participantsCount > 0 && (
                                                        <div className="flex items-center gap-1 text-xs text-gray-600">
                                                            <Users className="h-3 w-3" />
                                                            <span>{event.participantsCount} going</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Location & Match Reason */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-start gap-2 text-sm">
                                                    <MapPin className="h-4 w-4 text-pink-600 shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 text-sm line-clamp-1">
                                                        {event.location}
                                                    </span>
                                                </div>
                                                <div className="flex items-start gap-2 text-sm bg-purple-500/5 p-2 rounded-md">
                                                    <Sparkles className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                                                    <span className="text-gray-600 text-xs italic">
                                                        &quot;{event.matchReason}&quot;
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Fee & View Button */}
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="h-4 w-4 text-green-600" />
                                                    <span className="font-semibold text-green-700">
                                                        ৳{event.joiningFee || 0}
                                                    </span>
                                                    <span className="text-xs text-gray-500 ml-1">
                                                        per person
                                                    </span>
                                                </div>
                                                <Link href={`/events/${event.id}`}>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-purple-700 hover:text-purple-800 hover:bg-purple-100"
                                                    >
                                                        View Details
                                                        <ArrowRight className="h-3 w-3 ml-1" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 border-t border-purple-500/20">
                            <p className="text-xs text-center text-gray-500">
                                ⚡ Recommendations refresh as you attend more events
                            </p>
                        </div>
                    </div>
                )}

                {showSuggestions && suggestedEvents.length === 0 && !isLoading && (
                    <div className="p-6 bg-white rounded-lg border-2 border-amber-200 text-center">
                        <div className="flex justify-center mb-2">
                            <Calendar className="h-8 w-8 text-amber-600" />
                        </div>
                        <p className="text-amber-700 font-medium">
                            No event recommendations available
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {suggestedEvents.length === 0 && suggestedEvents[0]?.id === null
                                ? "No upcoming events are available at the moment. Please check back later."
                                : "Try exploring more events to get better recommendations."
                            }
                        </p>
                        <Link href="/events">
                            <Button variant="outline" className="mt-3">
                                Browse All Events
                            </Button>
                        </Link>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
