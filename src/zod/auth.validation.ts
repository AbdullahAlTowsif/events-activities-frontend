/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerUserValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Valid email is required" }),
    role: z.enum(["ADMIN", "HOST", "USER"], { message: "Role must be 'ADMIN', 'HOST' or 'USER' " }).default("USER"),
    profilePhoto: z.string().optional(),
    contactNumber: z.string({
        error: "Contact Number is required"
    }),
    about: z.string().optional(),
    address: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE"], { message: "Gender must be either 'MALE' or 'FEMALE' " }),
    interests: z.array(z.string("Interest is required")),
    password: z.string().min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        error: "Confirm Password is required and must be at least 6 characters long",
    }),
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});
