/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IEvent } from "@/types/event.interface";
import { createEventValidationSchema } from "@/zod/event.validation";

export const createEvent = async (_currentState: any, formData: any): Promise<any> => {

    try {

        const payload = {
            title: formData.get('title'),
            type: formData.get('type'),
            description: formData.get('description'),
            location: formData.get('location'),
            dateTime: formData.get('dateTime'),
            minParticipants: Number(formData.get('minParticipants')),
            maxParticipants: Number(formData.get('maxParticipants')),
            joiningFee: Number(formData.get('joiningFee')),
            currency: formData.get('currency'),
        }

        if (zodValidator(payload, createEventValidationSchema).success === false) {
            return zodValidator(payload, createEventValidationSchema);
        }

        const validatedPayload: any = zodValidator(payload, createEventValidationSchema).data;

        const eventData = {
            title: validatedPayload.title,
            type: validatedPayload.type,
            description: validatedPayload.description,
            location: validatedPayload.location,
            dateTime: validatedPayload.dateTime,
            minParticipants: Number(validatedPayload.minParticipants) || 0,
            maxParticipants: Number(validatedPayload.maxParticipants) || 0,
            joiningFee: Number(validatedPayload.joiningFee) || 0,
            currency: validatedPayload.currency || "BDT",
        }
        console.log("event Data", eventData);

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(eventData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/event/create-event", {
            body: newFormData
        });

        const result = await res.json();
        console.log(res, "res");

        return result;
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }

        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}



export async function getHostProfile(email: string) {
    try {
        const response = await serverFetch.get(`/event/host/${email}`);
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


export async function getMyCreatedEvents() {
    try {
        const response = await serverFetch.get('/event/host/my-created-events');
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message || 'Failed to fetch your events'
        };
    }
}

export async function deleteEvent(eventId: string) {
    try {
        const response = await serverFetch.delete(`/event/delete/${eventId}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message || 'Failed to delete event'
        };
    }
}

export async function updateEventById(eventId: string, data: Partial<IEvent>) {
    try {
        const response = await serverFetch.patch(`/event/update/${eventId}`, {
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
            message: error.message || 'Failed to update event'
        };
    }
}
