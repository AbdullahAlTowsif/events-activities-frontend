import { AIEventRecommendationResponse } from "@/types/ai-event.interface";
import { getCookie } from "../auth/tokenHandlers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
console.log("API_BASE_URL", API_BASE_URL);

export const getAIEventRecommendations = async (): Promise<AIEventRecommendationResponse> => {
    try {
        const token = await getCookie("accessToken");
        
        const response = await fetch(`${API_BASE_URL}/recommendation/ai-recommendations`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch AI recommendations");
        }

        return {
            success: true,
            message: data.message || "AI recommendations fetched successfully",
            data: data.data,
        };
    } catch (error) {
        console.error("AI Event Recommendation Error:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to get AI recommendations",
            data: [],
        };
    }
};