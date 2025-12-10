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
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    Shield,
    Users,
    Activity,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    ExternalLink,
    Heart,
    Info
} from 'lucide-react';
import { IPerson } from '@/services/admin/personManagement';

interface PersonDetailsDialogProps {
    person: IPerson;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function PersonDetailsDialog({
    person,
    open,
    onOpenChange,
    onEdit,
    onDelete
}: PersonDetailsDialogProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'ADMIN': return <Shield className="w-4 h-4" />;
            case 'HOST': return <Users className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'text-red-600 bg-red-50';
            case 'HOST': return 'text-purple-600 bg-purple-50';
            default: return 'text-blue-600 bg-blue-50';
        }
    };

    const getGenderDisplay = (gender?: string) => {
        switch (gender?.toUpperCase()) {
            case 'MALE': return { text: 'Male', icon: '👨' };
            case 'FEMALE': return { text: 'Female', icon: '👩' };
            default: return { text: 'Other', icon: '👤' };
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Person Details
                        <Badge variant={person.isDeleted ? "destructive" : "default"}>
                            {person.isDeleted ? 'Deleted' : 'Active'}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-start gap-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage
                                src={person.profile?.profilePhoto}
                                alt={person.profile?.name}
                            />
                            <AvatarFallback className={
                                person.role === 'ADMIN' ? 'bg-red-100 text-red-600 text-2xl' :
                                    person.role === 'HOST' ? 'bg-purple-100 text-purple-600 text-2xl' :
                                        'bg-blue-100 text-blue-600 text-2xl'
                            }>
                                {person.profile?.name?.charAt(0).toUpperCase() ||
                                    person.email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-xl font-bold text-slate-900">
                                    {person.profile?.name || 'No Name'}
                                </h2>
                                <div className={`px-2 py-1 rounded-md text-xs font-medium ${getRoleColor(person.role)}`}>
                                    <div className="flex items-center gap-1">
                                        {getRoleIcon(person.role)}
                                        <span>{person.role}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-4">{person.profile?.about || 'No bio provided'}</p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold text-slate-900 mb-3">Contact Information</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-sm text-slate-500">Email</p>
                                            <p className="font-medium">{person.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-sm text-slate-500">Phone</p>
                                            <p className="font-medium">{person.profile?.contactNumber || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-sm text-slate-500">Address</p>
                                            <p className="font-medium">{person.profile?.address || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold text-slate-900 mb-3">Personal Information</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <User className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-sm text-slate-500">Gender</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <span className="text-lg">{getGenderDisplay(person.profile?.gender).icon}</span>
                                                {getGenderDisplay(person.profile?.gender).text}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-sm text-slate-500">Joined</p>
                                            <p className="font-medium">{formatDate(person.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-sm text-slate-500">Last Updated</p>
                                            <p className="font-medium">{formatDate(person.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Interests */}
                    {person.profile?.interests && person.profile.interests.length > 0 && (
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold text-slate-900 mb-3">Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {person.profile.interests.map((interest, index) => (
                                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                                            <Heart className="w-3 h-3" />
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Account Information */}
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="font-semibold text-slate-900 mb-3">Account Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500">Account ID</p>
                                    <p className="font-medium text-sm font-mono">{person.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Profile ID</p>
                                    <p className="font-medium text-sm font-mono">{person.profile?.id || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Status</p>
                                    <div className="flex items-center gap-2">
                                        {person.isDeleted ? (
                                            <>
                                                <XCircle className="w-4 h-4 text-red-500" />
                                                <span className="text-red-600 font-medium">Deleted</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-green-600 font-medium">Active</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Role Permissions</p>
                                    <div className="flex items-center gap-2">
                                        {getRoleIcon(person.role)}
                                        <span className="font-medium">{person.role}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Notes */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Info className="w-4 h-4 text-slate-400" />
                                <h3 className="font-semibold text-slate-900">Additional Information</h3>
                            </div>
                            <div className="text-sm text-slate-600 space-y-2">
                                <p>This account was created on {formatDate(person.createdAt)}</p>
                                {person.profile?.about && (
                                    <p className="mt-2">
                                        <strong>About:</strong> {person.profile.about}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <DialogFooter className="flex gap-2 sm:gap-0">
                    {!person.isDeleted && (
                        <>
                            <Button variant="outline" onClick={onDelete} className="text-red-600 border-red-200 hover:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                            <Button variant="outline" onClick={onEdit}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Profile
                            </Button>
                        </>
                    )}
                    {person.role === 'HOST' && (
                        <Button onClick={() => window.open(`/host/${person.profile?.id}`, '_blank')}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Host Profile
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
