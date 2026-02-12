export interface AISuggestedEvent {
    id: string | null;
    title: string;
    location: string;
    type: string;
    joiningFee?: number;
    participantsCount?: number;
    matchReason: string;
    dateTime?: string;
}

export interface AIEventRecommendationResponse {
    success: boolean;
    message: string;
    data: AISuggestedEvent[] | AISuggestedEvent;
}
