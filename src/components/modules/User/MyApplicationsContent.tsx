'use client';

import { useState, useEffect } from 'react';
import {
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    UserPlus,
    RefreshCw,
    Calendar,
    MessageSquare,
    Eye,
    Info,
    ArrowRight,
    Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { getMyApplications, IMyApplication } from '@/services/user/myApplication';
import ApplicationDetailsDialog from './ApplicationDetailsDialog';

export default function MyApplicationsContent() {
    // State
    const [applications, setApplications] = useState<IMyApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [selectedApplication, setSelectedApplication] = useState<IMyApplication | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    // Fetch applications
    const fetchApplications = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await getMyApplications();
            if (result.success) {
                setApplications(result.data);
            } else {
                setError(result.message || 'Failed to load applications');
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
            setError('An error occurred while loading your applications');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchApplications();
    }, []);

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate time ago
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    };

    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <Badge className="bg-amber-100 text-amber-800">Pending Review</Badge>;
            case 'APPROVED':
                return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
            case 'REJECTED':
                return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
            case 'CANCELLED':
                return <Badge className="bg-slate-100 text-slate-800">Cancelled</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    // Get status icon
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <Clock className="w-5 h-5 text-amber-500" />;
            case 'APPROVED':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'REJECTED':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'CANCELLED':
                return <AlertCircle className="w-5 h-5 text-slate-500" />;
            default:
                return <Info className="w-5 h-5 text-slate-500" />;
        }
    };

    // Stats
    const pendingCount = applications.filter(app => app.status === 'PENDING').length;
    const approvedCount = applications.filter(app => app.status === 'APPROVED').length;
    const hasActiveApplication = applications.some(app => app.status === 'PENDING');

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">My Host Applications</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Track the status of your applications to become a host on our platform
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <StatsCard
                        title="Active Applications"
                        value={pendingCount}
                        description="Awaiting review"
                        icon={<Clock className="w-5 h-5" />}
                        color="amber"
                    />
                    <StatsCard
                        title="Total Applications"
                        value={applications.length}
                        description="All time"
                        icon={<FileText className="w-5 h-5" />}
                        color="blue"
                    />
                    <StatsCard
                        title="Approved"
                        value={approvedCount}
                        description="Successful applications"
                        icon={<CheckCircle className="w-5 h-5" />}
                        color="green"
                    />
                </div>

                {/* Call to Action */}
                {!hasActiveApplication && applications.length === 0 && (
                    <Card className="border-dashed border-2 border-blue-300 bg-blue-50">
                        <CardContent className="py-12 text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <UserPlus className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                No Applications Yet
                            </h3>
                            <p className="text-slate-600 mb-6 max-w-md mx-auto">
                                You haven&apos;t applied to become a host yet. Start your journey by submitting an application!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/apply">
                                    <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="lg">
                                        <UserPlus className="w-5 h-5 mr-2" />
                                        Apply to Become a Host
                                    </Button>
                                </Link>
                                <Link href="/hosts">
                                    <Button variant="outline" size="lg">
                                        <Shield className="w-5 h-5 mr-2" />
                                        View Hosts
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Active Application Notice */}
                {hasActiveApplication && (
                    <Alert className="bg-amber-50 border-amber-200 mb-6">
                        <Clock className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800">
                            <strong>You have an active application pending review.</strong> Please wait for our team to review your application. You can track its status below.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Applications List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-slate-900">Application History</h2>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchApplications}
                            disabled={loading}
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>

                    {loading ? (
                        <LoadingSkeleton />
                    ) : applications.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    No Application History
                                </h3>
                                <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                                    You haven&apos;t submitted any applications yet.
                                </p>
                                <Link href="/apply">
                                    <Button className="bg-linear-to-r from-blue-600 to-purple-600">
                                        Submit Your First Application
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {applications.map((application) => (
                                <ApplicationCard
                                    key={application.id}
                                    application={application}
                                    onViewDetails={() => {
                                        setSelectedApplication(application);
                                        setShowDetailsDialog(true);
                                    }}
                                    timeAgo={timeAgo(application.createdAt)}
                                    formatDate={formatDate}
                                    getStatusBadge={getStatusBadge}
                                    getStatusIcon={getStatusIcon}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Application Details Dialog */}
            {selectedApplication && (
                <ApplicationDetailsDialog
                    application={selectedApplication}
                    open={showDetailsDialog}
                    onOpenChange={setShowDetailsDialog}
                />
            )}
        </>
    );
}

// Loading Skeleton Component
function LoadingSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                                <div className="space-y-2">
                                    <div className="h-5 w-40 bg-slate-200 rounded"></div>
                                    <div className="h-3 w-32 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                            <div className="h-6 w-24 bg-slate-200 rounded"></div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-slate-200 rounded"></div>
                            <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex gap-2 w-full">
                            <div className="h-9 flex-1 bg-slate-200 rounded"></div>
                            <div className="h-9 w-24 bg-slate-200 rounded"></div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

// Stats Card Component
function StatsCard({
    title,
    value,
    description,
    icon,
    color
}: {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
    color: string;
}) {
    const colorClasses = {
        amber: 'bg-amber-100 text-amber-600',
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-sm text-slate-500">{title}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
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

// Application Card Component
function ApplicationCard({
    application,
    onViewDetails,
    timeAgo,
    formatDate,
    getStatusBadge,
    getStatusIcon
}: {
    application: IMyApplication;
    onViewDetails: () => void;
    timeAgo: string;
    formatDate: (date: string) => string;
    getStatusBadge: (status: string) => React.ReactNode;
    getStatusIcon: (status: string) => React.ReactNode;
}) {
    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            {getStatusIcon(application.status)}
                        </div>
                        <div>
                            <CardTitle className="text-lg">Host Application</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                {timeAgo} • {formatDate(application.createdAt)}
                            </CardDescription>
                        </div>
                    </div>
                    {getStatusBadge(application.status)}
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                <div className="space-y-4">
                    {/* Application Summary */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-slate-500">Name</p>
                            <p className="font-medium">{application.name}</p>
                        </div>
                        {application.contactNumber && (
                            <div>
                                <p className="text-sm text-slate-500">Contact</p>
                                <p className="font-medium">{application.contactNumber}</p>
                            </div>
                        )}
                        {application.interests && application.interests.length > 0 && (
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500 mb-1">Interests</p>
                                <div className="flex flex-wrap gap-1">
                                    {application.interests.slice(0, 3).map((interest, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {interest}
                                        </Badge>
                                    ))}
                                    {application.interests.length > 3 && (
                                        <span className="text-xs text-slate-500">
                                            +{application.interests.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Feedback (if available) */}
                    {application.feedback && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-start gap-2">
                                <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-blue-800 mb-1">Feedback</p>
                                    <p className="text-sm text-blue-700 line-clamp-2">{application.feedback}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pt-0">
                <div className="flex gap-2 w-full">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onViewDetails}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                    </Button>

                    {application.status === 'APPROVED' && (
                        <Link href="/dashboard/host" className="flex-1">
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                Go to Host Dashboard
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
