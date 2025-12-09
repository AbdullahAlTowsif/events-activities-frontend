import { IReview } from "./review.service";


export interface IReviewsPageResponse {
    success: boolean;
    message: string;
    data: IReview[];
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface IReviewFilters {
    minRating?: number;
    maxRating?: number;
    hasComment?: boolean;
    dateFrom?: string;
    dateTo?: string;
}

export interface IReviewsStats {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
    recentReviews: number; // Reviews from last 30 days
    topReviewers: Array<{
        name: string;
        email: string;
        totalReviews: number;
        averageRating: number;
    }>;
}

// Get all reviews for the reviews page
export async function getAllReviewsForPage(
    filters?: IReviewFilters,
    page = 1,
    limit = 12
): Promise<IReviewsPageResponse> {
    try {
        // Build query parameters
        const params = new URLSearchParams();

        // Add filters
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    params.append(key, value.toString());
                }
            });
        }

        // Add pagination
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/review${queryString ? `?${queryString}` : ''}`;

        console.log('Fetching reviews from:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch reviews: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return {
            success: false,
            message: 'Failed to fetch reviews',
            data: []
        };
    }
}

// Get reviews statistics
export async function getReviewsStats(): Promise<IReviewsStats> {
    try {
        const response = await getAllReviewsForPage();

        if (!response.success || !Array.isArray(response.data)) {
            return {
                totalReviews: 0,
                averageRating: 0,
                ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                recentReviews: 0,
                topReviewers: []
            };
        }

        const reviews = response.data;
        const totalReviews = reviews.length;

        // Calculate average rating
        const validRatings = reviews.filter(r => r.rating >= 1 && r.rating <= 5);
        const averageRating = validRatings.length > 0
            ? validRatings.reduce((sum, r) => sum + r.rating, 0) / validRatings.length
            : 0;

        // Calculate rating distribution
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
            }
        });

        // Calculate recent reviews (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentReviews = reviews.filter(review =>
            new Date(review.createdAt) > thirtyDaysAgo
        ).length;

        // Calculate top reviewers
        const reviewerMap = new Map<string, { count: number; totalRating: number }>();
        reviews.forEach(review => {
            if (review.reviewer) {
                const key = review.reviewer.email;
                const current = reviewerMap.get(key) || { count: 0, totalRating: 0 };
                reviewerMap.set(key, {
                    count: current.count + 1,
                    totalRating: current.totalRating + review.rating
                });
            }
        });

        const topReviewers = Array.from(reviewerMap.entries())
            .map(([email, data]) => ({
                name: reviews.find(r => r.reviewer?.email === email)?.reviewer?.name || 'Anonymous',
                email,
                totalReviews: data.count,
                averageRating: data.totalRating / data.count
            }))
            .sort((a, b) => b.totalReviews - a.totalReviews)
            .slice(0, 5);

        return {
            totalReviews,
            averageRating,
            ratingDistribution,
            recentReviews,
            topReviewers
        };
    } catch (error) {
        console.error('Error calculating review stats:', error);
        return {
            totalReviews: 0,
            averageRating: 0,
            ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            recentReviews: 0,
            topReviewers: []
        };
    }
}
