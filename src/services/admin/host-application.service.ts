/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export interface IHostApplication {
    id: string;
    userEmail: string;
    name: string;
    contactNumber?: string;
    address?: string;
    gender?: string;
    interests?: string[];
    bio?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
    feedback?: string;
    reviewedBy?: string;
    reviewedAt?: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string;
        email: string;
        profilePhoto?: string;
        gender?: string;
        createdAt: string;
    };
}

export interface IHostApplicationsResponse {
    success: boolean;
    message: string;
    data: IHostApplication[];
}

export interface IUpdateApplicationStatusData {
    status: 'APPROVED' | 'REJECTED';
    feedback?: string;
}

// Get all pending applications
export async function getAllApplications(): Promise<IHostApplicationsResponse> {
    try {
        const response = await serverFetch.get('/host/admin/applications');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch applications: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error fetching applications:', error);
        return {
            success: false,
            message: error.message || 'Failed to fetch applications',
            data: []
        };
    }
}

// Update application status
export async function updateApplicationStatus(
    applicationId: string,
    data: IUpdateApplicationStatusData
): Promise<{ success: boolean; message: string; data?: any }> {
    try {
        const response = await serverFetch.put(`/host/${applicationId}/status`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update application status: ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error('Error updating application status:', error);
        return {
            success: false,
            message: error.message || 'Failed to update application status'
        };
    }
}
