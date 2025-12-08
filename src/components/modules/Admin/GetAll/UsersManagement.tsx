/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Filter,
    Users,
    MoreVertical,
    Eye,
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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllUsers } from '@/services/admin/getAll';
import { IUser } from '@/types/user.interface';

export default function UsersManagement() {
    // State
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    // Fetch users
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const filters: any = {};
            if (searchTerm) filters.searchTerm = searchTerm;
            if (genderFilter !== 'all') filters.gender = genderFilter;

            const options = {
                page,
                limit,
                sortBy,
                sortOrder
            };

            const result = await getAllUsers(filters, options);

            if (result.success) {
                setUsers(result.data);
                setTotal(result.meta.total);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, genderFilter, page, limit, sortBy, sortOrder]);

    // Initial fetch
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm('');
        setGenderFilter('all');
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
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Users</h1>
                    <p className="text-slate-600">Manage all users on the platform</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Users"
                        value={total}
                        icon={<Users className="w-5 h-5" />}
                        color="blue"
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

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button onClick={fetchUsers} variant="outline" className="flex-1">
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

                {/* User Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                ))}
                            </div>
                        ) : users.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Users Found</h3>
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
                                            <TableHead>User</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={user.profilePhoto} />
                                                            <AvatarFallback>
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{user.name}</div>
                                                            <div className="text-sm text-slate-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="text-sm">{user.email}</div>
                                                        {user.contactNumber && (
                                                            <div className="text-sm text-slate-500">{user.contactNumber}</div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {formatDate(user.createdAt)}
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
                                                                    setSelectedUser(user);
                                                                    setShowDetailsDialog(true);
                                                                }}
                                                            >
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
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
                        {users.length > 0 && (
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-slate-600">
                                    Showing {startItem} to {endItem} of {total} users
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

