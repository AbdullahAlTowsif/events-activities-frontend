/* eslint-disable @typescript-eslint/no-explicit-any */
// components/host/EditEventDialog.tsx
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, MapPin, Users, DollarSign, Type, FileText } from 'lucide-react';
import { IEvent } from '@/types/event.interface';
import { format } from 'date-fns';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Simplified schema without complex unions
const eventSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    type: z.string().min(1, 'Event type is required'),
    location: z.string().min(3, 'Location must be at least 3 characters'),
    dateTime: z.string().min(1, 'Date and time is required'),
    // Handle optional numbers as strings initially
    joiningFee: z.string().optional().transform((val) => val ? parseFloat(val) : undefined),
    currency: z.string().default('USD'),
    minParticipants: z.string().optional().transform((val) => val ? parseInt(val) : undefined),
    maxParticipants: z.string().optional().transform((val) => val ? parseInt(val) : undefined),
});

// Create a separate type for form values (strings for inputs)
type EventFormValues = {
    title: string;
    description: string;
    type: string;
    location: string;
    dateTime: string;
    joiningFee: string;
    currency: string;
    minParticipants: string;
    maxParticipants: string;
};

interface EditEventDialogProps {
    event: IEvent;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate: (event: IEvent) => Promise<void>;
}

export default function EditEventDialog({ event, open, onOpenChange, onUpdate }: EditEventDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Convert event data to form values
    const getDefaultValues = (): EventFormValues => ({
        title: event.title || '',
        description: event.description || '',
        type: event.type || '',
        location: event.location || '',
        dateTime: event.dateTime ? format(new Date(event.dateTime), "yyyy-MM-dd'T'HH:mm") : '',
        joiningFee: event.joiningFee?.toString() || '',
        currency: event.currency || 'USD',
        minParticipants: event.minParticipants?.toString() || '',
        maxParticipants: event.maxParticipants?.toString() || '',
    });

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema) as any, // Type assertion to fix TypeScript errors
        defaultValues: getDefaultValues(),
    });

    const onSubmit = async (formData: EventFormValues) => {
        setIsSubmitting(true);
        try {
            // Parse form data back to proper types
            const updatedEvent: IEvent = {
                ...event,
                title: formData.title,
                description: formData.description,
                type: formData.type,
                location: formData.location,
                dateTime: new Date(formData.dateTime).toISOString(),
                joiningFee: formData.joiningFee ? parseFloat(formData.joiningFee) : undefined,
                currency: formData.currency,
                minParticipants: formData.minParticipants ? parseInt(formData.minParticipants) : undefined,
                maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
            };

            await onUpdate(updatedEvent);
        } catch (error) {
            console.error('Error updating event:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogDescription>
                        Update the details of your event. Make sure all information is accurate.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Type className="w-4 h-4" />
                                            Event Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Event title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select event type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Music">Music</SelectItem>
                                                <SelectItem value="Sports">Sports</SelectItem>
                                                <SelectItem value="Gaming">Gaming</SelectItem>
                                                <SelectItem value="Food">Food</SelectItem>
                                                <SelectItem value="Outdoor">Outdoor</SelectItem>
                                                <SelectItem value="Tech">Tech</SelectItem>
                                                <SelectItem value="Art">Art</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your event in detail..."
                                            {...field}
                                            rows={4}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            Location
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Event location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dateTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Date & Time
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Participants */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="minParticipants"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            Min Participants
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                placeholder="Optional"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="maxParticipants"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            Max Participants
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                placeholder="Optional"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Pricing */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="joiningFee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4" />
                                            Joining Fee
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00 (Free if empty)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="currency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Currency</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select currency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="USD">USD ($)</SelectItem>
                                                <SelectItem value="EUR">EUR (€)</SelectItem>
                                                <SelectItem value="GBP">GBP (£)</SelectItem>
                                                <SelectItem value="BDT">BDT (৳)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-linear-to-r from-blue-600 to-purple-600"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Event'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
