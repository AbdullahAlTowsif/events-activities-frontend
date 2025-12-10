/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Filter,
    Users,
    User,
    Shield,
    Calendar,
    Mail,
    Phone,
    MapPin,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    RefreshCw,
    UserPlus,
    CheckCircle,
    XCircle,
    AlertCircle,
    Ban,
    Activity
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
import EditPersonDialog from './EditPersonDialog';
import PersonDetailsDialog from './PersonDetailsDialog';
import { getAllPersons, IPerson, softDeletePersonById } from '@/services/admin/personManagement';

export default function PersonsManagement() {
    // State
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [genderFilter, setGenderFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('active');
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    // Stats
    const [stats, setStats] = useState({
        total: 0,
        users: 0,
        hosts: 0,
        admins: 0,
        active: 0,
        deleted: 0
    });

    // Dialog states
    const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        personId: string;
        personName: string;
    }>({
        open: false,
        personId: '',
        personName: ''
    });

    // Fetch persons
    const fetchPersons = useCallback(async () => {
        setLoading(true);
        try {
            const filters: any = {};
            if (searchTerm) filters.searchTerm = searchTerm;
            if (roleFilter !== 'all') filters.role = roleFilter;
            if (genderFilter !== 'all') filters.gender = genderFilter;
            if (statusFilter !== 'all') {
                filters.isDeleted = statusFilter === 'deleted';
            }

            const options = {
                page,
                limit,
                sortBy,
                sortOrder
            };

            const result = await getAllPersons(filters, options);

            if (result.success) {
                setPersons(result.data);
                setTotal(result.meta.total);

                console.log(result.data);
                // Calculate stats
                const statsData = {
                    total: result.meta.total,
                    users: result.data.filter((p: { role: string; }) => p.role === 'USER').length,
                    hosts: result.data.filter((p: { role: string; }) => p.role === 'HOST').length,
                    admins: result.data.filter((p: { role: string; }) => p.role === 'ADMIN').length,
                    active: result.data.filter((p: { isDeleted: boolean; }) => p.isDeleted === false).length,
                    deleted: result.data.filter((p: { isDeleted: boolean; }) => p.isDeleted === true).length
                };
                setStats(statsData);
            }
        } catch (error) {
            console.error('Error fetching persons:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, roleFilter, genderFilter, statusFilter, page, limit, sortBy, sortOrder]);

    // Initial fetch
    useEffect(() => {
        fetchPersons();
    }, [fetchPersons]);

    // Handle delete person
    const handleDeletePerson = async () => {
        try {
            const result = await softDeletePersonById(deleteDialog.personId);
            if (result.success) {
                // Update local state
                setPersons(prev => prev.map(person =>
                    person.id === deleteDialog.personId
                        ? { ...person, isDeleted: true }
                        : person
                ));
                setDeleteDialog({ open: false, personId: '', personName: '' });
                // Refresh stats
                fetchPersons();
            }
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    // Handle restore person (you'll need to implement this endpoint)
    const handleRestorePerson = async (personId: string) => {
        try {
            // Implement restore endpoint
            // const result = await restorePersonById(personId);
            // if (result.success) {
            //     fetchPersons();
            // }
        } catch (error) {
            console.error('Error restoring person:', error);
        }
    };

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm('');
        setRoleFilter('all');
        setGenderFilter('all');
        setStatusFilter('active');
        setSortBy('createdAt');
        setSortOrder('desc');
        setPage(1);
    };

    // Get role badge
    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'ADMIN':
                return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
            case 'HOST':
                return <Badge className="bg-purple-100 text-purple-800">Host</Badge>;
            case 'USER':
                return <Badge className="bg-blue-100 text-blue-800">User</Badge>;
            default:
                return <Badge variant="outline">{role}</Badge>;
        }
    };

    // Get status badge
    const getStatusBadge = (isDeleted: boolean) => {
        return isDeleted ? (
            <Badge variant="destructive">Deleted</Badge>
        ) : (
            <Badge className="bg-green-100 text-green-800">Active</Badge>
        );
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Get gender icon
    const getGenderIcon = (gender: string) => {
        switch (gender?.toUpperCase()) {
            case 'MALE':
                return '👨';
            case 'FEMALE':
                return '👩';
            default:
                return '👤';
        }
    };

    // Pagination
    const totalPages = Math.ceil(total / limit);
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    // Role options
    const roleOptions = [
        { value: 'all', label: 'All Roles' },
        { value: 'USER', label: 'Users' },
        { value: 'HOST', label: 'Hosts' },
        { value: 'ADMIN', label: 'Admins' }
    ];

    // Gender options
    const genderOptions = [
        { value: 'all', label: 'All Genders' },
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'OTHER', label: 'Other' }
    ];

    // Status options
    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'deleted', label: 'Deleted' }
    ];

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Persons</h1>
                    <p className="text-slate-600">Manage all users, hosts, and administrators on the platform</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <StatCard
                        title="Total"
                        value={stats.total}
                        icon={<Users className="w-5 h-5" />}
                        color="slate"
                        trend={stats.total > 0 ? 'up' : 'neutral'}
                    />
                    <StatCard
                        title="Users"
                        value={stats.users}
                        icon={<User className="w-5 h-5" />}
                        color="blue"
                        trend="up"
                    />
                    <StatCard
                        title="Hosts"
                        value={stats.hosts}
                        icon={<Calendar className="w-5 h-5" />}
                        color="purple"
                        trend="up"
                    />
                    <StatCard
                        title="Admins"
                        value={stats.admins}
                        icon={<Shield className="w-5 h-5" />}
                        color="red"
                        trend="neutral"
                    />
                    <StatCard
                        title="Active"
                        value={stats.active}
                        icon={<CheckCircle className="w-5 h-5" />}
                        color="green"
                        trend="up"
                    />
                    <StatCard
                        title="Deleted"
                        value={stats.deleted}
                        icon={<Ban className="w-5 h-5" />}
                        color="orange"
                        trend="down"
                    />
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                            {/* Search */}
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            {/* Role Filter */}
                            <div>
                                <Select value={roleFilter} onValueChange={setRoleFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roleOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Gender Filter */}
                            <div>
                                <Select value={genderFilter} onValueChange={setGenderFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genderOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button onClick={fetchPersons} variant="outline" className="flex-1">
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

                {/* Persons Table */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>All Persons</CardTitle>
                        <Button size="sm" onClick={() => window.open('/create-host', '_blank')}>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add Host
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))}
                            </div>
                        ) : persons.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Persons Found</h3>
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
                                            <TableHead>Person</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Gender</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {persons.map((person) => (
                                            <TableRow key={person.id} className={person.isDeleted ? 'bg-red-50' : ''}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="w-10 h-10">
                                                            <AvatarImage
                                                                src={person.profile?.profilePhoto}
                                                                alt={person.profile?.name}
                                                            />
                                                            <AvatarFallback className={
                                                                person.role === 'ADMIN' ? 'bg-red-100 text-red-600' :
                                                                    person.role === 'HOST' ? 'bg-purple-100 text-purple-600' :
                                                                        'bg-blue-100 text-blue-600'
                                                            }>
                                                                {person.profile?.name?.charAt(0).toUpperCase() ||
                                                                    person.email.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">
                                                                {person.profile?.name || 'No Name'}
                                                                {person.role === 'ADMIN' && (
                                                                    <Shield className="w-3 h-3 text-red-500 inline ml-1" />
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-slate-500">
                                                                {person.email}
                                                            </div>
                                                            {person.profile?.address && (
                                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                                    <MapPin className="w-3 h-3" />
                                                                    {person.profile.address.substring(0, 20)}...
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1 text-sm">
                                                            <Phone className="w-3 h-3 text-slate-400" />
                                                            <span>{person.profile?.contactNumber || 'N/A'}</span>
                                                        </div>
                                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            <span className="truncate max-w-[150px]">{person.email}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getRoleBadge(person.role)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">{getGenderIcon(person.profile?.gender || '')}</span>
                                                        <span className="text-sm capitalize">
                                                            {person.profile?.gender?.toLowerCase() || 'N/A'}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="text-sm">{formatDate(person.createdAt)}</div>
                                                        <div className="text-xs text-slate-500">
                                                            {new Date(person.createdAt).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(person.isDeleted)}
                                                    {person.profile?.interests && person.profile.interests.length > 0 && (
                                                        <div className="mt-1">
                                                            <span className="text-xs text-slate-500">
                                                                {person.profile.interests.slice(0, 2).join(', ')}
                                                                {person.profile.interests.length > 2 && '...'}
                                                            </span>
                                                        </div>
                                                    )}
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
                                                                    setSelectedPerson(person);
                                                                    setShowDetailsDialog(true);
                                                                }}
                                                            >
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            {!person.isDeleted && (
                                                                <>
                                                                    <DropdownMenuItem
                                                                        onClick={() => {
                                                                            setSelectedPerson(person);
                                                                            setShowEditDialog(true);
                                                                        }}
                                                                    >
                                                                        <Edit className="w-4 h-4 mr-2" />
                                                                        Edit Profile
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        onClick={() => {
                                                                            setDeleteDialog({
                                                                                open: true,
                                                                                personId: person.id,
                                                                                personName: person.profile?.name || person.email
                                                                            });
                                                                        }}
                                                                        className="text-red-600"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                                        Delete Person
                                                                    </DropdownMenuItem>
                                                                </>
                                                            )}
                                                            {person.isDeleted && (
                                                                <DropdownMenuItem
                                                                    onClick={() => handleRestorePerson(person.id)}
                                                                    className="text-green-600"
                                                                >
                                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                                    Restore Person
                                                                </DropdownMenuItem>
                                                            )}
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
                        {persons.length > 0 && (
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-slate-600">
                                    Showing {startItem} to {endItem} of {total} persons
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

            {/* Person Details Dialog */}
            {selectedPerson && (
                <PersonDetailsDialog
                    person={selectedPerson}
                    open={showDetailsDialog}
                    onOpenChange={setShowDetailsDialog}
                    onEdit={() => {
                        setShowDetailsDialog(false);
                        setShowEditDialog(true);
                    }}
                    onDelete={() => {
                        setDeleteDialog({
                            open: true,
                            personId: selectedPerson.id,
                            personName: selectedPerson.profile?.name || selectedPerson.email
                        });
                        setShowDetailsDialog(false);
                    }}
                />
            )}

            {/* Edit Person Dialog */}
            {selectedPerson && (
                <EditPersonDialog
                    person={selectedPerson}
                    open={showEditDialog}
                    onOpenChange={setShowEditDialog}
                    onSuccess={() => {
                        setShowEditDialog(false);
                        fetchPersons(); // Refresh data
                    }}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Person</AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="text-sm text-slate-600 mb-4">
                        Are you sure you want to delete &quot;{deleteDialog.personName}&quot;?
                        This action will:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Soft delete the person (can be restored later)</li>
                            <li>Remove their access to the platform</li>
                            {selectedPerson?.role === 'HOST' && (
                                <li>Disable all their events and host privileges</li>
                            )}
                            {selectedPerson?.role === 'ADMIN' && (
                                <li>Remove their admin privileges</li>
                            )}
                        </ul>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeletePerson}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete Person
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
    color,
    trend
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend: 'up' | 'down' | 'neutral';
}) {
    const getTrendColor = () => {
        switch (trend) {
            case 'up': return 'text-green-600';
            case 'down': return 'text-red-600';
            default: return 'text-slate-600';
        }
    };

    const getTrendIcon = () => {
        switch (trend) {
            case 'up': return '↗';
            case 'down': return '↘';
            default: return '→';
        }
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500">{title}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                        <div className={`text-xs mt-1 ${getTrendColor()}`}>
                            {getTrendIcon()} {trend !== 'neutral' ? 'Last 7 days' : ''}
                        </div>
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
