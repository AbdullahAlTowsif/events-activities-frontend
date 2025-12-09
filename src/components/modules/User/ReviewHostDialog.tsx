/* eslint-disable @typescript-eslint/no-explicit-any */
// components/modules/Event/ReviewHostDialog.tsx
'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, Star, Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import { IEvent } from '@/types/event.interface';
import { IHost } from '@/types/host.interface';
import { createReview, ICreateReviewPayload } from '@/services/review/review.service';

interface ReviewHostDialogProps {
    event: IEvent;
    host: IHost;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export default function ReviewHostDialog({
    event,
    host,
    open,
    onOpenChange,
    onSuccess
}: ReviewHostDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Handle star click
    const handleStarClick = (starValue: number) => {
        setRating(starValue);
    };

    // Handle star hover
    const handleStarHover = (starValue: number) => {
        setHoverRating(starValue);
    };

    // Handle star leave
    const handleStarLeave = () => {
        setHoverRating(0);
    };

    // Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (comment.trim().length < 10) {
            setError('Please write a comment (minimum 10 characters)');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const payload: ICreateReviewPayload = {
                rating,
                comment: comment.trim(),
            };

            await createReview(event.id!, payload);

            // Show success state
            setSuccess(true);

            // Reset form after 2 seconds and close dialog
            setTimeout(() => {
                setSuccess(false);
                setRating(0);
                setComment('');
                onOpenChange(false);

                // Call success callback if provided
                if (onSuccess) {
                    onSuccess();
                }
            }, 2000);

        } catch (error: any) {
            console.error('Error submitting review:', error);
            setError(error.message || 'Failed to submit review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // If review was successful, show success message
    if (success) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            Review Submitted!
                        </h3>
                        <p className="text-slate-600">
                            Thank you for reviewing {host.name}. Your feedback helps other users.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Review Host</DialogTitle>
                    <DialogDescription>
                        Share your experience with {host.name} after attending their event.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Info */}
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-slate-900 mb-2">Event Details</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span>{formatDate(event.dateTime)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-slate-400" />
                                <span>{event.title}</span>
                            </div>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Star Rating */}
                    <div className="space-y-3">
                        <Label htmlFor="rating">
                            Rating <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleStarClick(star)}
                                    onMouseEnter={() => handleStarHover(star)}
                                    onMouseLeave={handleStarLeave}
                                    className="p-1 focus:outline-none"
                                    disabled={loading}
                                >
                                    <Star
                                        className={`w-8 h-8 transition-colors ${star <= (hoverRating || rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'fill-gray-200 text-gray-200'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between text-sm text-slate-500">
                            <span>Poor</span>
                            <span>Excellent</span>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <Label htmlFor="comment">
                            Your Review <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="comment"
                            placeholder={`Share your experience with ${host.name}. What did you like? Any suggestions?`}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            required
                            disabled={loading}
                            minLength={10}
                        />
                        <p className="text-xs text-slate-500">
                            Minimum 10 characters. Your review helps other users choose events.
                        </p>
                    </div>

                    {/* Guidelines */}
                    <Alert className="bg-blue-50">
                        <AlertDescription className="text-blue-800 text-sm">
                            <strong>Review Guidelines:</strong>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                                <li>Be honest and constructive</li>
                                <li>Focus on the host&apos;s organization and communication</li>
                                <li>Avoid personal attacks or offensive language</li>
                                <li>Reviews cannot be edited after submission</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

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
                            type="submit"
                            disabled={loading || rating === 0 || comment.trim().length < 10}
                            className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Submit Review
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
