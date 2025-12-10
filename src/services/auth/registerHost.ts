/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerAdminValidationZodSchema } from "@/zod/auth.validation";
import { loginPerson } from "./login";


export const registerHost = async (_currentState: any, formData: any): Promise<any> => {

    try {

        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            contactNumber: formData.get('contactNumber'),
            about: formData.get('about'),
            address: formData.get('address'),
            gender: formData.get('gender'),
            interests: formData.get("interests")
                ?.toString()
                .split(",")
                .map((i: string) => i.trim())
                .filter(Boolean),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        if (zodValidator(payload, registerAdminValidationZodSchema).success === false) {
            return zodValidator(payload, registerAdminValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerAdminValidationZodSchema).data;

        const registerData = {
            password: validatedPayload.password,
            host: {
                name: validatedPayload.name,
                address: validatedPayload.address,
                email: validatedPayload.email,
                contactNumber: validatedPayload.contactNumber,
                about: validatedPayload.about,
                gender: validatedPayload.gender,
                interests: validatedPayload.interests,
            }
        }

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(registerData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/user/create-host", {
            body: newFormData
        });

        const result = await res.json();
        console.log(res, "res host");

        if (result.success) {
            await loginPerson(_currentState, formData)
        }

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
