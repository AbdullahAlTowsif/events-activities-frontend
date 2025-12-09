'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Star,
    Filter,
    Search,
    MessageSquare,
    Users,
    RefreshCw,
    TrendingUp,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { IReview } from '@/services/review/review.service';
import { getAllReviewsForPage, getReviewsStats, IReviewFilters, IReviewsStats } from '@/services/review/reviews-page.service';

export default function ReviewsContent() {
    // State
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<IReviewsStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [minRating, setMinRating] = useState<string>('all');
    const [hasComment, setHasComment] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');

    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Fetch reviews
    const fetchReviews = useCallback(async () => {
        setLoading(true);
        try {
            const filters: IReviewFilters = {};

            if (minRating !== 'all') {
                filters.minRating = parseInt(minRating);
            }

            if (hasComment !== 'all') {
                filters.hasComment = hasComment === 'yes';
            }

            const result = await getAllReviewsForPage(filters, page, limit);

            if (result.success) {
                let filteredReviews = result.data;

                // Apply search filter
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    filteredReviews = filteredReviews.filter(review =>
                        review.comment?.toLowerCase().includes(query) ||
                        review.reviewer?.name?.toLowerCase().includes(query) ||
                        review.reviewer?.email?.toLowerCase().includes(query)
                    );
                }

                // Apply sorting
                filteredReviews.sort((a, b) => {
                    switch (sortBy) {
                        case 'newest':
                            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        case 'oldest':
                            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        case 'highest':
                            return b.rating - a.rating;
                        case 'lowest':
                            return a.rating - b.rating;
                        default:
                            return 0;
                    }
                });

                setReviews(filteredReviews);
                setTotal(result.meta?.total || filteredReviews.length);
                setTotalPages(Math.ceil((result.meta?.total || filteredReviews.length) / limit));
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, minRating, hasComment, sortBy, page, limit]);

    // Fetch stats
    const fetchStats = useCallback(async () => {
        setStatsLoading(true);
        try {
            const statsData = await getReviewsStats();
            setStats(statsData);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setStatsLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchReviews();
        fetchStats();
    }, [fetchReviews, fetchStats]);

    // Handle reset filters
    const handleResetFilters = () => {
        setSearchQuery('');
        setMinRating('all');
        setHasComment('all');
        setSortBy('newest');
        setPage(1);
    };

    // Handle refresh
    const handleRefresh = () => {
        fetchReviews();
        fetchStats();
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Format time ago
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffDays > 0) return `${diffDays}d ago`;
        if (diffHours > 0) return `${diffHours}h ago`;
        if (diffMinutes > 0) return `${diffMinutes}m ago`;
        return 'Just now';
    };

    // Render rating stars
    const renderStars = (rating: number) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-900 mb-3">Community Reviews</h1>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    Read honest reviews from event attendees about their experiences with hosts
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Reviews"
                    value={stats?.totalReviews || 0}
                    description="All time"
                    icon={<MessageSquare className="w-5 h-5" />}
                    color="blue"
                    loading={statsLoading}
                />
                <StatsCard
                    title="Average Rating"
                    value={stats?.averageRating ? stats.averageRating.toFixed(1) : '0.0'}
                    description="Out of 5 stars"
                    icon={<Star className="w-5 h-5" />}
                    color="amber"
                    loading={statsLoading}
                />
                <StatsCard
                    title="Recent Reviews"
                    value={stats?.recentReviews || 0}
                    description="Last 30 days"
                    icon={<TrendingUp className="w-5 h-5" />}
                    color="green"
                    loading={statsLoading}
                />
                <StatsCard
                    title="Active Reviewers"
                    value={stats?.topReviewers?.length || 0}
                    description="Top contributors"
                    icon={<Users className="w-5 h-5" />}
                    color="purple"
                    loading={statsLoading}
                />
            </div>

            {/* Rating Distribution */}
            {stats && !statsLoading && (
                <Card>
                    <CardHeader>
                        <CardTitle>Rating Distribution</CardTitle>
                        <CardDescription>How reviewers are rating hosts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map(rating => {
                                const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
                                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

                                return (
                                    <div key={rating} className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 w-24">
                                            <span className="text-sm font-medium w-6">{rating}</span>
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-slate-500">({count})</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-yellow-400 rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium w-12 text-right">
                                            {percentage.toFixed(1)}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search reviews by name or comment..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        {/* Min Rating */}
                        {/* <div>
                            <Select value={minRating} onValueChange={setMinRating}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Min Rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Ratings</SelectItem>
                                    <SelectItem value="5">5 Stars</SelectItem>
                                    <SelectItem value="4">4+ Stars</SelectItem>
                                    <SelectItem value="3">3+ Stars</SelectItem>
                                    <SelectItem value="2">2+ Stars</SelectItem>
                                    <SelectItem value="1">1+ Stars</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}

                        {/* Has Comment */}
                        {/* <div>
                            <Select value={hasComment} onValueChange={setHasComment}>
                                <SelectTrigger>
                                    <SelectValue placeholder="With Comment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Reviews</SelectItem>
                                    <SelectItem value="yes">With Comments</SelectItem>
                                    <SelectItem value="no">Without Comments</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}

                        {/* Sort By */}
                        <div>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="highest">Highest Rated</SelectItem>
                                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            disabled={loading}
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleResetFilters}
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Reset Filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Reviews Grid */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                        All Reviews {total > 0 && `(${total})`}
                    </h2>
                    {reviews.length > 0 && (
                        <div className="text-sm text-slate-500">
                            Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <ReviewCardSkeleton key={i} />
                        ))}
                    </div>
                ) : reviews.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="py-12 text-center">
                            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                No Reviews Found
                            </h3>
                            <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                                {searchQuery || minRating !== 'all' || hasComment !== 'all'
                                    ? 'Try adjusting your filters or search term'
                                    : 'No reviews have been posted yet. Be the first to review a host!'
                                }
                            </p>
                            {searchQuery || minRating !== 'all' || hasComment !== 'all' ? (
                                <Button onClick={handleResetFilters} variant="outline">
                                    Reset Filters
                                </Button>
                            ) : (
                                <Link href="/events">
                                    <Button className="bg-linear-to-r from-blue-600 to-purple-600">
                                        Browse Events
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    timeAgo={timeAgo}
                                    formatDate={formatDate}
                                    renderStars={renderStars}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Previous
                                </Button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (page <= 3) {
                                            pageNum = i + 1;
                                        } else if (page >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = page - 2 + i;
                                        }

                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={page === pageNum ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setPage(pageNum)}
                                                className="w-8 h-8 p-0"
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

// Stats Card Component
function StatsCard({
    title,
    value,
    description,
    icon,
    color,
    loading
}: {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
    color: string;
    loading: boolean;
}) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        amber: 'bg-amber-100 text-amber-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-sm text-slate-500">{title}</p>
                        {loading ? (
                            <Skeleton className="h-7 w-16 mt-1" />
                        ) : (
                            <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                        )}
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center`}>
                        {icon}
                    </div>
                </div>
                <p className="text-xs text-slate-500">{description}</p>
            </CardContent>
        </Card>
    );
}

// Review Card Component
function ReviewCard({
    review,
    timeAgo,
    formatDate,
    renderStars
}: {
    review: IReview;
    timeAgo: (date: string) => string;
    formatDate: (date: string) => string;
    renderStars: (rating: number) => React.ReactNode;
}) {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                    {/* Reviewer Info */}
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={review.reviewer?.profilePhoto} />
                            <AvatarFallback>
                                {review.reviewer?.name?.charAt(0).toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{review.reviewer?.name || 'Anonymous User'}</p>
                            <p className="text-xs text-slate-500">{timeAgo(review.createdAt)}</p>
                        </div>
                    </div>

                    {/* Rating Badge */}
                    <Badge className={`text-sm ${review.rating >= 4 ? 'bg-green-100 text-green-800' :
                            review.rating >= 3 ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                        }`}>
                        {review.rating}.0
                    </Badge>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-slate-500">{review.rating}.0</span>
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                {/* Review Comment */}
                {review.comment && review.comment !== "💬💬" ? (
                    <div className="mb-4">
                        <p className="text-slate-700 italic line-clamp-3">&quot;{review.comment}&quot;</p>
                    </div>
                ) : (
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-500 italic">No comment provided</p>
                    </div>
                )}

                {/* Review Details */}
                <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500">Reviewed on</span>
                        <span className="font-medium">{formatDate(review.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-500">Host</span>
                        <Badge variant="outline" className="text-xs">
                            {review.hostEmail.split('@')[0]}
                        </Badge>
                    </div>
                </div>
            </CardContent>

            {/* <CardFooter className="pt-0">
                <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Helpful
                    </Button>
                    <Link href={`/hosts/${encodeURIComponent(review.hostEmail)}`} className="flex-1">
                        <Button variant="ghost" className="w-full" size="sm">
                            View Event
                        </Button>
                    </Link>
                </div>
            </CardFooter> */}
        </Card>
    );
}

// Review Card Skeleton
function ReviewCardSkeleton() {
    return (
        <Card className="animate-pulse">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-6 w-12" />
                </div>
                <Skeleton className="h-5 w-24" />
            </CardHeader>

            <CardContent className="pb-3">
                <Skeleton className="h-16 w-full mb-4" />
                <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                </div>
            </CardContent>

            <CardFooter>
                <div className="flex gap-2 w-full">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 flex-1" />
                </div>
            </CardFooter>
        </Card>
    );
}
