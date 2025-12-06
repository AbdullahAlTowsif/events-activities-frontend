/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { changePasswordValidationSchema } from "@/zod/auth.validation";
import { revalidateTag } from "next/cache";

export const changePassword = async (prevState: any, formData: FormData) => {
    try {
        const payload = {
            oldPassword: formData.get("oldPassword") as string,
            newPassword: formData.get("newPassword") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        };

        // Validate the data
        const validationResult = changePasswordValidationSchema.safeParse(payload);
        console.log(validationResult);

        if (!validationResult.success) {
            // Access errors correctly - use validationResult.error.issues
            return {
                success: false,
                message: "Validation failed",
                errors: validationResult.error.issues.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                })),
                formData: payload,
            };
        }

        // Make API call
        const response = await serverFetch.post("/auth/change-password", {
            body: JSON.stringify({
                oldPassword: validationResult.data.oldPassword,
                newPassword: validationResult.data.newPassword,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || "Failed to change password",
                errors: [],
                formData: payload,
            };
        }

        // Revalidate user info cache - add the path/URL as second argument
        revalidateTag("user-info", "max");

        return {
            success: true,
            message: result.message || "Password changed successfully!",
            errors: [],
            formData: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
        };

    } catch (error: any) {
        console.error("Change password error:", error);
        return {
            success: false,
            message: error.message || "An error occurred. Please try again.",
            errors: [],
            formData: {},
        };
    }
};
