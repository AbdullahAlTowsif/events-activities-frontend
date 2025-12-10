/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function joinEvent(id: string) {
    try {
        const response = await serverFetch.post(`/event/${id}/join`)
        const result = await response.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}


export async function leaveEvent(id: string) {
    try {
        const response = await serverFetch.post(`/event/${id}/leave`)
        const result = await response.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}


export async function getParticipants(id: string) {
    try {
        const response = await serverFetch.get(`/event/${id}/participants`);
        const result = await response.json();
        console.log("get participants result", result);
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong'
        };
    }
}

export async function getMyPaidEvents() {
    try {
        const response = await serverFetch.get(`/user/my-paid-events`);
        const result = await response.json();
        console.log("get my paid events result", result);
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong'
        };
    }
}


export async function initPayment(eventId: string, amount: number, currency: string = 'BDT') {
    try {
        const response = await serverFetch.post(`/payment/init/${eventId}`, {
            body: JSON.stringify({ amount, currency }), // Send as JSON in body
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Payment initialization error:', error);
        return {
            success: false,
            message: error.message || 'Failed to initialize payment'
        };
    }
}

// export const verifyPayment = async (sessionId: string) => {
//     try {
//         const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api";
//         const url = `${BACKEND_API_URL}/payment/verify?session_id=${sessionId}`;

//         console.log('Making request to:', url);

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     } catch (error: any) {
//         console.error('Payment verification error:', error);
//         return {
//             success: false,
//             message: error.message || 'Failed to verify payment'
//         };
//     }
// };

// In event.service.ts


export const verifyPayment = async (sessionId: string) => {
    try {
        // Use serverFetch instead of fetch
        const response = await serverFetch.get(`/payment/verify?session_id=${sessionId}`);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}. Message: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Verification response data:', data);
        return data;
        
    } catch (error: any) {
        console.log('Payment verification error details:', error);
        return {
            success: false,
            message: error.message || 'Failed to verify payment'
        };
    }
};
