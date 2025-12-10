/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Get all persons with filters and pagination
export async function getAllPersons(
    filters: IPersonFilters = {},
    options: IPaginationOptions = {}
): Promise<IPersonsResponse> {
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
        const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/admin/persons/all${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch persons: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching persons:', error);
        return {
            success: false,
            message: 'Failed to fetch persons',
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admin/${personId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching person:', error);
        return { success: false, message: 'Failed to fetch person' };
    }
}

// Update person by ID
export async function updatePersonById(
    personId: string,
    data: IUpdatePersonData
): Promise<{ success: boolean; message: string; data?: any }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admin/person/${personId}`, {
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
        console.error('Error updating person:', error);
        return { success: false, message: 'Failed to update person' };
    }
}


// Soft delete person by ID
export async function softDeletePersonById(personId: string): Promise<{
    success: boolean;
    message: string;
    data?: any
}> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admin/person/${personId}/soft`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error soft deleting person:', error);
        return { success: false, message: 'Failed to delete person' };
    }
}

// Restore person by ID
export async function restorePersonById(personId: string): Promise<{
    success: boolean;
    message: string;
    data?: any
}> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admin/person/${personId}/restore`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error restoring person:', error);
        return { success: false, message: 'Failed to restore person' };
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/admin/persons/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching person stats:', error);
        return {
            success: false,
            message: 'Failed to fetch stats',
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
