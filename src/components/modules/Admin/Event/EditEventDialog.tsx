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
// import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import { IEvent, updateEventById } from '@/services/admin/dashboardEventManagement';
import { format } from 'date-fns';

interface EditEventDialogProps {
    event: IEvent;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function EditEventDialog({ event, open, onOpenChange, onSuccess }: EditEventDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState({
        title: event.title,
        type: event.type,
        description: event.description,
        location: event.location,
        // dateTime: new Date(event.dateTime).toISOString().slice(0, 16),
        dateTime: event.dateTime ? format(new Date(event.dateTime), "yyyy-MM-dd'T'HH:mm") : '',
        minParticipants: event.minParticipants || 0,
        maxParticipants: event.maxParticipants || 0,
        joiningFee: event.joiningFee || 0,
        currency: event.currency || 'BDT',
        status: event.status
    });

    const eventTypes = [
        'ENTERTAINMENT', 'SPORTS', 'EDUCATION', 'BUSINESS',
        'NETWORKING', 'CHARITY', 'TECH', 'ART', 'MUSIC'
    ];

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    // Update ONLY the dateTime handling in handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Prepare data for API
            const updateData: any = {};

            // Check for changes in each field
            if (formData.title !== event.title) updateData.title = formData.title;
            if (formData.type !== event.type) updateData.type = formData.type;
            if (formData.description !== event.description) updateData.description = formData.description;
            if (formData.location !== event.location) updateData.location = formData.location;

            // Convert dateTime to proper ISO string
            if (formData.dateTime) {
                const formDate = new Date(formData.dateTime);
                const eventDate = new Date(event.dateTime);

                // Check if dates are different (ignore milliseconds)
                if (formDate.getTime() !== eventDate.getTime()) {
                    updateData.dateTime = formDate.toISOString();
                }
            }

            if (formData.minParticipants !== (event.minParticipants || 0)) {
                updateData.minParticipants = Number(formData.minParticipants) || undefined;
            }

            if (formData.maxParticipants !== (event.maxParticipants || 0)) {
                updateData.maxParticipants = Number(formData.maxParticipants) || undefined;
            }

            if (formData.joiningFee !== (event.joiningFee || 0)) {
                updateData.joiningFee = Number(formData.joiningFee) || undefined;
            }

            if (formData.currency !== (event.currency || 'BDT')) {
                updateData.currency = formData.currency;
            }

            if (formData.status !== event.status) {
                updateData.status = formData.status;
            }

            if (Object.keys(updateData).length === 0) {
                setError('No changes made');
                setLoading(false);
                return;
            }

            console.log('Update data being sent:', updateData);
            const result = await updateEventById(event.id, updateData);

            if (result.success) {
                onSuccess();
                onOpenChange(false);
            } else {
                setError(result.message || 'Failed to update event');
            }
        } catch (error) {
            console.error('Error updating event:', error);
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Event: {event.title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Event Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Event Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                required
                            />
                        </div>

                        {/* Event Type */}
                        <div className="space-y-2">
                            <Label htmlFor="type">Event Type *</Label>
                            <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {eventTypes.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                required
                            />
                        </div>

                        {/* Date & Time */}
                        <div className="space-y-2">
                            <Label htmlFor="dateTime">Date & Time *</Label>
                            <Input
                                id="dateTime"
                                type="datetime-local"
                                value={formData.dateTime}
                                onChange={(e) => handleChange('dateTime', e.target.value)}
                                required
                            />
                        </div>

                        {/* Min Participants */}
                        <div className="space-y-2">
                            <Label htmlFor="minParticipants">Minimum Participants</Label>
                            <Input
                                id="minParticipants"
                                type="number"
                                min="1"
                                value={formData.minParticipants}
                                onChange={(e) => handleChange('minParticipants', e.target.value)}
                            />
                        </div>

                        {/* Max Participants */}
                        <div className="space-y-2">
                            <Label htmlFor="maxParticipants">Maximum Participants</Label>
                            <Input
                                id="maxParticipants"
                                type="number"
                                min="1"
                                value={formData.maxParticipants}
                                onChange={(e) => handleChange('maxParticipants', e.target.value)}
                            />
                        </div>

                        {/* Joining Fee */}
                        <div className="space-y-2">
                            <Label htmlFor="joiningFee">Joining Fee</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="joiningFee"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.joiningFee}
                                    onChange={(e) => handleChange('joiningFee', e.target.value)}
                                />
                                <Select value={formData.currency} onValueChange={(value) => handleChange('currency', value)}>
                                    <SelectTrigger className="w-24">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BDT">BDT</SelectItem>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="GBP">GBP</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status">Status *</Label>
                            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="OPEN">Open</SelectItem>
                                    <SelectItem value="FULL">Full</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={4}
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Update Event
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
