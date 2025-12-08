"use client";

import { CreditCard, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { IRecentPayment, IUpcomingEvent } from '@/types/analytics.interface';

interface AnalyticsRecentActivityProps {
    recentPayments: IRecentPayment[];
    upcomingEvents: IUpcomingEvent[];
}

export default function AnalyticsRecentActivity({
    recentPayments,
    upcomingEvents
}: AnalyticsRecentActivityProps) {
    const formatCurrency = (amount: number, currency: string = 'BDT') => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const STATUS_COLORS: Record<string, string> = {
        'SUCCESS': 'bg-green-100 text-green-800',
        'PENDING': 'bg-amber-100 text-amber-800',
        'FAILED': 'bg-red-100 text-red-800',
        'REFUNDED': 'bg-purple-100 text-purple-800'
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Payments */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Recent Payments
                    </CardTitle>
                    <CardDescription>Latest successful payments</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentPayments.slice(0, 5).map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{payment.user.name}</div>
                                        <div className="text-sm text-gray-500">{payment.event.title}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">{formatCurrency(payment.amount, payment.currency)}</div>
                                    <Badge className={STATUS_COLORS[payment.status] || 'bg-gray-100 text-gray-800'}>
                                        {payment.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Upcoming Events
                    </CardTitle>
                    <CardDescription>Events happening soon</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {upcomingEvents.slice(0, 5).map((event) => (
                            <div key={event.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Calendar className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{event.title}</div>
                                        <div className="text-sm text-gray-500">
                                            {format(new Date(event.dateTime), 'MMM dd, h:mm a')}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">{formatCurrency(event.joiningFee, event.currency)}</div>
                                    <div className="text-sm text-gray-500">
                                        {event._count.participants} participants
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
