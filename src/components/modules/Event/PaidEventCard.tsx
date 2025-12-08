"use client";

import { useState, useEffect } from 'react';
import { AlertCircle, Calendar, MapPin, DollarSign, Clock, Check, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { getMyPaidEvents } from '@/services/event/event.service';


type EventStatus = 'OPEN' | 'FULL' | 'CANCELLED' | 'COMPLETED';
type JoinStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';

interface IEvent {
    event: {
        id: string;
        currency: string;
        datetime: string;
        host: {
            email: string;
            id: string;
            name: string;
            profilePhoto: string;
        };
        images: string[];
        joiningFee: number;
        location: string;
        status: EventStatus;
        title: string;
        type: string;
    };
    joinStatus: JoinStatus;
    joinedAt: string;
    paid: boolean;
    participantId: string;
    payment: {
        id: string;
        userEmail: string;
        eventId: string;
        amount: number;
        currency: string;
    };
}

export default function PaidEventsPage() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getMyPaidEvents();
            console.log("paid Events", result);
            if (result.success) {
                setEvents(result.data || []);
            } else {
                setError(result.message || 'Failed to load events');
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError('An error occurred while fetching events');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: EventStatus) => {
        switch (status) {
            case 'OPEN':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'FULL':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getJoinStatusBadge = (status: JoinStatus) => {
        switch (status) {
            case 'ACCEPTED':
                return (
                    <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100">
                        <Check className="w-3 h-3 mr-1" />
                        Confirmed
                    </Badge>
                );
            case 'PENDING':
                return (
                    <Badge className="bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                );
            case 'REJECTED':
                return (
                    <Badge className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100">
                        <X className="w-3 h-3 mr-1" />
                        Rejected
                    </Badge>
                );
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateStats = () => {
        const totalSpent = events.reduce((sum, event) => sum + event.payment.amount, 0);
        const acceptedCount = events.filter(e => e.joinStatus === 'ACCEPTED').length;
        const pendingCount = events.filter(e => e.joinStatus === 'PENDING').length;

        return { totalSpent, acceptedCount, pendingCount };
    };

    if (loading) {
        return (
            <div className="py-12 px-4 max-w-7xl mx-auto">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <h3 className="text-xl font-semibold text-slate-700">Loading your events...</h3>
                    </div>
                </div>
            </div>
        );
    }

    const stats = calculateStats();

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">My Paid Events</h1>
                        <p className="text-slate-600">Manage and track all your paid events</p>
                    </div>
                    {events.length > 0 && (
                        <div className="flex gap-3">
                            <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-sm">
                                <div className="text-xs font-medium opacity-90">Total Spent</div>
                                <div className="text-2xl font-bold">{stats.totalSpent} BDT</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Stats Cards */}
            {events.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Events</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-1">{events.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Confirmed</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-1">{stats.acceptedCount}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Check className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-yellow-500">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Pending</p>
                                    <p className="text-3xl font-bold text-slate-900 mt-1">{stats.pendingCount}</p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-yellow-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Events Grid */}
            {events.length === 0 ? (
                <Card className="border-2 border-dashed">
                    <CardContent className="py-16 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-700 mb-2">
                            No Paid Events Yet
                        </h3>
                        <p className="text-slate-500 mb-6 max-w-md mx-auto">
                            You haven&apos;t registered for any paid events yet. Start exploring events and join ones that interest you!
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {events.map((eventData) => {
                        const { event, joinStatus, joinedAt, paid, payment } = eventData;

                        return (
                            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-slate-200">
                                <div className="relative">
                                    {/* Event Image or Gradient Background */}
                                    <div className="h-48 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
                                        {event.images && event.images.length > 0 ? (
                                            <Image
                                                src={event.images[0]}
                                                alt={event.title}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Calendar className="w-20 h-20 text-white opacity-30" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Badges */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <Badge className={`${getStatusColor(event.status)} font-semibold`}>
                                            {event.status}
                                        </Badge>
                                        <Badge className="bg-purple-100 text-purple-800 border border-purple-200">
                                            {event.type}
                                        </Badge>
                                    </div>

                                    {/* Join Status Badge */}
                                    <div className="absolute top-4 right-4">
                                        {getJoinStatusBadge(joinStatus)}
                                    </div>

                                    {/* Paid Badge */}
                                    {paid && (
                                        <div className="absolute bottom-4 right-4">
                                            <Badge className="bg-green-600 text-white hover:bg-green-700">
                                                <DollarSign className="w-3 h-3 mr-1" />
                                                Paid
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-6">
                                    {/* Event Title */}
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2">
                                        {event.title}
                                    </h3>

                                    {/* Event Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start gap-3 text-slate-600">
                                            <Calendar className="w-5 h-5 mt-0.5 shrink-0 text-blue-600" />
                                            <div>
                                                <p className="font-medium text-slate-900">{formatDate(event.datetime)}</p>
                                                <p className="text-sm">{formatTime(event.datetime)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-slate-600">
                                            <MapPin className="w-5 h-5 shrink-0 text-red-600" />
                                            <p className="font-medium">{event.location}</p>
                                        </div>

                                        <div className="flex items-center gap-3 text-slate-600">
                                            <DollarSign className="w-5 h-5 shrink-0 text-green-600" />
                                            <p className="font-medium">{event.joiningFee} {event.currency}</p>
                                        </div>
                                    </div>

                                    {/* Host Information */}
                                    <div className="pt-4 border-t border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-linear-to-br from-blue-400 to-purple-500 shrink-0">
                                                {event.host.profilePhoto ? (
                                                    <Image
                                                        src={event.host.profilePhoto}
                                                        alt={event.host.name}
                                                        width={40}
                                                        height={40}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                                                        {event.host.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-slate-500">Hosted by</p>
                                                <p className="font-semibold text-slate-900 truncate">{event.host.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Info */}
                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600">Joined on:</span>
                                            <span className="font-medium text-slate-900">
                                                {new Date(joinedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm mt-2">
                                            <span className="text-slate-600">Payment ID:</span>
                                            <span className="font-mono text-xs text-slate-700 truncate ml-2">
                                                {payment.id.substring(0, 20)}...
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
