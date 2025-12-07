/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export interface HostApplicationData {
    reason?: string;
    contactNumber?: string;
    address?: string;
}

export async function applyToBeHost(data: HostApplicationData) {
    try {
        const response = await serverFetch.post('/host/apply', {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message || 'Failed to submit host application'
        };
    }
}

export async function getMyHostApplication() {
    try {
        const response = await serverFetch.get('/host/my-applications');
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message || 'Failed to fetch host application'
        };
    }
}
