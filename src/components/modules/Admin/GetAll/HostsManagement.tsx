/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Filter,
    Users,
    Calendar,
    Star,
    MoreVertical,
    Eye,
    Edit,
    Shield,
    ShieldOff,
    Ban,
    RefreshCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllHosts, IHost } from '@/services/admin/getAll';

export default function HostsManagement() {
    // State
    const [hosts, setHosts] = useState<IHost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [selectedHost, setSelectedHost] = useState<IHost | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [statusUpdateDialog, setStatusUpdateDialog] = useState<{
        open: boolean;
        hostId: string;
        hostName: string;
        newStatus: string;
    }>({
        open: false,
        hostId: '',
        hostName: '',
        newStatus: ''
    });

    // Fetch hosts
    const fetchHosts = useCallback(async () => {
        setLoading(true);
        try {
            const filters: any = {};
            if (searchTerm) filters.searchTerm = searchTerm;
            if (genderFilter !== 'all') filters.gender = genderFilter;
            // if (statusFilter !== 'all') filters.status = statusFilter;

            const options = {
                page,
                limit,
                sortBy,
                sortOrder
            };

            const result = await getAllHosts(filters, options);
            console.log(result);

            if (result.success) {
                setHosts(result.data);
                setTotal(result.meta.total);
            }
        } catch (error) {
            console.error('Error fetching hosts:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, genderFilter, page, limit, sortBy, sortOrder]);

    // Initial fetch
    useEffect(() => {
        fetchHosts();
    }, [fetchHosts]);

    // Handle status update
    // const handleStatusUpdate = async (hostId: string, newStatus: string) => {
    //     try {
    //         const result = await updateHostStatus(hostId, newStatus);
    //         if (result.success) {
    //             // Update local state
    //             setHosts(prev => prev.map(host =>
    //                 host.id === hostId ? { ...host, status: newStatus as any } : host
    //             ));
    //             setStatusUpdateDialog({ open: false, hostId: '', hostName: '', newStatus: '' });
    //         }
    //     } catch (error) {
    //         console.error('Error updating status:', error);
    //     }
    // };

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm('');
        setGenderFilter('all');
        // setStatusFilter('all');
        setSortBy('createdAt');
        setSortOrder('desc');
        setPage(1);
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Pagination
    const totalPages = Math.ceil(total / limit);
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Hosts</h1>
                    <p className="text-slate-600">Manage all hosts and their status on the platform</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Hosts"
                        value={total}
                        icon={<Users className="w-5 h-5" />}
                        color="blue"
                    />
                    <StatCard
                        title="Active Hosts"
                        value={hosts.filter(h => h.status === 'ACTIVE').length}
                        icon={<Shield className="w-5 h-5" />}
                        color="green"
                    />
                    <StatCard
                        title="Total Events"
                        value={hosts.reduce((sum, host) => sum + (host._count?.events || 0), 0)}
                        icon={<Calendar className="w-5 h-5" />}
                        color="purple"
                    />
                    <StatCard
                        title="Avg Rating"
                        value={(
                            hosts.reduce((sum, host) => sum + (host.rating || 0), 0) /
                            (hosts.filter(h => h.rating).length || 1)
                        ).toFixed(1)}
                        suffix="★"
                        icon={<Star className="w-5 h-5" />}
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
                                        placeholder="Search by name, email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            {/* Gender Filter */}
                            <div>
                                <Select value={genderFilter} onValueChange={setGenderFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Genders</SelectItem>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Status Filter */}
                            {/* <div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                                        <SelectItem value="SUSPENDED">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div> */}

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button onClick={fetchHosts} variant="outline" className="flex-1">
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

                {/* Hosts Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Hosts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))}
                            </div>
                        ) : hosts.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Hosts Found</h3>
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
                                            <TableHead>Host</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Events</TableHead>
                                            {/* <TableHead>Status</TableHead> */}
                                            <TableHead>Joined</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {hosts.map((host) => (
                                            <TableRow key={host.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={host.profilePhoto} />
                                                            <AvatarFallback>
                                                                {host.name.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{host.name}</div>
                                                            <div className="text-sm text-slate-500">{host.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="text-sm">{host.email}</div>
                                                        {host.contactNumber && (
                                                            <div className="text-sm text-slate-500">{host.contactNumber}</div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4 text-slate-400" />
                                                            <span className="font-medium">{host._count?.events || 0}</span>
                                                            <span className="text-sm text-slate-500">events</span>
                                                        </div>
                                                        {host.rating && (
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                                                <span className="text-sm">{host.rating.toFixed(1)}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                {/* <TableCell>{getStatusBadge(host.status)}</TableCell> */}
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {formatDate(host.createdAt)}
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
                                                                    setSelectedHost(host);
                                                                    setShowDetailsDialog(true);
                                                                }}
                                                            >
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Details
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
                        {hosts.length > 0 && (
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-slate-600">
                                    Showing {startItem} to {endItem} of {total} hosts
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

            {/* Host Details Dialog */}
            {/* {selectedHost && (
                <HostDetailsDialog
                    host={selectedHost}
                    open={showDetailsDialog}
                    onOpenChange={setShowDetailsDialog}
                />
            )} */}

            {/* Status Update Confirmation Dialog */}
            <AlertDialog open={statusUpdateDialog.open} onOpenChange={(open) => setStatusUpdateDialog(prev => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Host Status</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change {statusUpdateDialog.hostName}&apos;s status to{' '}
                            <span className="font-semibold">{statusUpdateDialog.newStatus}</span>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {/* <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleStatusUpdate(statusUpdateDialog.hostId, statusUpdateDialog.newStatus)}
                            className={statusUpdateDialog.newStatus === 'SUSPENDED' ? 'bg-red-600 hover:bg-red-700' : ''}
                        >
                            Confirm Update
                        </AlertDialogAction>
                    </AlertDialogFooter> */}
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

// Stat Card Component
function StatCard({
    title,
    value,
    suffix = '',
    icon,
    color
}: {
    title: string;
    value: string | number;
    suffix?: string;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500">{title}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">
                            {value}
                            {suffix && <span className="text-lg">{suffix}</span>}
                        </p>
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
