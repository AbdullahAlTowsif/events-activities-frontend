'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Calendar,
    Users,
    DollarSign,
    MapPin,
    FileText,
    Clock,
    Edit,
    Trash2,
    User,
    CreditCard,
    AlertCircle
} from 'lucide-react';
import { IEvent } from '@/services/admin/dashboardEventManagement';
import { IParticipant } from '@/types/participant.interface';
import { IPayment } from '@/types/payment.interface';

interface EventDetailsDialogProps {
    event: IEvent;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function EventDetailsDialog({
    event,
    open,
    onOpenChange,
    onEdit,
    onDelete
}: EventDetailsDialogProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatCurrency = (amount?: number, currency?: string) => {
        if (!amount) return 'Free';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'BDT',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'OPEN':
                return <Badge className="bg-green-100 text-green-800">Open</Badge>;
            case 'FULL':
                return <Badge className="bg-amber-100 text-amber-800">Full</Badge>;
            case 'CANCELLED':
                return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
            case 'COMPLETED':
                return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const totalRevenue = (event.joiningFee || 0) * (event.participants?.length || 0);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Event Details
                        {getStatusBadge(event.status)}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Event Header */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h2>
                        <p className="text-slate-600">{event.description}</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-2xl font-bold text-slate-900">
                                    {event.participants?.length || 0}
                                </div>
                                <div className="text-sm text-slate-500">Participants</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-2xl font-bold text-slate-900">
                                    {event.payments?.length || 0}
                                </div>
                                <div className="text-sm text-slate-500">Payments</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-sm font-bold text-slate-900">
                                    {formatCurrency(event.joiningFee, event.currency)}
                                </div>
                                <div className="text-sm text-slate-500">Fee</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="text-sm font-bold text-slate-900">
                                    {formatCurrency(totalRevenue, event.currency)}
                                </div>
                                <div className="text-sm text-slate-500">Revenue</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="font-medium">Date & Time</p>
                                    <p className="text-sm text-slate-600">
                                        {formatDate(event.dateTime)} at {formatTime(event.dateTime)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="font-medium">Location</p>
                                    <p className="text-sm text-slate-600">{event.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="font-medium">Event Type</p>
                                    <Badge variant="outline">{event.type}</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="font-medium">Capacity</p>
                                    <p className="text-sm text-slate-600">
                                        {event.minParticipants ? `Min: ${event.minParticipants} • ` : ''}
                                        {event.maxParticipants ? `Max: ${event.maxParticipants}` : 'Unlimited'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <DollarSign className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="font-medium">Pricing</p>
                                    <p className="text-sm text-slate-600">
                                        {formatCurrency(event.joiningFee, event.currency)}
                                        {event.currency && ` (${event.currency})`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-sm text-slate-600">
                                        {formatDate(event.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Host Information */}
                    {event.host && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-3">Host Information</h3>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                    <Avatar>
                                        <AvatarImage src={event.host.profilePhoto} />
                                        <AvatarFallback>
                                            {event.host.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{event.host.name}</p>
                                        <p className="text-sm text-slate-500">{event.host.email}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Recent Participants */}
                    {event.participants && event.participants.length > 0 && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-3">Recent Participants ({event.participants.length})</h3>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {event.participants.slice(0, 5).map((participant: IParticipant, index: number) => (
                                        <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-slate-400" />
                                                <span className="text-sm">{participant.userEmail || participant.id}</span>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {participant.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Recent Payments */}
                    {event.payments && event.payments.length > 0 && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-3">Recent Payments ({event.payments.length})</h3>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {event.payments.slice(0, 5).map((payment: IPayment, index: number) => (
                                        <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-4 h-4 text-slate-400" />
                                                <div>
                                                    <p className="text-sm font-medium">{payment.userEmail || payment.id}</p>
                                                    <p className="text-xs text-slate-500">{payment.status}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-green-600">
                                                {formatCurrency(payment.amount, payment.currency)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <DialogFooter className="flex gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onDelete} className="text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                    <Button variant="outline" onClick={onEdit}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                    <Button onClick={() => window.open(`/events/${event.id}`, '_blank')}>
                        View Public Page
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
