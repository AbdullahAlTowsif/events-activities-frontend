import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IEvent } from "@/types/event.interface";
import {
    Calendar,
    Clock,
    DollarSign,
    MapPin,
    Mail,
    Users,
    FileText,
    UserCheck,
    UsersRound,
    AlertCircle,
    Images,
} from "lucide-react";
import Image from "next/image";

interface EventProfileContentProps {
    event: IEvent;
}

const EventContent = ({ event }: EventProfileContentProps) => {
    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'FULL':
                return 'bg-blue-500/10 text-blue-600 border-blue-200';
            case 'OPEN':
                return 'bg-green-500/10 text-green-600 border-green-200';
            case 'COMPLETED':
                return 'bg-gray-500/10 text-gray-600 border-gray-200';
            case 'CANCELLED':
                return 'bg-red-500/10 text-red-600 border-red-200';
            default:
                return 'bg-gray-500/10 text-gray-600 border-gray-200';
        }
    };

    // Calculate participants info
    const currentParticipants = event.participants?.length || 0;
    const maxParticipants = event.maxParticipants || 0;
    const participantPercentage = maxParticipants > 0
        ? (currentParticipants / maxParticipants) * 100
        : 0;

    const spotsRemaining = maxParticipants > 0 ? maxParticipants - currentParticipants : null;

    return (
        <div className="space-y-6">
            {/* Event Header Card */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Event Image */}
                        <div className="flex justify-center md:justify-start">
                            <div className="h-32 w-32 md:h-40 md:w-40 rounded-lg overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                {event.images && event.images.length > 0 ? (
                                    <Image
                                        src={event.images[0]}
                                        alt={event.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Calendar className="h-16 w-16 text-muted-foreground/30" />
                                )}
                            </div>
                        </div>

                        {/* Event Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-start gap-3 mb-2">
                                    <h1 className="text-3xl font-bold flex-1">{event.title}</h1>
                                    <Badge className={getStatusColor(String(event.status))}>
                                        {String(event.status)}
                                    </Badge>
                                </div>
                                <Badge variant="secondary" className="mt-2">
                                    {event.type}
                                </Badge>
                            </div>

                            {/* Date, Time & Fee */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <span className="font-semibold">
                                        {formatDate(event.dateTime)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                    <span className="font-semibold">
                                        {formatTime(event.dateTime)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-primary">
                                <DollarSign className="h-5 w-5" />
                                <span className="text-2xl font-bold">
                                    {event.joiningFee
                                        ? `${event.currency || '$'}${event.joiningFee.toFixed(2)}`
                                        : 'Free'
                                    }
                                </span>
                                {event.joiningFee && (
                                    <span className="text-sm text-muted-foreground">
                                        joining fee
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Location & Host Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-semibold">{event.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Hosted By</p>
                                <p className="font-semibold">{event.hostEmail}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">Created</p>
                                <p className="font-semibold">
                                    {new Date(event.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Participants Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Participants</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm text-muted-foreground">Current / Maximum</p>
                                    <p className="font-bold text-lg">
                                        {currentParticipants} / {maxParticipants || '∞'}
                                    </p>
                                </div>
                                {maxParticipants > 0 && (
                                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-primary h-full transition-all duration-300"
                                            style={{ width: `${Math.min(participantPercentage, 100)}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {event.minParticipants && (
                            <div className="flex items-center gap-3">
                                <UserCheck className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Minimum Required</p>
                                    <p className="font-semibold">{event.minParticipants} participants</p>
                                </div>
                            </div>
                        )}

                        {spotsRemaining !== null && spotsRemaining > 0 && (
                            <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-200">
                                <AlertCircle className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="text-sm font-semibold text-green-600">
                                        {spotsRemaining} spots remaining
                                    </p>
                                </div>
                            </div>
                        )}

                        {spotsRemaining === 0 && (
                            <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg border border-red-200">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                                <div>
                                    <p className="text-sm font-semibold text-red-600">
                                        Event is full
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Description */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        About This Event
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {event.description}
                    </p>
                </CardContent>
            </Card>

            {/* Event Images Gallery */}
            {event.images && event.images.length > 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Images className="h-5 w-5" />
                            Event Gallery
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {event.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="aspect-square rounded-lg overflow-hidden bg-muted hover:opacity-80 transition-opacity cursor-pointer"
                                >
                                    <Image
                                        src={image}
                                        alt={`${event.title} - Image ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Participants List */}
            {event.participants && event.participants.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UsersRound className="h-5 w-5" />
                            Registered Participants ({event.participants.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {event.participants.map((participant, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Participant {index + 1}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Registered
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default EventContent;
