import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function MyEventsLoading() {
    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <Skeleton className="h-10 w-64 mb-2" />
                        <Skeleton className="h-5 w-48" />
                    </div>
                    <Skeleton className="h-10 w-40" />
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i}>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-8 w-16" />
                                    </div>
                                    <Skeleton className="w-8 h-8 rounded-full" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Search Bar Skeleton */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <Skeleton className="h-12 flex-1" />
                        <Skeleton className="h-12 w-48" />
                    </div>
                </CardContent>
            </Card>

            {/* Filter Buttons Skeleton */}
            <div className="flex flex-wrap gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-10 w-20 rounded-full" />
                ))}
            </div>

            {/* Events Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-20" />
                                    </div>
                                    <Skeleton className="h-6 w-full" />
                                </div>
                                <Skeleton className="w-8 h-8 rounded" />
                            </div>
                        </CardHeader>
                        <CardContent className="pb-3 space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((j) => (
                                    <div key={j} className="flex items-center gap-3">
                                        <Skeleton className="w-4 h-4 rounded" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardContent className="pt-3 border-t border-slate-100">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-24" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-16" />
                                    <Skeleton className="h-8 w-16" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
