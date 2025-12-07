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

