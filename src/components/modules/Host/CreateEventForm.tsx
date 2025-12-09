"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/InputFieldError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { createEvent } from "@/services/host/host.service";

interface EventType {
    value: string;
    label: string;
}

const eventTypes: EventType[] = [
    { value: "SPORTS", label: "Sports" },
    { value: "SOCIAL", label: "Social" },
    { value: "EDUCATIONAL", label: "Educational" },
    { value: "BUSINESS", label: "Business" },
    { value: "ENTERTAINMENT", label: "Entertainment" },
    { value: "CHARITY", label: "Charity" },
    { value: "OTHER", label: "Other" },
];

const currencies = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "BDT", label: "BDT (৳)" },
];

const CreateEventForm = () => {
    const [state, formAction, isPending] = useActionState(createEvent, null);
    console.log(state);

    const [type, setType] = useState<string>(state?.formData?.type || "");
    const [currency, setCurrency] = useState<string>(state?.formData?.currency || "USD");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setSelectedFiles(fileArray);
        }
    };

    const removeImage = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Handle date time input
    const [dateTime, setDateTime] = useState<string>(
        state?.formData?.dateTime || ""
    );

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
        if (state && state.success && state.message) {
            toast.success(state.message);
            // Reset form on success
            if (state.success) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setType("");
                setCurrency("USD");
                setSelectedFiles([]);
                setDateTime("");
            }
        }
    }, [state]);

    return (
        <form action={formAction} className="max-w-4xl mx-auto">
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="title">
                            Event Title <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Summer Soccer Tournament 2024"
                            defaultValue={state?.formData?.title || ""}
                        />
                        <FieldDescription>
                            Make it catchy and descriptive (min. 4 characters)
                        </FieldDescription>
                        <InputFieldError field="title" state={state} />
                    </Field>

                    {/* Event Type */}
                    <Field>
                        <FieldLabel htmlFor="type">
                            Event Type <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            id="type"
                            name="type"
                            type="hidden"
                            value={type}
                            readOnly
                        />
                        <Select
                            value={type}
                            onValueChange={(value) => setType(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                                {eventTypes.map((eventType) => (
                                    <SelectItem key={eventType.value} value={eventType.value}>
                                        {eventType.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputFieldError field="type" state={state} />
                    </Field>

                    {/* Location */}
                    <Field>
                        <FieldLabel htmlFor="location">
                            Location <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Central Park, NYC"
                            defaultValue={state?.formData?.location || ""}
                        />
                        <InputFieldError field="location" state={state} />
                    </Field>

                    {/* Date & Time */}
                    <Field>
                        <FieldLabel htmlFor="dateTime">
                            Date & Time <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            id="dateTime"
                            name="dateTime"
                            type="datetime-local"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                        />
                        <InputFieldError field="dateTime" state={state} />
                    </Field>

                    {/* Min Participants */}
                    <Field>
                        <FieldLabel htmlFor="minParticipants">Min Participants</FieldLabel>
                        <Input
                            id="minParticipants"
                            name="minParticipants"
                            type="number"
                            // min="1"
                            placeholder="10"
                            defaultValue={state?.formData?.minParticipants || null}
                        />
                        <FieldDescription>
                            Minimum number of participants required
                        </FieldDescription>
                        <InputFieldError field="minParticipants" state={state} />
                    </Field>

                    {/* Max Participants */}
                    <Field>
                        <FieldLabel htmlFor="maxParticipants">Max Participants</FieldLabel>
                        <Input
                            id="maxParticipants"
                            name="maxParticipants"
                            type="number"
                            // min="1"
                            placeholder="100"
                            defaultValue={state?.formData?.maxParticipants || null}
                        />
                        <FieldDescription>
                            Maximum capacity for your event
                        </FieldDescription>
                        <InputFieldError field="maxParticipants" state={state} />
                    </Field>

                    {/* Joining Fee */}
                    <Field>
                        <FieldLabel htmlFor="joiningFee">Joining Fee</FieldLabel>
                        <Input
                            id="joiningFee"
                            name="joiningFee"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            defaultValue={state?.formData?.joiningFee || 0}
                        />
                        <FieldDescription>
                            Leave 0 for free events
                        </FieldDescription>
                        <InputFieldError field="joiningFee" state={state} />
                    </Field>

                    {/* Currency */}
                    <Field>
                        <FieldLabel htmlFor="currency">Currency</FieldLabel>
                        <Input
                            id="currency"
                            name="currency"
                            type="hidden"
                            value={currency}
                            readOnly
                        />
                        <Select
                            value={currency}
                            onValueChange={(value) => setCurrency(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((curr) => (
                                    <SelectItem key={curr.value} value={curr.value}>
                                        {curr.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputFieldError field="currency" state={state} />
                    </Field>

                    {/* Description */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="description">
                            Description <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe your event in detail. Include activities, rules, what participants should bring, etc."
                            rows={5}
                            defaultValue={state?.formData?.description || ""}
                        />
                        <FieldDescription>
                            Minimum 20 characters. Be descriptive to attract more participants.
                        </FieldDescription>
                        <InputFieldError field="description" state={state} />
                    </Field>

                    {/* Event Images */}
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor="images">Event Images</FieldLabel>

                        {/* Preview selected images */}
                        {selectedFiles.length > 0 && (
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="relative group">
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt={`Event preview ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="w-full h-24 object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Input
                            id="images"
                            name="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                        <FieldDescription>
                            Upload multiple images to showcase your event (Optional)
                        </FieldDescription>
                        <InputFieldError field="images" state={state} />
                    </Field>
                </div>

                {/* Submit Button */}
                <FieldGroup className="mt-8">
                    <Field>
                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="flex-1"
                            >
                                {isPending ? "Creating Event..." : "Create Event"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setType("");
                                    setCurrency("USD");
                                    setSelectedFiles([]);
                                    setDateTime("");
                                }}
                            >
                                Clear Form
                            </Button>
                        </div>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default CreateEventForm;
