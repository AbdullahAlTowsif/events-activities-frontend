'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, AlertCircle, CheckCircle, XCircle, User, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';
import { IHostApplication, updateApplicationStatus } from '@/services/admin/host-application.service';

interface ApplicationReviewDialogProps {
    application: IHostApplication;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function ApplicationReviewDialog({
    application,
    open,
    onOpenChange,
    onSuccess
}: ApplicationReviewDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [feedback, setFeedback] = useState('');
    const [decision, setDecision] = useState<'APPROVED' | 'REJECTED' | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleSubmit = async () => {
        if (!decision) {
            setError('Please select a decision');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await updateApplicationStatus(application.id, {
                status: decision,
                feedback: feedback.trim() || undefined
            });

            if (result.success) {
                onSuccess();
                onOpenChange(false);
            } else {
                setError(result.message || 'Failed to update application status');
            }
        } catch (error) {
            console.error('Error updating application:', error);
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Review Application</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Applicant Profile */}
                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={application.user.profilePhoto} />
                            <AvatarFallback className="text-2xl">
                                {application.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{application.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm text-slate-600">{application.user.email}</span>
                                    </div>
                                </div>
                                <Badge className="bg-amber-100 text-amber-800">PENDING</Badge>
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
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm">Applied: {formatDate(application.createdAt)}</span>
                                </div>
                                {application.user.createdAt && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm">Joined: {formatDate(application.user.createdAt)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    {application.address && (
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Address
                            </h4>
                            <p className="text-slate-600">{application.address}</p>
                        </div>
                    )}

                    {/* Bio */}
                    {application.bio && (
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Bio
                            </h4>
                            <p className="text-slate-600 whitespace-pre-line">{application.bio}</p>
                        </div>
                    )}

                    {/* Interests */}
                    {application.interests && application.interests.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Interests</h4>
                            <div className="flex flex-wrap gap-2">
                                {application.interests.map((interest, index) => (
                                    <Badge key={index} variant="outline">
                                        {interest}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Decision */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900">Your Decision</h4>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                type="button"
                                variant={decision === 'APPROVED' ? 'default' : 'outline'}
                                className={`h-16 ${decision === 'APPROVED' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                onClick={() => setDecision('APPROVED')}
                                disabled={loading}
                            >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Approve Application
                            </Button>

                            <Button
                                type="button"
                                variant={decision === 'REJECTED' ? 'destructive' : 'outline'}
                                onClick={() => setDecision('REJECTED')}
                                disabled={loading}
                            >
                                <XCircle className="w-5 h-5 mr-2" />
                                Reject Application
                            </Button>
                        </div>

                        {/* Feedback */}
                        <div className="space-y-2">
                            <Label htmlFor="feedback">
                                Feedback {decision === 'REJECTED' ? '(Required)' : '(Optional)'}
                            </Label>
                            <Textarea
                                id="feedback"
                                placeholder={
                                    decision === 'APPROVED'
                                        ? 'Add optional congratulatory message...'
                                        : 'Please provide constructive feedback...'
                                }
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={3}
                                required={decision === 'REJECTED'}
                            />
                            <p className="text-xs text-slate-500">
                                {decision === 'APPROVED'
                                    ? 'This message will be sent to the applicant as a congratulatory note.'
                                    : 'This feedback will help the applicant understand why their application was rejected.'
                                }
                            </p>
                        </div>
                    </div>

                    {/* What happens next */}
                    {decision && (
                        <Alert className={decision === 'APPROVED' ? 'bg-green-50' : 'bg-red-50'}>
                            {decision === 'APPROVED' ? (
                                <>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <AlertDescription className="text-green-800">
                                        <strong>What happens when you approve:</strong>
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>User will be converted to a Host role</li>
                                            <li>New host account will be created</li>
                                            <li>Application record will be removed</li>
                                            <li>User will receive a confirmation email</li>
                                        </ul>
                                    </AlertDescription>
                                </>
                            ) : (
                                <>
                                    <XCircle className="h-4 w-4 text-red-600" />
                                    <AlertDescription className="text-red-800">
                                        <strong>What happens when you reject:</strong>
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>Application status will be updated to REJECTED</li>
                                            <li>User will receive your feedback</li>
                                            <li>User can re-apply after reviewing feedback</li>
                                        </ul>
                                    </AlertDescription>
                                </>
                            )}
                        </Alert>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!decision || loading}
                        className={
                            decision === 'APPROVED'
                                ? 'bg-green-600 hover:bg-green-700'
                                : decision === 'REJECTED'
                                    ? 'bg-red-600 hover:bg-red-700'
                                    : ''
                        }
                    >
                        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {decision === 'APPROVED' ? 'Approve Application' :
                            decision === 'REJECTED' ? 'Reject Application' :
                                'Submit Decision'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
