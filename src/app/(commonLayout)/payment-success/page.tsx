/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Clock, Home, Calendar, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { verifyPayment } from '@/services/event/event.service';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [eventId, setEventId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [isManualUpdating, setIsManualUpdating] = useState(false);

    useEffect(() => {
        const sessionIdParam = searchParams.get('session_id');
        const eventIdParam = searchParams.get('eventId');

        if (sessionIdParam) {
            setSessionId(sessionIdParam);
            setEventId(eventIdParam);

            // Start polling for payment verification
            verifyPaymentStatus(sessionIdParam);
        } else {
            setIsLoading(false);
            setVerificationError('No session ID found in URL');
        }
    }, [searchParams]);

    const verifyPaymentStatus = async (sessionId: string) => {
        setIsVerifying(true);
        setVerificationError(null);
        setVerificationSuccess(false);

        console.log('Starting payment verification for session:', sessionId);

        try {
            const maxAttempts = 30; // Increased to 60 seconds (30 * 2 seconds)
            let attempts = 0;

            const pollPayment = async (): Promise<boolean> => {
                attempts++;
                console.log(`Verification attempt ${attempts} for session: ${sessionId}`);

                try {
                    const result = await verifyPayment(sessionId);
                    console.log('Verification result:', result);

                    if (result.success) {
                        setPaymentStatus(result.data?.status);
                        console.log('Payment status:', result.data?.status);

                        if (result.data?.status === 'SUCCESS') {
                            console.log('Payment verified successfully!');
                            setVerificationSuccess(true);
                            setIsLoading(false);
                            setIsVerifying(false);
                            return true;
                        } else if (result.data?.status === 'PENDING') {
                            console.log('Payment still pending, will poll again...');

                            // After 10 attempts (20 seconds), show a warning but continue polling
                            if (attempts === 10) {
                                setVerificationError('Payment is taking longer than usual to process. Please wait while we continue checking...');
                            }

                            if (attempts < maxAttempts) {
                                setTimeout(pollPayment, 2000);
                            } else {
                                console.log('Max attempts reached');
                                setVerificationError('Payment verification is taking longer than expected. Your payment was received but processing is delayed. You can try updating the status manually or check back later.');
                                setIsLoading(false);
                                setIsVerifying(false);
                                return false;
                            }
                        } else if (result.data?.status === 'FAILED') {
                            console.log('Payment failed');
                            setVerificationError('Payment failed. Please try again or contact support.');
                            setIsLoading(false);
                            setIsVerifying(false);
                            return false;
                        } else {
                            console.log('Payment not successful, status:', result.data?.status);
                            setVerificationError(`Payment status: ${result.data?.status || 'UNKNOWN'}. Please check your dashboard or contact support.`);
                            setIsLoading(false);
                            setIsVerifying(false);
                            return false;
                        }
                    } else {
                        console.log('Verification failed:', result.message);

                        // If 404 error, maybe webhook hasn't processed yet
                        if (result.message?.includes('404') || result.message?.includes('not found')) {
                            if (attempts < maxAttempts) {
                                console.log(`Payment record not found yet, will retry (attempt ${attempts}/${maxAttempts})`);
                                setTimeout(pollPayment, 2000);
                            } else {
                                setVerificationError('Payment record not found yet. This could mean: 1) The payment is still being processed, 2) There was an issue recording the payment. Please check your email and dashboard.');
                                setIsLoading(false);
                                setIsVerifying(false);
                                return false;
                            }
                        } else {
                            throw new Error(result.message || 'Failed to verify payment');
                        }
                    }
                } catch (error) {
                    console.error('Error in verification attempt:', error);

                    if (attempts < maxAttempts) {
                        console.log(`Will retry in 2 seconds (attempt ${attempts}/${maxAttempts})`);
                        setTimeout(pollPayment, 2000);
                    } else {
                        console.log('Max attempts reached with errors');
                        setVerificationError('Unable to verify payment status. Please check your dashboard or contact support.');
                        setIsLoading(false);
                        setIsVerifying(false);
                        return false;
                    }
                }
                return false;
            };

            await pollPayment();

        } catch (error: any) {
            console.error('Payment verification error:', error);
            setVerificationError(error.message || 'Failed to verify payment');
            setIsLoading(false);
            setIsVerifying(false);
        }
    };

    const handleManualCheck = () => {
        if (sessionId) {
            verifyPaymentStatus(sessionId);
        }
    };

    // Add this function to your component
    const triggerManualWebhook = async () => {
        if (!sessionId) return;

        setIsManualUpdating(true);
        setVerificationError(null);

        try {
            console.log('Triggering manual webhook for session:', sessionId);

            const response = await fetch(`/api/payment/manual-webhook?session_id=${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            console.log('Manual webhook result:', result);

            if (result.success) {
                // Show success message
                setVerificationError('Payment status updated successfully! Checking again...');

                // Wait 2 seconds then check again
                setTimeout(() => {
                    verifyPaymentStatus(sessionId);
                    setIsManualUpdating(false);
                }, 2000);
            } else {
                setVerificationError(`Failed to update payment: ${result.message}`);
                setIsManualUpdating(false);
            }
        } catch (error: any) {
            console.error('Manual webhook error:', error);
            setVerificationError(`Error updating payment: ${error.message}`);
            setIsManualUpdating(false);
        }
    };

    const handleGoToEvent = () => {
        if (eventId) {
            router.push(`/events/${eventId}`);
        } else {
            router.push('/events');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-4 text-slate-600">Processing your payment...</p>
                    <p className="text-sm text-slate-400 mt-2">Please wait while we confirm your payment</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <Card className="border-emerald-200 shadow-xl">
                        <CardContent className="pt-12 pb-8 text-center">
                            {/* Success Icon - changes color based on state */}
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${verificationSuccess ? 'bg-emerald-100' :
                                verificationError ? 'bg-amber-100' :
                                    'bg-blue-100'
                                }`}>
                                {verificationSuccess ? (
                                    <CheckCircle className="w-12 h-12 text-emerald-600" />
                                ) : verificationError ? (
                                    <AlertCircle className="w-12 h-12 text-amber-600" />
                                ) : (
                                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                {verificationSuccess ? 'Payment Confirmed!' :
                                    verificationError ? 'Payment Status Update' :
                                        'Verifying Payment...'}
                            </h1>

                            {/* Status Messages */}
                            {isVerifying ? (
                                <div className="mb-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                                    <p className="text-lg text-slate-600 mb-4">
                                        Verifying your payment confirmation...
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        This usually takes a few seconds. Please don&apos;t close this page.
                                    </p>
                                </div>
                            ) : verificationError ? (
                                <div className="mb-8 space-y-4">
                                    <Alert variant={paymentStatus === 'PENDING' ? "default" : "destructive"} className="text-left">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            {verificationError}
                                        </AlertDescription>
                                    </Alert>

                                    {paymentStatus === 'PENDING' && (
                                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                                            <p className="text-sm text-amber-800 mb-3">
                                                <strong>Why this might be happening:</strong>
                                            </p>
                                            <ul className="text-sm text-amber-700 space-y-2 text-left">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">•</span>
                                                    <span>The webhook from Stripe might be delayed</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">•</span>
                                                    <span>Your payment was successful but our system hasn&apos;t processed it yet</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">•</span>
                                                    <span>This is common in test mode/development</span>
                                                </li>
                                            </ul>
                                        </div>
                                    )}

                                    <div className="p-4 bg-slate-50 rounded-lg">
                                        <p className="text-sm text-slate-600 mb-3">
                                            <strong>What to do next:</strong>
                                        </p>
                                        <ul className="text-sm text-slate-600 space-y-2 text-left">
                                            <li className="flex items-start gap-2">
                                                <span className="text-emerald-500">✓</span>
                                                <span>Check your email for payment confirmation from Stripe</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-emerald-500">✓</span>
                                                <span>Verify the payment in your bank statement</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-emerald-500">✓</span>
                                                <span>Wait a few minutes and check again</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-emerald-500">✓</span>
                                                <span>Contact support if the issue persists</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : verificationSuccess ? (
                                <div className="mb-8 space-y-4">
                                    <p className="text-lg text-slate-600 max-w-md mx-auto">
                                        Your payment has been successfully confirmed! Your event registration is now complete.
                                    </p>

                                    <div className="p-4 bg-emerald-50 rounded-lg">
                                        <p className="text-sm text-emerald-700 mb-2">
                                            <strong>Next steps:</strong>
                                        </p>
                                        <ul className="text-sm text-emerald-600 space-y-2 text-left">
                                            <li className="flex items-center gap-3">
                                                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                                                <span>Check your email for event details and confirmation</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                                                <span>Add the event to your calendar</span>
                                            </li>
                                            {eventId && (
                                                <li className="flex items-center gap-3">
                                                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    <span>View your event details</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            ) : null}

                            {/* Session ID Info */}
                            {sessionId && (
                                <div className="mb-8 p-4 bg-slate-50 rounded-lg">
                                    <p className="text-sm font-medium text-slate-700 mb-1">
                                        Transaction Reference:
                                    </p>
                                    <p className="text-sm font-mono text-slate-900 break-all">
                                        {sessionId}
                                    </p>
                                    {paymentStatus && (
                                        <p className="text-sm text-slate-700 mt-3">
                                            Status: <span className={`font-semibold ${paymentStatus === 'SUCCESS' ? 'text-emerald-600' : paymentStatus === 'PENDING' ? 'text-amber-600' : 'text-red-600'}`}>
                                                {paymentStatus}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {verificationError && (
                                    <Button
                                        onClick={handleManualCheck}
                                        className="bg-amber-600 hover:bg-amber-700 px-8 py-6"
                                        disabled={isManualUpdating}
                                    >
                                        <Loader2 className="w-5 h-5 mr-2" />
                                        Check Again
                                    </Button>
                                )}

                                {/* Add manual webhook trigger button */}
                                {verificationError && paymentStatus === 'PENDING' && (
                                    <Button
                                        onClick={triggerManualWebhook}
                                        className="bg-blue-600 hover:bg-blue-700 px-8 py-6"
                                        disabled={isManualUpdating}
                                    >
                                        {isManualUpdating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw className="w-5 h-5 mr-2" />
                                                Update Payment Status
                                            </>
                                        )}
                                    </Button>
                                )}

                                <Link href="/dashboard">
                                    <Button
                                        variant={verificationError ? "outline" : "default"}
                                        className={`px-8 py-6 ${verificationError ? 'border-slate-600 text-slate-600 hover:bg-slate-50' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                                    >
                                        <Home className="w-5 h-5 mr-2" />
                                        Go to Dashboard
                                    </Button>
                                </Link>

                                {eventId && verificationSuccess && (
                                    <Button
                                        onClick={handleGoToEvent}
                                        variant="outline"
                                        className="px-8 py-6 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                                    >
                                        <Calendar className="w-5 h-5 mr-2" />
                                        View Event
                                    </Button>
                                )}

                                {!eventId && (
                                    <Link href="/events">
                                        <Button
                                            variant="outline"
                                            className="px-8 py-6 border-slate-600 text-slate-600 hover:bg-slate-50"
                                        >
                                            Browse Events
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            {/* Additional info for pending payments */}
                            {paymentStatus === 'PENDING' && verificationError && (
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-700 mb-2">
                                        <strong>Note about test payments:</strong>
                                    </p>
                                    <p className="text-sm text-blue-600">
                                        In test mode, webhooks might not trigger automatically.
                                        You can use the &quot;Update Payment Status&quot; button to manually
                                        complete the payment processing.
                                    </p>
                                </div>
                            )}

                            {/* Support Info */}
                            {verificationError && (
                                <div className="mt-8 pt-6 border-t border-slate-200">
                                    <p className="text-sm text-slate-500">
                                        Need help? Contact support at{' '}
                                        <a href="mailto:support@example.com" className="text-emerald-600 hover:underline">
                                            support@example.com
                                        </a>
                                        {' '}with your transaction ID: <span className="font-mono text-slate-700">{sessionId}</span>
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}