/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { loginPerson } from "./login";


export const registerUser = async (_currentState: any, formData: any): Promise<any> => {

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

        // const validatedFields = registerValidationZodSchema.safeParse(validationData);

        // console.log(validatedFields, "val");

        // if (!validatedFields.success) {
        //     return {
        //         success: false,
        //         errors: validatedFields.error.issues.map(issue => {
        //             return {
        //                 field: issue.path[0],
        //                 message: issue.message,
        //             }
        //         }
        //         )
        //     }
        // }

        if (zodValidator(payload, registerUserValidationZodSchema).success === false) {
            return zodValidator(payload, registerUserValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerUserValidationZodSchema).data;

        const registerData = {
            password: validatedPayload.password,
            user: {
                name: validatedPayload.name,
                address: validatedPayload.address,
                email: validatedPayload.email,
                contactNumber: validatedPayload.contactNumber,
                about: validatedPayload.about,
                gender: validatedPayload.gender,
                interests: validatedPayload.interests,
            }
        }

        // const registerData = {
        //     password: formData.get("password"),
        //     patient: {
        //         name: formData.get('name'),
        //         address: formData.get('address'),
        //         email: formData.get('email')
        //     }
        // }

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(registerData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/user/create-user", {
            body: newFormData
        });

        const result = await res.json();
        // console.log(res, "res");

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
