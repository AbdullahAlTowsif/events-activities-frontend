import PersonsManagement from '@/components/modules/Admin/Person/PersonsManagement';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Manage Persons - Admin Dashboard',
    description: 'Manage all users, hosts, and admins on the platform',
};

export default function ManagePersonsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8">
                <Suspense fallback={<PersonsLoading />}>
                    <PersonsManagement />
                </Suspense>
            </div>
        </div>
    );
}

function PersonsLoading() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="mb-6">
                <div className="h-8 w-48 bg-slate-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-64 bg-slate-200 rounded animate-pulse"></div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-slate-200 rounded-lg animate-pulse"></div>
                ))}
            </div>

            {/* Filters Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 bg-slate-200 rounded animate-pulse"></div>
                ))}
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-lg shadow">
                <div className="h-12 bg-slate-200 rounded-t-lg animate-pulse"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-16 border-b border-slate-200 animate-pulse">
                        <div className="h-full flex items-center px-6">
                            <div className="flex-1 grid grid-cols-6 gap-4">
                                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                <div className="h-4 w-20 bg-slate-200 rounded"></div>
                                <div className="h-4 w-16 bg-slate-200 rounded"></div>
                                <div className="h-4 w-20 bg-slate-200 rounded"></div>
                                <div className="h-4 w-16 bg-slate-200 rounded"></div>
                            </div>
                            <div className="h-8 w-24 bg-slate-200 rounded ml-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
