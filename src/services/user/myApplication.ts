export interface IMyApplication {
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
}

export interface IMyApplicationsResponse {
    success: boolean;
    message: string;
    data: IMyApplication[];
}

// Get user's applications
export async function getMyApplications(): Promise<IMyApplicationsResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/host/my-applications`, {
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
