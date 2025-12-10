import DashboardContent from "@/components/modules/Dashboard/DashboardContent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "My Dashboard | EventHub",
    description: "View your personal information and account details",
};

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
            <div className="container mx-auto px-4 py-8">
                <Suspense fallback={<DashboardLoading />}>
                    <DashboardContent />
                </Suspense>
            </div>
        </div>
    );
}

function DashboardLoading() {
    return (
        <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="h-10 w-64 bg-slate-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-4 w-96 bg-slate-200 rounded animate-pulse"></div>
            </div>

            {/* Main Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column Skeleton */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Card Skeleton */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 bg-slate-200 rounded-full animate-pulse"></div>
                            <div className="space-y-3 flex-1">
                                <div className="h-6 w-48 bg-slate-200 rounded animate-pulse"></div>
                                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-3 w-20 bg-slate-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow p-6">
                                <div className="h-4 w-24 bg-slate-200 rounded mb-3 animate-pulse"></div>
                                <div className="h-8 w-16 bg-slate-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column Skeleton */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="h-6 w-32 bg-slate-200 rounded mb-4 animate-pulse"></div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-16 bg-slate-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
