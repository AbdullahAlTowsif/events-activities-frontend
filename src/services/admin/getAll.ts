/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdmin } from "@/types/admin.interface";
import { IUser } from "@/types/user.interface";
import { serverFetch } from "@/lib/server-fetch";

export interface IHost {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber?: string;
    gender?: string;
    about?: string;
    rating?: number;
    createdAt: string;
    updatedAt: string;
    _count?: {
        events: number;
        reviews: number;
    };
}

export interface IHostsResponse {
    success: boolean;
    message: string;
    data: IHost[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface IAdminsResponse {
    success: boolean;
    message: string;
    data: IAdmin[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface IUsersResponse {
    success: boolean;
    message: string;
    data: IUser[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface IHostFilters {
    searchTerm?: string;
    gender?: string;
}

export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export async function getAllHosts(
    filters: IHostFilters = {},
    options: IPaginationOptions = {}
): Promise<IHostsResponse> {
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
        const endpoint = `/admin/hosts/all${queryString ? `?${queryString}` : ''}`;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch hosts: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.log('Error fetching hosts:', error);
        return {
            success: false,
            message: error.message || 'Failed to fetch hosts',
            data: [],
            meta: { page: 1, limit: 10, total: 0 }
        };
    }
}

export async function getAllAdmins(
    filters: IHostFilters = {},
    options: IPaginationOptions = {}
): Promise<IAdminsResponse> {
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
        const endpoint = `/admin${queryString ? `?${queryString}` : ''}`;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch admins: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.log('Error fetching admins:', error);
        return {
            success: false,
            message: error.message || 'Failed to fetch admins',
            data: [],
            meta: { page: 1, limit: 10, total: 0 }
        };
    }
}

export async function getAllUsers(
    filters: IHostFilters = {},
    options: IPaginationOptions = {}
): Promise<IUsersResponse> {
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
        const endpoint = `/admin/users/all${queryString ? `?${queryString}` : ''}`;

        const response = await serverFetch.get(endpoint);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch users: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.log('Error fetching users:', error);
        return {
            success: false,
            message: error.message || 'Failed to fetch users',
            data: [],
            meta: { page: 1, limit: 10, total: 0 }
        };
    }
}
