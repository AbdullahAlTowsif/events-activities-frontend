"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/InputFieldError";
import { registerUser } from "@/services/auth/registerUser";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerUser, null);
    console.log(state, "state");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    // const [gender, setGender] = useState<"MALE" | "FEMALE">(
    //     user?.gender || "MALE"
    // );

    const [gender, setGender] = useState<"MALE" | "FEMALE">(
        (state?.formData?.gender as "MALE" | "FEMALE") || "MALE"
    );

    // const getFieldError = (fieldName: string) => {
    //     if (state && state.errors) {
    //         const error = state.errors.find((err: any) => err.field === fieldName);
    //         if (error) {
    //             return error.message;
    //         } else {
    //             return null;
    //         }
    //     } else {
    //         return null;
    //     }
    // };

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction}>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input id="name" name="name" type="text" placeholder="John Doe" />
                        {/* {getInputFieldError("name", state) && (
                            <FieldDescription className="text-red-600">
                                {getInputFieldError("name", state)}
                            </FieldDescription>
                        )} */}
                        <InputFieldError field="name" state={state} />
                    </Field>
                    {/* Address */}
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="123 Main St"
                        />

                        {/* {getInputFieldError("address", state) && (
                            <FieldDescription className="text-red-600">
                                {getInputFieldError("address", state)}
                            </FieldDescription>
                        )} */}
                        <InputFieldError field="address" state={state} />
                    </Field>
                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                        />

                        {/* {getInputFieldError("email", state) && (
                            <FieldDescription className="text-red-600">
                                {getInputFieldError("email", state)}
                            </FieldDescription>
                        )} */}
                        <InputFieldError field="email" state={state} />
                    </Field>
                    {/* Contact Number */}
                    <Field>
                        <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                        <Input
                            id="contactNumber"
                            name="contactNumber"
                            type="text"
                            placeholder="+8801........."
                        />

                        {/* {getInputFieldError("email", state) && (
                            <FieldDescription className="text-red-600">
                                {getInputFieldError("email", state)}
                            </FieldDescription>
                        )} */}
                        <InputFieldError field="contactNumber" state={state} />
                    </Field>
                    {/* About */}
                    <Field>
                        <FieldLabel htmlFor="about">About</FieldLabel>
                        <Input
                            id="about"
                            name="about"
                            type="text"
                            placeholder="Your Bio/About..."
                        />

                        {/* {getInputFieldError("email", state) && (
                            <FieldDescription className="text-red-600">
                                {getInputFieldError("email", state)}
                            </FieldDescription>
                        )} */}
                        <InputFieldError field="about" state={state} />
                    </Field>
                    {/* Interests */}
                    <Field>
                        <FieldLabel htmlFor="interests">Interests</FieldLabel>
                        <Input
                            id="interests"
                            name="interests"
                            type="text"
                            placeholder="Playing Soccer, Watching movies..."
                        />

                        {/* {getInputFieldError("email", state) && (
                            <FieldDescription className="text-red-600">
                                {getInputFieldError("email", state)}
                            </FieldDescription>
                        )} */}
                        <InputFieldError field="interests" state={state} />
                    </Field>
                    {/* Gender */}
                    <Field>
                        <FieldLabel htmlFor="gender">Gender</FieldLabel>
                        <Input
                            id="gender"
                            name="gender"
                            placeholder="Select gender"
                            defaultValue={gender}
                            // defaultValue={
                            //   state?.formData?.gender || (isEdit ? doctor?.gender : "")
                            // }
                            type="hidden"
                        />
                        <Select
                            value={gender}
                            onValueChange={(value) => setGender(value as "MALE" | "FEMALE")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputFieldError state={state} field="gender" />
                    </Field>
                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" name="password" type="password" />

                        {/* {getInputFieldError("password", state) && (
                            <FieldDescription className="text-red-600">
                                {getInputFieldError("password", state)}
                            </FieldDescription>
                        )} */}
                        <InputFieldError field="password" state={state} />
                    </Field>
                    {/* Confirm Password */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                        />

                        {/* {getInputFieldError("confirmPassword", state) && (
                            <FieldDescription className="text-red-600">
                                {getInputFieldError("confirmPassword", state)}
                            </FieldDescription>
                        )} */}
                        <InputFieldError field="confirmPassword" state={state} />
                    </Field>

                    {/* Profile Photo */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                        {selectedFile && (
                            <div className="mb-2">
                                <Image
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Profile Photo Preview"
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                            </div>
                        )}

                        <Input
                            ref={fileInputRef}
                            id="file"
                            name="file"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Upload a profile photo
                        </p>
                        <InputFieldError field="profilePhoto" state={state} />
                    </Field>
                </div>
                <FieldGroup className="mt-4">
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating Account..." : "Create Account"}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 hover:underline">
                                Sign in
                            </a>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;
