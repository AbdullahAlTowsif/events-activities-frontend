/* eslint-disable @typescript-eslint/no-explicit-any */
import { IParticipant } from "@/types/participant.interface";
import { IPayment } from "@/types/payment.interface";
import { serverFetch } from "@/lib/server-fetch";

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

// Helper function to build query string
function buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value.toString());
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
}

// Get all events with filters and pagination
export async function getAllEvents(
    filters: IEventFilters = {},
    options: IPaginationOptions = {}
): Promise<IEventsResponse> {
    try {
        const queryString = buildQueryString({ ...filters, ...options });
        const endpoint = `/event/events${queryString}`;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch events: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error fetching events:', error);
        return {
            success: false,
            message: error.message || 'Failed to fetch events',
            data: [],
            meta: { page: 1, limit: 10, total: 0 }
        };
    }
}

// Get single event by ID
export async function getEventById(eventId: string): Promise<{ success: boolean; message: string; data?: IEvent }> {
    try {
        const response = await serverFetch.get(`/event/${eventId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch event: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error fetching event:', error);
        return {
            success: false,
            message: error.message || 'Failed to fetch event'
        };
    }
}

// Update event by ID
export async function updateEventById(
    eventId: string,
    data: IUpdateEventData
): Promise<{ success: boolean; message: string; data?: IEvent }> {
    try {
        const response = await serverFetch.patch(`/event/update/${eventId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update event: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error updating event:', error);
        return {
            success: false,
            message: error.message || 'Failed to update event'
        };
    }
}

// Delete event by ID
export async function deleteEventById(eventId: string): Promise<{ success: boolean; message: string }> {
    try {
        const response = await serverFetch.delete(`/event/delete/${eventId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete event: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error deleting event:', error);
        return {
            success: false,
            message: error.message || 'Failed to delete event'
        };
    }
}
