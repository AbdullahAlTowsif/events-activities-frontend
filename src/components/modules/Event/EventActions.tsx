/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Users, AlertCircle } from 'lucide-react';
import { joinEvent, leaveEvent } from '@/services/event/event.service';
import { IEvent } from '@/types/event.interface';

interface EventActionsProps {
    eventId: string;
    event: IEvent;
}

export default function EventActions({ eventId, event }: EventActionsProps) {
    const router = useRouter();
    const [isJoining, setIsJoining] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // This should come from authentication context
    const [isParticipant, setIsParticipant] = useState(false);
    const isEventFull = event.status === 'FULL';
    const canJoin = !isParticipant && !isEventFull;

    const handleJoin = async () => {
        if (!canJoin) return;

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

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <div className="text-sm text-slate-500">Available Spots</div>
                        <div className="text-2xl font-bold text-slate-900">
                            {event.maxParticipants
                                ? `${event.maxParticipants - (event.participants?.length || 0)} remaining`
                                : 'Unlimited'
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-3 sm:mb-0">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {isParticipant ? (
                        <button
                            onClick={handleLeave}
                            disabled={isLeaving}
                            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLeaving ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Leaving...
                                </>
                            ) : (
                                'Leave Event'
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={handleJoin}
                            disabled={isJoining || !canJoin}
                            className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${canJoin
                                    ? 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {isJoining ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Joining...
                                </>
                            ) : isEventFull ? (
                                <>
                                    <Check className="w-5 h-5" />
                                    Event Full
                                </>
                            ) : (
                                'Join Event'
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-sm text-slate-600">
                        <span className="font-medium">Minimum Participants:</span> {event.minParticipants || 'No minimum'}
                    </div>
                    <div className="text-sm text-slate-600">
                        <span className="font-medium">Maximum Participants:</span> {event.maxParticipants || 'Unlimited'}
                    </div>
                    <div className="text-sm text-slate-600">
                        <span className="font-medium">Status:</span> {event.status}
                    </div>
                    <div className="text-sm text-slate-600">
                        <span className="font-medium">Created:</span> {new Date(event.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
