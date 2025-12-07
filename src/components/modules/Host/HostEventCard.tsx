"use client";

import { Calendar, MapPin, Users, DollarSign, Eye, Clock } from 'lucide-react';
import { IEvent } from '@/types/event.interface';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface EventCardProps {
    event: IEvent;
    onEdit: (event: IEvent) => void;
    onDelete: (event: IEvent) => void;
}

export default function HostEventCard({ event, onEdit, onDelete }: EventCardProps) {
    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return {
            date: format(date, 'MMM dd, yyyy'),
            time: format(date, 'h:mm a'),
            fullDate: format(date, 'EEEE, MMMM dd, yyyy')
        };
    };

    const datetime = formatDateTime(event.dateTime);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return 'bg-green-100 text-green-800 hover:bg-green-100';
            case 'FULL': return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
            case 'CANCELLED': return 'bg-red-100 text-red-800 hover:bg-red-100';
            case 'COMPLETED': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
            default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
        }
    };

    const getParticipantCount = () => {
        return event.participants?.filter(p => p.status === 'ACCEPTED').length || 0;
    };

    const getRevenue = () => {
        const paidParticipants = event.participants?.filter(p => p.status === 'ACCEPTED' && p.paid) || [];
        return paidParticipants.length * (event.joiningFee || 0);
    };

    const isEventPast = () => {
        return new Date(event.dateTime) < new Date();
    };

    return (
        <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border-slate-200 hover:border-blue-200">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(event.status)}>
                                {event.status}
                            </Badge>
                            <Badge variant="outline" className="text-slate-600">
                                {event.type}
                            </Badge>
                            {isEventPast() && (
                                <Badge variant="outline" className="text-amber-600 border-amber-200">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Past
                                </Badge>
                            )}
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 line-clamp-1">
                            {event.title}
                        </h3>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                </p>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                        <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{datetime.date} • {datetime.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                        <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                        <Users className="w-4 h-4 text-purple-500 shrink-0" />
                        <span>
                            {getParticipantCount()} / {event.maxParticipants || '∞'} participants
                        </span>
                    </div>
                    {event.joiningFee && event.joiningFee > 0 && (
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                            <DollarSign className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>${event.joiningFee} {event.currency || 'USD'}</span>
                            <Badge variant="outline" className="ml-auto text-xs">
                                Revenue: ${getRevenue()}
                            </Badge>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-slate-500">
                        Created {format(new Date(event.createdAt), 'MMM dd')}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(event)}
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(event)}
                        >
                            Delete
                        </Button>
                        <Button size="sm" asChild>
                            <Link href={`/events/${event.id}`}>
                                <Eye className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
