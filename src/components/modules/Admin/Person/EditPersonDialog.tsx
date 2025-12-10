/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertCircle, X, Check, Heart } from 'lucide-react';
import { IPerson, updatePersonById } from '@/services/admin/personManagement';

interface EditPersonDialogProps {
    person: IPerson;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function EditPersonDialog({ person, open, onOpenChange, onSuccess }: EditPersonDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const [formData, setFormData] = useState({
        name: person.profile?.name || '',
        email: person.email,
        contactNumber: person.profile?.contactNumber || '',
        address: person.profile?.address || '',
        gender: person.profile?.gender || '',
        interests: person.profile?.interests || [],
        about: person.profile?.about || '',
        profilePhoto: person.profile?.profilePhoto || ''
    });

    const [newInterest, setNewInterest] = useState('');

    const genderOptions = [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'OTHER', label: 'Other' }
    ];

    const interestSuggestions = [
        'SPORTS', 'MUSIC', 'ART', 'TECHNOLOGY', 'FOOD',
        'EDUCATION', 'TRAVEL', 'BUSINESS', 'WELLNESS', 'ENTERTAINMENT'
    ];

    const handleChange = (field: string, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddInterest = () => {
        if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
            handleChange('interests', [...formData.interests, newInterest.trim()]);
            setNewInterest('');
        }
    };

    const handleRemoveInterest = (interest: string) => {
        handleChange('interests', formData.interests.filter(i => i !== interest));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Prepare data for API
            const updateData: any = {};

            // Check for changes in each field
            if (formData.name !== (person.profile?.name || '')) updateData.name = formData.name;
            if (formData.email !== person.email) updateData.email = formData.email;
            if (formData.contactNumber !== (person.profile?.contactNumber || '')) {
                updateData.contactNumber = formData.contactNumber;
            }
            if (formData.address !== (person.profile?.address || '')) updateData.address = formData.address;
            if (formData.gender !== (person.profile?.gender || '')) updateData.gender = formData.gender;

            // Compare interests arrays
            if (JSON.stringify(formData.interests) !== JSON.stringify(person.profile?.interests || [])) {
                updateData.interests = formData.interests;
            }

            if (formData.about !== (person.profile?.about || '')) updateData.about = formData.about;
            if (formData.profilePhoto !== (person.profile?.profilePhoto || '')) {
                updateData.profilePhoto = formData.profilePhoto;
            }

            if (Object.keys(updateData).length === 0) {
                setError('No changes made');
                setLoading(false);
                return;
            }

            console.log('Update data being sent:', updateData);
            const result = await updatePersonById(person.id, updateData);

            if (result.success) {
                setSuccess('Profile updated successfully!');
                setTimeout(() => {
                    onSuccess();
                    onOpenChange(false);
                }, 1500);
            } else {
                setError(result.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating person:', error);
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Edit Profile: {person.profile?.name || person.email}
                        <Badge variant="outline" className="ml-2">
                            {person.role}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="bg-green-50 text-green-800 border-green-200">
                            <Check className="h-4 w-4" />
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                disabled
                                onChange={(e) => handleChange('email', e.target.value)}
                                required
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number *</Label>
                            <Input
                                id="contactNumber"
                                value={formData.contactNumber}
                                onChange={(e) => handleChange('contactNumber', e.target.value)}
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
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

                        {/* Address */}
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                rows={2}
                            />
                        </div>

                        {/* Profile Photo URL */}
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="profilePhoto">Profile Photo URL</Label>
                            <Input
                                id="profilePhoto"
                                type="url"
                                value={formData.profilePhoto}
                                onChange={(e) => handleChange('profilePhoto', e.target.value)}
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>
                    </div>

                    {/* Interests */}
                    <div className="space-y-2">
                        <Label>Interests</Label>
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Input
                                    value={newInterest}
                                    onChange={(e) => setNewInterest(e.target.value)}
                                    placeholder="Add an interest..."
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddInterest();
                                        }
                                    }}
                                />
                                <Button type="button" onClick={handleAddInterest} size="sm">
                                    Add
                                </Button>
                            </div>

                            {/* Interest Suggestions */}
                            <div className="flex flex-wrap gap-1">
                                {interestSuggestions.map(suggestion => (
                                    <Button
                                        key={suggestion}
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            if (!formData.interests.includes(suggestion)) {
                                                handleChange('interests', [...formData.interests, suggestion]);
                                            }
                                        }}
                                        disabled={formData.interests.includes(suggestion)}
                                        className="text-xs"
                                    >
                                        <Heart className="w-3 h-3 mr-1" />
                                        {suggestion}
                                    </Button>
                                ))}
                            </div>

                            {/* Selected Interests */}
                            {formData.interests.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.interests.map((interest, index) => (
                                        <Badge key={index} className="flex items-center gap-1">
                                            {interest}
                                            <X
                                                className="w-3 h-3 cursor-pointer"
                                                onClick={() => handleRemoveInterest(interest)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* About/Bio */}
                    <div className="space-y-2">
                        <Label htmlFor="about">About / Bio</Label>
                        <Textarea
                            id="about"
                            value={formData.about}
                            onChange={(e) => handleChange('about', e.target.value)}
                            rows={3}
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Update Profile
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
