export interface ICreateReviewPayload {
    rating: number;
    comment?: string;
}

export interface IReviewResponse {
    success: boolean;
    message: string;
    data: {
        event: {
            id: string;
            title: string;
            dateTime: string;
            location: string;
            hostEmail: string;
            joiningFee?: number;
        };
        review: {
            id: string;
            userEmail: string;
            hostEmail: string;
            rating: number;
            comment?: string;
            createdAt: string;
            updatedAt: string;
        };
    };
}

export interface IUserReviewStatus {
    hasReviewed: boolean;
    canReview: boolean;
    reason?: string;
}

// Create review for a host (based on event)
export async function createReview(
    eventId: string,
    payload: ICreateReviewPayload
): Promise<IReviewResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/event/${eventId}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to submit review: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
}
