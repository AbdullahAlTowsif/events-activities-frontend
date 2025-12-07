/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Users, AlertCircle, CreditCard, Loader2 } from 'lucide-react';
import { joinEvent, leaveEvent, initPayment } from '@/services/event/event.service';
import { IEvent } from '@/types/event.interface';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EventActionsProps {
    eventId: string;
    event: IEvent;
}

export default function EventActions({ eventId, event }: EventActionsProps) {
    const router = useRouter();
    const [isJoining, setIsJoining] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);

    // This should come from authentication context
    const [isParticipant, setIsParticipant] = useState(false);
    const isEventFull = event.status === 'FULL';
    const canJoin = !isParticipant && !isEventFull;
    const isFreeEvent = !event.joiningFee || event.joiningFee === 0;

    const handleJoin = async () => {
        if (!canJoin) return;

        // If it's a free event, join directly
        if (isFreeEvent) {
            await handleFreeJoin();
        } else {
            // For paid events, show payment dialog
            setShowPaymentDialog(true);
        }
    };

    const handleFreeJoin = async () => {
        setIsJoining(true);
        setError(null);

        try {
            const result = await joinEvent(eventId);

            if (result.success) {
                setIsParticipant(true);
                router.refresh(); // Refresh page data
            } else {
                setError(result.message || 'Failed to join event');
            }
        } catch (err) {
            setError('An error occurred while joining the event');
        } finally {
            setIsJoining(false);
        }
    };

    const handlePaidJoin = async () => {
        if (!event.joiningFee) return;

        setIsProcessingPayment(true);
        setError(null);
        setShowPaymentDialog(false);

        try {
            // Initialize payment with Stripe
            const paymentResult = await initPayment(
                eventId,
                event.joiningFee,
                event.currency || 'BDT'
            );

            if (paymentResult.success && paymentResult.data?.checkoutUrl) {
                // Redirect to Stripe checkout
                window.location.href = paymentResult.data.checkoutUrl;
            } else {
                setError(paymentResult.message || 'Failed to initialize payment');
            }
        } catch (err) {
            setError('An error occurred while processing payment');
            console.error('Payment error:', err);
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const handleLeave = async () => {
        setIsLeaving(true);
        setError(null);

        try {
            const result = await leaveEvent(eventId);

            if (result.success) {
                setIsParticipant(false);
                router.refresh(); // Refresh page data
            } else {
                setError(result.message || 'Failed to leave event');
            }
        } catch (err) {
            setError('An error occurred while leaving the event');
        } finally {
            setIsLeaving(false);
        }
    };

    const availableSpots = event.maxParticipants
        ? event.maxParticipants - (event.participants?.length || 0)
        : null;

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-sm text-slate-500">Available Spots</div>
                            <div className="text-2xl font-bold text-slate-900">
                                {availableSpots !== null
                                    ? `${availableSpots} remaining`
                                    : 'Unlimited'
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        {error && (
                            <Alert variant="destructive" className="mb-3 sm:mb-0">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {isParticipant ? (
                            <Button
                                onClick={handleLeave}
                                disabled={isLeaving}
                                variant="destructive"
                                className="px-8 py-6 text-lg"
                            >
                                {isLeaving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Leaving...
                                    </>
                                ) : (
                                    'Leave Event'
                                )}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleJoin}
                                disabled={isJoining || isProcessingPayment || !canJoin}
                                className={`px-8 py-6 text-lg ${canJoin
                                    ? 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isJoining || isProcessingPayment ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        {isProcessingPayment ? 'Processing Payment...' : 'Joining...'}
                                    </>
                                ) : isEventFull ? (
                                    <>
                                        <Check className="w-5 h-5 mr-2" />
                                        Event Full
                                    </>
                                ) : isFreeEvent ? (
                                    'Join Event (Free)'
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5 mr-2" />
                                        Join Event (${event.joiningFee})
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Event Details */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-sm text-slate-600">
                            <span className="font-medium">Minimum Participants:</span> {event.minParticipants || 'No minimum'}
                        </div>
                        <div className="text-sm text-slate-600">
                            <span className="font-medium">Maximum Participants:</span> {event.maxParticipants || 'Unlimited'}
                        </div>
                        <div className="text-sm text-slate-600">
                            <span className="font-medium">Status:</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${event.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                                    event.status === 'FULL' ? 'bg-amber-100 text-amber-800' :
                                        event.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                            'bg-blue-100 text-blue-800'
                                }`}>
                                {event.status}
                            </span>
                        </div>
                        <div className="text-sm text-slate-600">
                            <span className="font-medium">Joining Fee:</span>
                            {isFreeEvent ? ' Free' : ` ${event.currency || '$'}${event.joiningFee}`}
                        </div>
                    </div>
                </div>

                {/* Payment Info for Paid Events */}
                {!isFreeEvent && !isParticipant && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-start gap-3">
                            <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <div className="font-medium text-blue-800 mb-1">Secure Payment Required</div>
                                <p className="text-blue-600 text-sm">
                                    This event requires a payment of {event.currency || '$'}{event.joiningFee}.
                                    You&apos;ll be redirected to Stripe for secure payment processing.
                                    Your spot will be reserved once payment is confirmed.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Free Event Info */}
                {isFreeEvent && !isParticipant && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <div className="font-medium text-green-800 mb-1">Free to Join</div>
                                <p className="text-green-600 text-sm">
                                    This event is free to join! Click &quot;Join Event&quot; to reserve your spot immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Payment Confirmation Dialog */}
            <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Confirm Payment
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to join &quot;{event.title}&quot;.
                            This event requires a payment of {event.currency || '$'}{event.joiningFee}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <h4 className="font-medium text-slate-900 mb-2">Payment Summary</h4>
                            <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Event:</span>
                                    <span>{event.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Date:</span>
                                    <span>{new Date(event.dateTime).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Amount:</span>
                                    <span className="font-semibold">{event.currency || '$'}{event.joiningFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Payment Gateway:</span>
                                    <span className="font-semibold text-blue-600">Stripe</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                                <div>
                                    <div className="font-medium text-amber-800 mb-1">Important Note</div>
                                    <p className="text-amber-600 text-sm">
                                        Your spot will be reserved only after successful payment confirmation.
                                        You&apos;ll be redirected to Stripe&apos;s secure payment page.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isProcessingPayment}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handlePaidJoin}
                            disabled={isProcessingPayment}
                            className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                            {isProcessingPayment ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Proceed to Payment
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
