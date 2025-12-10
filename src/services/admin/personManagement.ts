/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export interface IPerson {
    id: string;
    email: string;
    role: 'USER' | 'HOST' | 'ADMIN';
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    profile: {
        id: string;
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber: string;
        address?: string;
        gender: string;
        interests: string[];
        about?: string;
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
    } | null;
}

export interface IPersonsResponse {
    success: boolean;
    message: string;
    data: IPerson[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface IPersonFilters {
    searchTerm?: string;
    role?: string;
    gender?: string;
    isDeleted?: boolean;
}

export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IUpdatePersonData {
    name?: string;
    email?: string;
    contactNumber?: string;
    address?: string;
    gender?: string;
    interests?: string[];
    about?: string;
    profilePhoto?: string;
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

// Get all persons with filters and pagination
export async function getAllPersons(
    filters: IPersonFilters = {},
    options: IPaginationOptions = {}
): Promise<IPersonsResponse> {
    try {
        const queryString = buildQueryString({ ...filters, ...options });
        const endpoint = `/admin/persons/all${queryString}`;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch persons: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error fetching persons:', error);
        return {
            success: false,
            message: error.message || 'Failed to fetch persons',
            data: [],
            meta: { page: 1, limit: 10, total: 0 }
        };
    }
}

// Get single person by ID
export async function getPersonById(personId: string): Promise<{
    success: boolean;
    message: string;
    data?: any
}> {
    try {
        const response = await serverFetch.get(`/admin/${personId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch person: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error fetching person:', error);
        return {
            success: false,
            message: error.message || 'Failed to fetch person'
        };
    }
}

// Update person by ID
export async function updatePersonById(
    personId: string,
    data: IUpdatePersonData
): Promise<{ success: boolean; message: string; data?: any }> {
    try {
        const response = await serverFetch.patch(`/admin/person/${personId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update person: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error updating person:', error);
        return {
            success: false,
            message: error.message || 'Failed to update person'
        };
    }
}

// Soft delete person by ID
export async function softDeletePersonById(personId: string): Promise<{
    success: boolean;
    message: string;
    data?: any
}> {
    try {
        const response = await serverFetch.delete(`/admin/person/${personId}/soft`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete person: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error soft deleting person:', error);
        return {
            success: false,
            message: error.message || 'Failed to delete person'
        };
    }
}

// Restore person by ID
export async function restorePersonById(personId: string): Promise<{
    success: boolean;
    message: string;
    data?: any
}> {
    try {
        const response = await serverFetch.patch(`/admin/person/${personId}/restore`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to restore person: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error restoring person:', error);
        return {
            success: false,
            message: error.message || 'Failed to restore person'
        };
    }
}

// Get person stats
export async function getPersonStats(): Promise<{
    success: boolean;
    message: string;
    data?: {
        total: number;
        users: number;
        hosts: number;
        admins: number;
        active: number;
        deleted: number;
        recentJoin: number;
    }
}> {
    try {
        const response = await serverFetch.get('/admin/persons/stats');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch stats: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error fetching person stats:', error);
        return {
            success: false,
            message: error.message || 'Failed to fetch stats',
            data: {
                total: 0,
                users: 0,
                hosts: 0,
                admins: 0,
                active: 0,
                deleted: 0,
                recentJoin: 0
            }
        };
    }
}
