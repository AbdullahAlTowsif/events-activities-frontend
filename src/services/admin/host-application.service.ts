/* eslint-disable @typescript-eslint/no-explicit-any */
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/host/admin/applications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch applications: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching applications:', error);
        return {
            success: false,
            message: 'Failed to fetch applications',
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/host/${applicationId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating application status:', error);
        return { success: false, message: 'Failed to update application status' };
    }
}

