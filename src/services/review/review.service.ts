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


export interface IReview {
    id: string;
    userEmail: string;
    hostEmail: string;
    rating: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;
    reviewer: {
        name: string;
        email: string;
        profilePhoto?: string;
    };
    host: {
        name: string;
        email: string;
        profilePhoto?: string;
    };
}

export interface IAllReviewsResponse {
    success: boolean;
    message: string;
    data: IReview[];
}

// Get all reviews
export async function getAllReviews(): Promise<IAllReviewsResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/review`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        console.log("response", response);

        if (!response.ok) {
            throw new Error(`Failed to fetch reviews: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return {
            success: false,
            message: 'Failed to fetch reviews',
            data: []
        };
    }
}

export async function getHostReviews(hostEmail: string): Promise<IReview[]> {
    try {
        const result = await getAllReviews();

        if (result.success) {
            // Filter reviews by host email
            return result.data.filter(review => review.hostEmail === hostEmail);
        }

        return [];
    } catch (error) {
        console.error('Error fetching host reviews:', error);
        return [];
    }
}

// Get average rating for a host
export async function getHostAverageRating(hostEmail: string): Promise<{
    averageRating: number;
    totalReviews: number;
    reviews: IReview[];
}> {
    try {
        const hostReviews = await getHostReviews(hostEmail);

        if (hostReviews.length === 0) {
            return {
                averageRating: 0,
                totalReviews: 0,
                reviews: []
            };
        }

        const totalRating = hostReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / hostReviews.length;

        return {
            averageRating,
            totalReviews: hostReviews.length,
            reviews: hostReviews
        };
    } catch (error) {
        console.error('Error calculating host rating:', error);
        return {
            averageRating: 0,
            totalReviews: 0,
            reviews: []
        };
    }
}
