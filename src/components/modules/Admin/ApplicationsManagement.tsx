'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Users,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    Phone,
    MapPin,
    Calendar,
    FileText,
    RefreshCw,
    Eye,
    MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    getAllApplications,
    updateApplicationStatus,
    IHostApplication
} from '@/services/admin/host-application.service';
import ApplicationReviewDialog from './ApplicationReviewDialog';

export default function ApplicationsManagement() {
    // State
    const [applications, setApplications] = useState<IHostApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [selectedApplication, setSelectedApplication] = useState<IHostApplication | null>(null);
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [processing, setProcessing] = useState<string>('');

    // Fetch applications
    const fetchApplications = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const result = await getAllApplications();
            if (result.success) {
                setApplications(result.data);
            } else {
                setError(result.message || 'Failed to load applications');
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
            setError('An error occurred while loading applications');
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    // Handle quick approve
    const handleQuickApprove = async (applicationId: string, applicationName: string) => {
        if (processing === applicationId) return;

        setProcessing(applicationId);
        try {
            const result = await updateApplicationStatus(applicationId, {
                status: 'APPROVED',
                feedback: 'Congratulations! Your application has been approved.'
            });

            if (result.success) {
                // Remove from local state
                setApplications(prev => prev.filter(app => app.id !== applicationId));
            } else {
                setError(result.message || 'Failed to approve application');
            }
        } catch (error) {
            console.error('Error approving application:', error);
            setError('An error occurred while approving the application');
        } finally {
            setProcessing('');
        }
    };

    // Handle quick reject
    const handleQuickReject = async (applicationId: string) => {
        if (processing === applicationId) return;

        setProcessing(applicationId);
        try {
            const result = await updateApplicationStatus(applicationId, {
                status: 'REJECTED',
                feedback: 'Your application has been rejected. Please review our requirements and try again.'
            });

            if (result.success) {
                // Remove from local state
                setApplications(prev => prev.filter(app => app.id !== applicationId));
            } else {
                setError(result.message || 'Failed to reject application');
            }
        } catch (error) {
            console.error('Error rejecting application:', error);
            setError('An error occurred while rejecting the application');
        } finally {
            setProcessing('');
        }
    };

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

    // Stats
    const pendingCount = applications.filter(app => app.status === 'PENDING').length;
    const recentCount = applications.filter(app => {
        const appDate = new Date(app.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return appDate > weekAgo;
    }).length;

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Host Applications</h1>
                    <p className="text-slate-600">Review and manage applications from users wanting to become hosts</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatsCard
                        title="Pending Applications"
                        value={pendingCount}
                        description="Awaiting review"
                        icon={<Clock className="w-5 h-5" />}
                        color="amber"
                    />
                    <StatsCard
                        title="Total Applications"
                        value={applications.length}
                        description="All time"
                        icon={<Users className="w-5 h-5" />}
                        color="blue"
                    />
                    <StatsCard
                        title="This Week"
                        value={recentCount}
                        description="Last 7 days"
                        icon={<Calendar className="w-5 h-5" />}
                        color="purple"
                    />
                    <StatsCard
                        title="Average Time"
                        value="48h"
                        description="To process"
                        icon={<Clock className="w-5 h-5" />}
                        color="green"
                    />
                </div>

                {/* Applications List */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Pending Applications</CardTitle>
                        <div className="flex gap-2">
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
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-32 w-full" />
                                ))}
                            </div>
                        ) : applications.length === 0 ? (
                            <div className="text-center py-12">
                                <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    No Pending Applications
                                </h3>
                                <p className="text-slate-600 mb-6 max-w-sm mx-auto">
                                    All applications have been processed. Great work!
                                </p>
                                <Button onClick={fetchApplications} variant="outline">
                                    Check for New Applications
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((application) => (
                                    <ApplicationCard
                                        key={application.id}
                                        application={application}
                                        processing={processing === application.id}
                                        onViewDetails={() => {
                                            setSelectedApplication(application);
                                            setShowReviewDialog(true);
                                        }}
                                        onQuickApprove={() => handleQuickApprove(application.id, application.name)}
                                        onQuickReject={() => handleQuickReject(application.id)}
                                        timeAgo={timeAgo(application.createdAt)}
                                        formatDate={formatDate}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Application Review Dialog */}
            {selectedApplication && (
                <ApplicationReviewDialog
                    application={selectedApplication}
                    open={showReviewDialog}
                    onOpenChange={setShowReviewDialog}
                    onSuccess={() => {
                        setShowReviewDialog(false);
                        fetchApplications(); // Refresh list
                    }}
                />
            )}
        </>
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
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-sm text-slate-500">{title}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center`}>
                        <div className={`text-${color}-600`}>
                            {icon}
                        </div>
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
    processing,
    onViewDetails,
    onQuickApprove,
    onQuickReject,
    timeAgo,
    formatDate
}: {
    application: IHostApplication;
    processing: boolean;
    onViewDetails: () => void;
    onQuickApprove: () => void;
    onQuickReject: () => void;
    timeAgo: string;
    formatDate: (date: string) => string;
}) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    {/* Applicant Info */}
                    <div className="flex-1 p-6">
                        <div className="flex items-start gap-4">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={application.user.profilePhoto} />
                                <AvatarFallback className="text-lg">
                                    {application.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">{application.name}</h3>
                                        <p className="text-sm text-slate-600">{application.user.email}</p>
                                    </div>
                                    <Badge className="bg-amber-100 text-amber-800">
                                        Pending
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {application.contactNumber && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm">{application.contactNumber}</span>
                                        </div>
                                    )}
                                    {application.gender && (
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm capitalize">{application.gender.toLowerCase()}</span>
                                        </div>
                                    )}
                                    {application.address && (
                                        <div className="flex items-center gap-2 col-span-2">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm line-clamp-1">{application.address}</span>
                                        </div>
                                    )}
                                </div>

                                {application.interests && application.interests.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-slate-700 mb-2">Interests</p>
                                        <div className="flex flex-wrap gap-2">
                                            {application.interests.map((interest, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {interest}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {application.bio && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-slate-700 mb-2">Bio</p>
                                        <p className="text-sm text-slate-600 line-clamp-2">{application.bio}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="bg-slate-50 p-6 border-l border-slate-200 min-w-[280px]">
                        <div className="space-y-4">
                            {/* Application Info */}
                            <div className="space-y-2">
                                <div className="text-sm">
                                    <span className="text-slate-500">Applied:</span>{' '}
                                    <span className="font-medium">{timeAgo}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-slate-500">Date:</span>{' '}
                                    <span className="font-medium">{formatDate(application.createdAt)}</span>
                                </div>
                            </div>

                            <Separator />

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    onClick={onViewDetails}
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </Button>

                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        onClick={onQuickApprove}
                                        disabled={processing}
                                        className="w-full bg-green-600 hover:bg-green-700"
                                    >
                                        {processing ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Approve
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        onClick={onQuickReject}
                                        disabled={processing}
                                        variant="destructive"
                                        className="w-full"
                                    >
                                        {processing ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <XCircle className="w-4 h-4 mr-2" />
                                                Reject
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
