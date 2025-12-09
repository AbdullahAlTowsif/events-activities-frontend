import { IParticipant } from "@/types/participant.interface";
import { IPayment } from "@/types/payment.interface";

// services/event/event-management.service.ts
export interface IEvent {
    id: string;
    hostEmail: string;
    title: string;
    type: string;
    description: string;
    location: string;
    dateTime: string;
    minParticipants?: number;
    maxParticipants?: number;
    joiningFee?: number;
    currency?: string;
    status: 'OPEN' | 'FULL' | 'CANCELLED' | 'COMPLETED';
    images: string[];
    createdAt: string;
    updatedAt: string;
    host?: {
        id: string;
        name: string;
        email: string;
        profilePhoto?: string;
    };
    participants?: IParticipant[];
    payments?: IPayment[];
    _count?: {
        participants: number;
        payments: number;
    };
}

export interface IEventsResponse {
    success: boolean;
    message: string;
    data: IEvent[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface IEventFilters {
    searchTerm?: string;
    type?: string;
    status?: string;
    location?: string;
}

export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IUpdateEventData {
    title?: string;
    type?: string;
    description?: string;
    location?: string;
    dateTime?: string;
    minParticipants?: number;
    maxParticipants?: number;
    joiningFee?: number;
    currency?: string;
    status?: string;
}

// Get all events with filters and pagination
export async function getAllEvents(
    filters: IEventFilters = {},
    options: IPaginationOptions = {}
): Promise<IEventsResponse> {
    try {
        // Build query parameters
        const params = new URLSearchParams();

        // Add filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.append(key, value.toString());
            }
        });

        // Add pagination options
        Object.entries(options).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.append(key, value.toString());
            }
        });

        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/event/events${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        return {
            success: false,
            message: 'Failed to fetch events',
            data: [],
            meta: { page: 1, limit: 10, total: 0 }
        };
    }
}

// Get single event by ID
export async function getEventById(eventId: string): Promise<{ success: boolean; message: string; data?: IEvent }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/event/${eventId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching event:', error);
        return { success: false, message: 'Failed to fetch event' };
    }
}

// Update event by ID
export async function updateEventById(
    eventId: string,
    data: IUpdateEventData
): Promise<{ success: boolean; message: string; data?: IEvent }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/event/update/${eventId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating event:', error);
        return { success: false, message: 'Failed to update event' };
    }
}

// Delete event by ID
export async function deleteEventById(eventId: string): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/event/delete/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error deleting event:', error);
        return { success: false, message: 'Failed to delete event' };
    }
}
