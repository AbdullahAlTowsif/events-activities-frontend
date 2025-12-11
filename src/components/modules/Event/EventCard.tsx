"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { 
    Calendar, 
    MapPin, 
    Users, 
    DollarSign, 
    Eye, 
    Clock,
    User
} from "lucide-react";
import Link from "next/link";
import { IEvent } from "@/types/event.interface";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface EventCardProps {
    event: IEvent;
}

export default function EventCard({ event }: EventCardProps) {
    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'UPCOMING':
                return 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20';
            case 'ONGOING':
                return 'bg-green-500/10 text-green-600 hover:bg-green-500/20';
            case 'COMPLETED':
                return 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20';
            case 'CANCELLED':
                return 'bg-red-500/10 text-red-600 hover:bg-red-500/20';
            default:
                return 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20';
        }
    };

    // Calculate participants info
    const currentParticipants = event.participants?.length || 0;
    const maxParticipants = event.maxParticipants || 0;
    const participantPercentage = maxParticipants > 0 
        ? (currentParticipants / maxParticipants) * 100 
        : 0;

    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-border/50">
            {/* Event Image */}
            <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary/20 to-primary/5">
                {event.images && event.images.length > 0 ? (
                    <Image
                        src={event.images[0]}
                        alt={event.title}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <Badge className={getStatusColor(String(event.status))}>
                        {String(event.status)}
                    </Badge>
                </div>

                {/* Event Type Badge */}
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-black/50 text-white hover:bg-black/60">
                        {event.type}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-3">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 pb-4">
                {/* Date & Time */}
                <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Date & Time</p>
                        <p className="text-sm text-muted-foreground">
                            {formatDate(event.dateTime)}
                        </p>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                            {event.location}
                        </p>
                    </div>
                </div>

                {/* Host */}
                <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Host</p>
                        <p className="text-sm text-muted-foreground truncate">
                            {event.hostEmail}
                        </p>
                    </div>
                </div>

                {/* Participants */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="font-medium">Participants</span>
                        </div>
                        <span className="text-muted-foreground">
                            {currentParticipants} / {maxParticipants || '∞'}
                        </span>
                    </div>
                    {maxParticipants > 0 && (
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-primary h-full transition-all duration-300"
                                style={{ width: `${Math.min(participantPercentage, 100)}%` }}
                            />
                        </div>
                    )}
                    {event.minParticipants && (
                        <p className="text-xs text-muted-foreground">
                            Minimum required: {event.minParticipants}
                        </p>
                    )}
                </div>

                {/* Joining Fee */}
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Joining Fee</span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                        {event.joiningFee 
                            ? `${event.currency || '$'}${event.joiningFee.toFixed(2)}`
                            : 'Free'
                        }
                    </span>
                </div>
            </CardContent>

            <CardFooter className="pt-3 border-t bg-muted/30">
                <Link className="w-full" href={`/events/${event.id}`}>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
