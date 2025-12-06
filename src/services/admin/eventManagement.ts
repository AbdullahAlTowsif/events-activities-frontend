/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IEvent } from "@/types/event.interface";
import { updateEventValidationSchema } from "@/zod/event.validation";

export async function getEvents(queryString?: string) {
    try {
        const response = await serverFetch.get(`/event/events${queryString ? `?${queryString}` : ""}`);
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

export async function getEventById(id: string) {
    try {
        const response = await serverFetch.get(`/event/${id}`)
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

export async function updateEvent(id: string, _prevState: any, formData: FormData) {
    const minParticipantsValue = formData.get("minParticipants");
    const maxParticipantsValue = formData.get("maxParticipants");
    const joiningFeeValue = formData.get("joiningFee");


    const validationPayload: Partial<IEvent> = {
        currency: formData.get("currency") as string,
        minParticipants: minParticipantsValue ? Number(minParticipantsValue) : 0,
        maxParticipants: maxParticipantsValue ? Number(maxParticipantsValue) : 0,
        joiningFee: joiningFeeValue ? Number(joiningFeeValue) : 0,
    };

    const validatedPayload = zodValidator(validationPayload, updateEventValidationSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }

    try {
        const response = await serverFetch.patch(`/event/update/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedPayload.data),
        })
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
            formData: validationPayload,
        }
    }
}

export async function deleteEvent(id: string) {
    try {
        const response = await serverFetch.delete(`/event/delete/${id}`)
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
