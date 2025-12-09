"use client";

import { useState, useEffect, useCallback } from 'react';
import { IEvent } from '@/types/event.interface';
import { IHost } from '@/types/host.interface';
import { User, Mail, MapPin, Star, Calendar, Users, Phone, MessageSquare, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import ReviewHostDialog from '../User/ReviewHostDialog';
import { getHostAverageRating, IReview } from '@/services/review/review.service';

interface HostProfileProps {
    host: IHost;
    event: IEvent;
}

export default function HostProfile({ host, event }: HostProfileProps) {
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch host reviews
    const fetchHostReviews = useCallback(async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }
        setError(null);

        try {
            const result = await getHostAverageRating(host.email);

            setReviews(result.reviews);
            setAverageRating(result.averageRating);
            setTotalReviews(result.totalReviews);

            console.log(`Fetched ${result.totalReviews} reviews for host ${host.email}`);
        } catch (error) {
            console.error('Error fetching host reviews:', error);
            setError('Failed to load reviews. Please try again.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [host.email]);

    // Initial fetch
    useEffect(() => {
        fetchHostReviews();
    }, [fetchHostReviews]);

    // Handle refresh
    const handleRefresh = () => {
        fetchHostReviews(true);
    };

    // Handle review submission success
    const handleReviewSuccess = () => {
        // Refresh reviews after successful submission
        fetchHostReviews(true);
        console.log('Review submitted successfully, refreshing reviews...');
    };

    // Check if event has passed (can only review after event)
    const eventDate = new Date(event.dateTime);
    const now = new Date();
    const canReview = eventDate <= now;

    // Format date for display
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 sticky top-6">
                <div className="text-center mb-6">
                    <div className="relative inline-block mb-4">
                        {host.profilePhoto ? (
                            <Image
                                src={host.profilePhoto}
                                alt={host.name}
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center border-4 border-white shadow-lg">
                                <User className="w-12 h-12 text-white" />
                            </div>
                        )}
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1">{host.name}</h3>
                    <p className="text-slate-600 text-sm">Event Host</p>
                </div>

                {/* Rating Section with Refresh Button */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">Host Rating</h4>
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                            title="Refresh reviews"
                        >
                            <RefreshCw className={`w-4 h-4 text-slate-500 ${refreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    {loading && !refreshing ? (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="h-5 w-32 bg-slate-200 rounded animate-pulse"></div>
                            <div className="h-3 w-24 bg-slate-200 rounded animate-pulse"></div>
                        </div>
                    ) : error ? (
                        <div className="p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                            <button
                                onClick={() => fetchHostReviews(true)}
                                className="text-sm text-red-700 underline mt-1"
                            >
                                Try again
                            </button>
                        </div>
                    ) : totalReviews > 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(averageRating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'fill-gray-200 text-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-slate-700 font-medium text-lg">
                                    {averageRating.toFixed(1)}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500">
                                {totalReviews} review{totalReviews !== 1 ? 's' : ''}
                                {averageRating > 0 && ` • ${averageRating.toFixed(1)} average`}
                            </p>
                        </div>
                    ) : (
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <div className="flex items-center gap-2 text-amber-700">
                                <Star className="w-4 h-4" />
                                <span className="text-sm font-medium">No reviews yet</span>
                            </div>
                            <p className="text-amber-600 text-sm mt-1">
                                Be the first to review this host after attending an event!
                            </p>
                        </div>
                    )}
                </div>

                {/* Host Details */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-sm text-slate-500">Email</div>
                            <div className="font-medium text-slate-900 truncate">{host.email}</div>
                        </div>
                    </div>

                    {host.contactNumber && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                <Phone className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500">Contact</div>
                                <div className="font-medium text-slate-900">{host.contactNumber}</div>
                            </div>
                        </div>
                    )}

                    {host.address && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-500">Address</div>
                                <div className="font-medium text-slate-900">{host.address}</div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                            <Calendar className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                            <div className="text-sm text-slate-500">Host Since</div>
                            <div className="font-medium text-slate-900">
                                {new Date(event.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Host Bio */}
                {host.about && (
                    <div className="mb-6">
                        <h4 className="font-semibold text-slate-900 mb-2">About the Host</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{host.about}</p>
                    </div>
                )}

                {/* Recent Reviews Preview */}
                {!loading && reviews.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-slate-900">Recent Reviews</h4>
                            <span className="text-xs text-slate-500">
                                Showing {Math.min(reviews.length, 2)} of {reviews.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {reviews.slice(0, 2).map((review) => (
                                <div key={review.id} className="p-3 bg-slate-50 rounded-lg">
                                    <div className="flex items-start justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            {review.reviewer.profilePhoto ? (
                                                <Image
                                                    src={review.reviewer.profilePhoto}
                                                    alt={review.reviewer.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center">
                                                    <User className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-medium">{review.reviewer.name}</p>
                                                <div className="flex items-center gap-1">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-3 h-3 ${i < review.rating
                                                                        ? 'fill-yellow-400 text-yellow-400'
                                                                        : 'fill-gray-200 text-gray-200'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-slate-500">
                                                        {formatDate(review.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {review.comment && review.comment !== "💬💬" && (
                                        <p className="text-slate-600 text-sm mt-2">
                                            &quot;{review.comment}&quot;
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Loading state for reviews */}
                {loading && (
                    <div className="mb-6 space-y-3">
                        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
                        {[1, 2].map((i) => (
                            <div key={i} className="p-3 bg-slate-100 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-slate-300 rounded-full animate-pulse"></div>
                                    <div className="space-y-1">
                                        <div className="h-3 w-24 bg-slate-300 rounded animate-pulse"></div>
                                        <div className="h-2 w-16 bg-slate-300 rounded animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="h-3 w-full bg-slate-300 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    {canReview ? (
                        <button
                            onClick={() => setShowReviewDialog(true)}
                            className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            <MessageSquare className="w-5 h-5" />
                            {loading ? 'Loading...' : 'Review Host'}
                        </button>
                    ) : (
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="flex items-center gap-2 text-slate-700">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Review Available After Event</span>
                            </div>
                            <p className="text-slate-600 text-sm mt-1">
                                You can review this host after the event on {new Date(event.dateTime).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Review Dialog */}
            <ReviewHostDialog
                event={event}
                host={host}
                open={showReviewDialog}
                onOpenChange={setShowReviewDialog}
                onSuccess={handleReviewSuccess}
            />
        </>
    );
}
