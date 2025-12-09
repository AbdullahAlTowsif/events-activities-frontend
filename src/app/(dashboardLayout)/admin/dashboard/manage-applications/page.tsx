import ApplicationsManagement from '@/components/modules/Admin/ApplicationsManagement';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Manage Applications - Admin Dashboard',
    description: 'Review and manage host applications',
};

export default function ManageApplicationsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8">
                <Suspense fallback={<ApplicationsLoading />}>
                    <ApplicationsManagement />
                </Suspense>
            </div>
        </div>
    );
}

function ApplicationsLoading() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="mb-6">
                <div className="h-8 w-48 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-64 bg-slate-200 rounded animate-pulse"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-white rounded-lg shadow animate-pulse"></div>
                ))}
            </div>

            {/* Applications Skeleton */}
            <div className="bg-white rounded-lg shadow">
                <div className="h-12 bg-slate-200 rounded-t-lg animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 border-b border-slate-200 animate-pulse">
                        <div className="h-full flex items-center px-6">
                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-40 bg-slate-200 rounded"></div>
                                <div className="h-3 w-64 bg-slate-200 rounded"></div>
                                <div className="h-3 w-48 bg-slate-200 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-8 w-24 bg-slate-200 rounded"></div>
                                <div className="h-8 w-24 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
