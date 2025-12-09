/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Filter,
    Calendar,
    Users,
    DollarSign,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    RefreshCw,
    Plus,
    Clock,
    MapPin,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { deleteEventById, getAllEvents, IEvent } from '@/services/admin/dashboardEventManagement';
import EventDetailsDialog from './EventDetailsDialog';
import EditEventDialog from './EditEventDialog';

export default function EventsManagement() {
    // State
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    // Dialog states
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        eventId: string;
        eventTitle: string;
    }>({
        open: false,
        eventId: '',
        eventTitle: ''
    });

    // Fetch events
    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const filters: any = {};
            if (searchTerm) filters.searchTerm = searchTerm;
            if (typeFilter !== 'all') filters.type = typeFilter;
            // if (statusFilter !== 'all') filters.status = statusFilter;

            const options = {
                page,
                limit,
                sortBy,
                sortOrder
            };

            const result = await getAllEvents(filters, options);

            if (result.success) {
                setEvents(result.data);
                setTotal(result.meta.total);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, typeFilter, page, limit, sortBy, sortOrder]);

    // Initial fetch
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // Handle delete event
    const handleDeleteEvent = async () => {
        try {
            const result = await deleteEventById(deleteDialog.eventId);
            if (result.success) {
                // Remove from local state
                setEvents(prev => prev.filter(event => event.id !== deleteDialog.eventId));
                setDeleteDialog({ open: false, eventId: '', eventTitle: '' });
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm('');
        setTypeFilter('all');
        setStatusFilter('all');
        setSortBy('createdAt');
        setSortOrder('desc');
        setPage(1);
    };

    // Get status badge
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

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Format time
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Format currency
    const formatCurrency = (amount?: number, currency?: string) => {
        if (!amount) return 'Free';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'BDT',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Pagination
    const totalPages = Math.ceil(total / limit);
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    // Event types (you can get these from your backend)
    const eventTypes = [
        'ENTERTAINMENT', 'SPORTS', 'EDUCATION', 'BUSINESS',
        'NETWORKING', 'CHARITY', 'TECH', 'ART', 'MUSIC'
    ];

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Events</h1>
                    <p className="text-slate-600">Manage all events on the platform</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Events"
                        value={total}
                        icon={<Calendar className="w-5 h-5" />}
                        color="blue"
                    />
                    <StatCard
                        title="Active Events"
                        value={events.filter(e => e.status === 'OPEN').length}
                        icon={<CheckCircle className="w-5 h-5" />}
                        color="green"
                    />
                    <StatCard
                        title="Total Participants"
                        value={events.reduce((sum, event) => sum + (event.participants?.length || 0), 0)}
                        icon={<Users className="w-5 h-5" />}
                        color="purple"
                    />
                    <StatCard
                        title="Total Revenue"
                        value={formatCurrency(
                            events.reduce((sum, event) => sum + (event.joiningFee || 0) * (event.participants?.length || 0), 0),
                            'BDT'
                        )}
                        icon={<DollarSign className="w-5 h-5" />}
                        color="amber"
                    />
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {/* Search */}
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search events by title, description, location..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            {/* Type Filter */}
                            <div>
                                <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Event Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        {eventTypes.map(type => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button onClick={fetchEvents} variant="outline" className="flex-1">
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Refresh
                                </Button>
                                <Button onClick={handleResetFilters} variant="ghost" className="flex-1">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Events Table */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>All Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))}
                            </div>
                        ) : events.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Events Found</h3>
                                <p className="text-slate-600 mb-4">Try adjusting your filters or search term</p>
                                <Button onClick={handleResetFilters} variant="outline">
                                    Reset Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Event</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Date & Time</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead>Fee</TableHead>
                                            <TableHead>Participants</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Host</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {events.map((event) => (
                                            <TableRow key={event.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        {event.images && event.images.length > 0 ? (
                                                            <Avatar className="w-10 h-10">
                                                                <AvatarImage src={event.images[0]} />
                                                                <AvatarFallback>
                                                                    {event.title.charAt(0).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        ) : (
                                                            <Avatar className="w-10 h-10">
                                                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                                                    {event.title.charAt(0).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                        <div>
                                                            <div className="font-medium line-clamp-1">{event.title}</div>
                                                            <div className="text-xs text-slate-500 line-clamp-1">
                                                                {event.description.substring(0, 50)}...
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{event.type}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3 text-slate-400" />
                                                            <span className="text-sm">{formatDate(event.dateTime)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3 text-slate-400" />
                                                            <span className="text-xs text-slate-500">{formatTime(event.dateTime)}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3 text-slate-400" />
                                                        <span className="text-sm line-clamp-1 max-w-[120px]">{event.location}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {formatCurrency(event.joiningFee, event.currency)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-3 h-3 text-slate-400" />
                                                        <span className="text-sm">
                                                            {event.participants?.length || 0}
                                                            {event.maxParticipants && ` / ${event.maxParticipants}`}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(event.status)}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {event.host?.profilePhoto ? (
                                                            <Avatar className="w-6 h-6">
                                                                <AvatarImage src={event.host.profilePhoto} />
                                                                <AvatarFallback>
                                                                    {event.host.name.charAt(0).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        ) : (
                                                            <Avatar className="w-6 h-6">
                                                                <AvatarFallback className="text-xs">
                                                                    {event.host?.name?.charAt(0).toUpperCase() || 'H'}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                        <span className="text-sm">{event.host?.name || 'Unknown'}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedEvent(event);
                                                                    setShowDetailsDialog(true);
                                                                }}
                                                            >
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedEvent(event);
                                                                    setShowEditDialog(true);
                                                                }}
                                                            >
                                                                <Edit className="w-4 h-4 mr-2" />
                                                                Edit Event
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setDeleteDialog({
                                                                        open: true,
                                                                        eventId: event.id,
                                                                        eventTitle: event.title
                                                                    });
                                                                }}
                                                                className="text-red-600"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete Event
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        {/* Pagination */}
                        {events.length > 0 && (
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-slate-600">
                                    Showing {startItem} to {endItem} of {total} events
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span className="flex items-center px-3 text-sm">
                                        Page {page} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Event Details Dialog */}
            {selectedEvent && (
                <EventDetailsDialog
                    event={selectedEvent}
                    open={showDetailsDialog}
                    onOpenChange={setShowDetailsDialog}
                    onEdit={() => {
                        setShowDetailsDialog(false);
                        setShowEditDialog(true);
                    }}
                    onDelete={() => {
                        setDeleteDialog({
                            open: true,
                            eventId: selectedEvent.id,
                            eventTitle: selectedEvent.title
                        });
                        setShowDetailsDialog(false);
                    }}
                />
            )}

            {/* Edit Event Dialog */}
            {selectedEvent && (
                <EditEventDialog
                    event={selectedEvent}
                    open={showEditDialog}
                    onOpenChange={setShowEditDialog}
                    onSuccess={() => {
                        setShowEditDialog(false);
                        fetchEvents(); // Refresh data
                    }}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Event</AlertDialogTitle>
                    </AlertDialogHeader>

                    {/* Moved description outside of AlertDialogDescription to fix hydration error */}
                    <div className="text-sm text-slate-600 mb-4">
                        Are you sure you want to delete &quot;{deleteDialog.eventTitle}&quot;?
                        This action cannot be undone and will permanently delete:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>The event details</li>
                            <li>All participant registrations</li>
                            <li>All payment records for this event</li>
                        </ul>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteEvent}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete Event
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

// Stat Card Component
function StatCard({
    title,
    value,
    icon,
    color
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500">{title}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center`}>
                        <div className={`text-${color}-600`}>
                            {icon}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
