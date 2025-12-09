import ReviewsContent from '@/components/modules/Home/ReviewsContent';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Community Reviews - Events Platform',
    description: 'Read what others are saying about hosts and events on our platform',
};

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4 py-8">
                <Suspense fallback={<ReviewsLoading />}>
                    <ReviewsContent />
                </Suspense>
            </div>
        </div>
    );
}

function ReviewsLoading() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="mb-6">
                <div className="h-8 w-64 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-96 bg-slate-200 rounded animate-pulse"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-white rounded-lg shadow animate-pulse"></div>
                ))}
            </div>

            {/* Filters Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 bg-white rounded-lg shadow animate-pulse"></div>
                ))}
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-80 bg-white rounded-lg shadow animate-pulse"></div>
                ))}
            </div>
        </div>
    );
}
