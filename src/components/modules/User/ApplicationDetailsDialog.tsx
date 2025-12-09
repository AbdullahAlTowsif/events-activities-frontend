'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
    Calendar,
    Clock,
    User,
    Phone,
    MapPin,
    FileText,
    MessageSquare,
    CheckCircle,
    XCircle,
    AlertCircle,
    Info,
    Mail
} from 'lucide-react';
import { IMyApplication } from '@/services/user/myApplication';

interface ApplicationDetailsDialogProps {
    application: IMyApplication;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ApplicationDetailsDialog({
    application,
    open,
    onOpenChange
}: ApplicationDetailsDialogProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

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

    const getStatusMessage = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Your application is currently under review by our team. Please check back later for updates.';
            case 'APPROVED':
                return 'Congratulations! Your application has been approved. You can now access the host dashboard.';
            case 'REJECTED':
                return 'Your application has been reviewed but was not approved. Please see the feedback below.';
            case 'CANCELLED':
                return 'You have cancelled this application. You can submit a new application at any time.';
            default:
                return '';
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Application Details
                        <Badge className={`
              ${application.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                                application.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                    application.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                        'bg-slate-100 text-slate-800'}
            `}>
                            {application.status}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Status Overview */}
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        {getStatusIcon(application.status)}
                        <div>
                            <p className="font-medium text-slate-900 mb-1">Status: {application.status}</p>
                            <p className="text-sm text-slate-600">{getStatusMessage(application.status)}</p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-slate-900">Timeline</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm">Submitted</span>
                                </div>
                                <span className="text-sm font-medium">{formatDate(application.createdAt)}</span>
                            </div>

                            {application.updatedAt && application.updatedAt !== application.createdAt && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm">Last Updated</span>
                                    </div>
                                    <span className="text-sm font-medium">{formatDate(application.updatedAt)}</span>
                                </div>
                            )}

                            {application.reviewedAt && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm">Reviewed</span>
                                    </div>
                                    <span className="text-sm font-medium">{formatDate(application.reviewedAt)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Applicant Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-900">Applicant Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-400" />
                                    <span className="font-medium">Name</span>
                                </div>
                                <p className="text-slate-600">{application.name}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span className="font-medium">Email</span>
                                </div>
                                <p className="text-slate-600">{application.userEmail}</p>
                            </div>

                            {application.gender && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium">Gender</span>
                                    </div>
                                    <p className="text-slate-600 capitalize">{application.gender.toLowerCase()}</p>
                                </div>
                            )}

                            {application.contactNumber && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium">Contact Number</span>
                                    </div>
                                    <p className="text-slate-600">{application.contactNumber}</p>
                                </div>
                            )}

                            {application.address && (
                                <div className="space-y-2 md:col-span-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium">Address</span>
                                    </div>
                                    <p className="text-slate-600">{application.address}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    {application.bio && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Bio
                                </h3>
                                <p className="text-slate-600 whitespace-pre-line">{application.bio}</p>
                            </div>
                        </>
                    )}

                    {/* Interests */}
                    {application.interests && application.interests.length > 0 && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <h3 className="font-semibold text-slate-900">Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {application.interests.map((interest, index) => (
                                        <Badge key={index} variant="outline">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Feedback */}
                    {application.feedback && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Feedback from Review Team
                                </h3>
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-slate-700 whitespace-pre-line">{application.feedback}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Reviewed By */}
                    {application.reviewedBy && (
                        <div className="text-sm text-slate-500">
                            Reviewed by: {application.reviewedBy}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
