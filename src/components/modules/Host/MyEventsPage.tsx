"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, AlertCircle, Calendar as CalendarIcon, Users, DollarSign } from 'lucide-react';
import { IEvent } from '@/types/event.interface';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMyCreatedEvents, updateEventById } from '@/services/host/host.service';
import { deleteEvent } from '@/services/admin/eventManagement';
import HostEventCard from './HostEventCard';
import DeleteEventDialog from './DeleteEventDialog';
import EditEventDialog from './EditEventDialog';

type EventStatus = 'OPEN' | 'FULL' | 'CANCELLED' | 'COMPLETED';

export default function MyEventsPage() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<EventStatus | 'ALL'>('ALL');
    const [error, setError] = useState<string | null>(null);

    // Dialog states
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        filterEvents();
    }, [events, searchQuery, statusFilter]);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getMyCreatedEvents();
            if (result.success) {
                setEvents(result.data || []);
            } else {
                setError(result.message || 'Failed to load events');
            }
        } catch (error) {
            setError('An error occurred while fetching events');
        } finally {
            setLoading(false);
        }
    };

    const filterEvents = () => {
        let filtered = [...events];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (statusFilter !== 'ALL') {
            filtered = filtered.filter(event => event.status === statusFilter);
        }

        setFilteredEvents(filtered);
    };

    const handleEditEvent = (event: IEvent) => {
        setSelectedEvent(event);
        setEditDialogOpen(true);
    };

    const handleDeleteEvent = (event: IEvent) => {
        setSelectedEvent(event);
        setDeleteDialogOpen(true);
    };

    // const handleUpdateEvent = async (updatedEvent: IEvent) => {
    //     try {
    //         const result = await updateEventById(updatedEvent.id!, updatedEvent);
    //         if (result.success) {
    //             setEvents(prev => prev.map(event =>
    //                 event.id === updatedEvent.id ? result.data : event
    //             ));
    //             setEditDialogOpen(false);
    //             setSelectedEvent(null);
    //         }
    //     } catch (error) {
    //         console.error('Error updating event:', error);
    //     }
    // };

    // In MyEventsPage.tsx, update the handleUpdateEvent function:
    const handleUpdateEvent = async (updatedEvent: IEvent) => {
        try {
            const result = await updateEventById(updatedEvent.id!, {
                title: updatedEvent.title,
                description: updatedEvent.description,
                type: updatedEvent.type,
                location: updatedEvent.location,
                dateTime: updatedEvent.dateTime,
                joiningFee: updatedEvent.joiningFee,
                currency: updatedEvent.currency,
                minParticipants: updatedEvent.minParticipants,
                maxParticipants: updatedEvent.maxParticipants,
                // Don't send status or other fields unless you want to update them
            });

            if (result.success) {
                setEvents(prev => prev.map(event =>
                    event.id === updatedEvent.id ? { ...event, ...result.data } : event
                ));
                setEditDialogOpen(false);
                setSelectedEvent(null);
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedEvent?.id) return;

        try {
            const result = await deleteEvent(selectedEvent.id);
            if (result.success) {
                setEvents(prev => prev.filter(event => event.id !== selectedEvent.id));
                setDeleteDialogOpen(false);
                setSelectedEvent(null);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const getStatusCount = (status: EventStatus) => {
        return events.filter(event => event.status === status).length;
    };

    const getTotalRevenue = () => {
        return events.reduce((total, event) => {
            const participants = event.participants?.filter(p => p.status === 'ACCEPTED' && p.paid) || [];
            return total + (participants.length * (event.joiningFee || 0));
        }, 0);
    };

    const getTotalParticipants = () => {
        return events.reduce((total, event) => {
            return total + (event.participants?.filter(p => p.status === 'ACCEPTED').length || 0);
        }, 0);
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

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">My Created Events</h1>
                        <p className="text-slate-600 mt-2">Manage and track all your hosted events</p>
                    </div>
                    <Link href="/host/dashboard/create-event">
                        <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Event
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Total Events</p>
                                    <p className="text-2xl font-bold text-slate-900">{events.length}</p>
                                </div>
                                <CalendarIcon className="w-8 h-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Total Participants</p>
                                    <p className="text-2xl font-bold text-slate-900">{getTotalParticipants()}</p>
                                </div>
                                <Users className="w-8 h-8 text-emerald-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Total Revenue</p>
                                    <p className="text-2xl font-bold text-slate-900">${getTotalRevenue()}</p>
                                </div>
                                <DollarSign className="w-8 h-8 text-amber-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Active Events</p>
                                    <p className="text-2xl font-bold text-slate-900">{getStatusCount('OPEN')}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CalendarIcon className="w-4 h-4 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Search and Filter Bar */}
            <Card className="mb-8">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                                placeholder="Search events by title, description, or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 py-6"
                            />
                        </div>

                        {/* <EventsFilter
                            statusFilter={statusFilter}
                            onStatusChange={setStatusFilter}
                        /> */}
                    </div>
                </CardContent>
            </Card>

            {/* Status Filters Quick Actions */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Button
                    variant={statusFilter === 'ALL' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('ALL')}
                    className="rounded-full"
                >
                    All ({events.length})
                </Button>
                <Button
                    variant={statusFilter === 'OPEN' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('OPEN')}
                    className="rounded-full"
                >
                    Open ({getStatusCount('OPEN')})
                </Button>
                <Button
                    variant={statusFilter === 'FULL' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('FULL')}
                    className="rounded-full"
                >
                    Full ({getStatusCount('FULL')})
                </Button>
                <Button
                    variant={statusFilter === 'COMPLETED' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('COMPLETED')}
                    className="rounded-full"
                >
                    Completed ({getStatusCount('COMPLETED')})
                </Button>
                <Button
                    variant={statusFilter === 'CANCELLED' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('CANCELLED')}
                    className="rounded-full"
                >
                    Cancelled ({getStatusCount('CANCELLED')})
                </Button>
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <CalendarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700 mb-2">
                            {events.length === 0 ? 'No Events Created Yet' : 'No Events Match Your Filters'}
                        </h3>
                        <p className="text-slate-500 mb-6">
                            {events.length === 0
                                ? 'Start by creating your first event to connect with participants'
                                : 'Try adjusting your search or filter criteria'
                            }
                        </p>
                        {events.length === 0 && (
                            <Link href="/events/create">
                                <Button className="bg-linear-to-r from-blue-600 to-purple-600">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Your First Event
                                </Button>
                            </Link>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <>
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-slate-600">
                            Showing {filteredEvents.length} of {events.length} events
                        </p>
                        <Badge variant="outline" className="text-slate-600">
                            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <HostEventCard
                                key={event.id}
                                event={event}
                                onEdit={handleEditEvent}
                                onDelete={handleDeleteEvent}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Summary Stats */}
            {events.length > 0 && (
                <Card className="mt-12">
                    <CardHeader>
                        <CardTitle>Event Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{getStatusCount('OPEN')}</div>
                                <div className="text-sm text-slate-600">Open Events</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{getStatusCount('COMPLETED')}</div>
                                <div className="text-sm text-slate-600">Completed</div>
                            </div>
                            <div className="text-center p-4 bg-amber-50 rounded-lg">
                                <div className="text-2xl font-bold text-amber-600">{getStatusCount('FULL')}</div>
                                <div className="text-sm text-slate-600">Full</div>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <div className="text-2xl font-bold text-red-600">{getStatusCount('CANCELLED')}</div>
                                <div className="text-sm text-slate-600">Cancelled</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Edit Event Dialog */}
            {selectedEvent && (
                <EditEventDialog
                    event={selectedEvent}
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    onUpdate={handleUpdateEvent}
                />
            )}

            {/* Delete Event Dialog */}
            {selectedEvent && (
                <DeleteEventDialog
                    event={selectedEvent}
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}
