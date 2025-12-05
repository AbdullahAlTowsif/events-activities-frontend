/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
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


