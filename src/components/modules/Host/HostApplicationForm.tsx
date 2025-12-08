/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    User, Phone, MapPin, FileText, CheckCircle,
    AlertCircle, Loader2, Shield
} from 'lucide-react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { applyToBeHost, getMyHostApplication } from '@/services/host/hostApplication';

const applicationSchema = z.object({
    reason: z.string()
        .min(50, 'Please provide at least 50 characters explaining why you want to be a host')
        .max(1000, 'Reason must be less than 1000 characters'),
    contactNumber: z.string()
        .min(10, 'Please provide a valid phone number')
        .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Invalid phone number format'),
    address: z.string()
        .min(10, 'Please provide a complete address')
        .max(200, 'Address must be less than 200 characters'),
    terms: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions",
    }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function HostApplicationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [characterCount, setCharacterCount] = useState(0);

    const form = useForm<ApplicationFormData>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            reason: '',
            contactNumber: '',
            address: '',
            terms: false,
        }
    });

    useEffect(() => {
        checkExistingApplication();
    }, []);

    useEffect(() => {
        const subscription = form.watch((value) => {
            setCharacterCount(value.reason?.length || 0);
        });
        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.watch]);

    const checkExistingApplication = async () => {
        try {
            const result = await getMyHostApplication();
            console.log("My host applicaiton", result);
            if (result.success && result.data) {
                setApplicationStatus(result.data.status?.toLowerCase() as any);
                if (result.data.status === 'PENDING') {
                    setMessage({
                        type: 'error',
                        text: 'You already have a pending host application. Please wait for review.'
                    });
                } else if (result.data.status === 'APPROVED') {
                    setMessage({
                        type: 'error',
                        text: 'You are already approved as a host!'
                    });
                }
            }
        } catch (error) {
            console.error('Error checking application:', error);
        }
    };

    const onSubmit = async (data: ApplicationFormData) => {
        if (applicationStatus !== 'none') return;

        setIsSubmitting(true);
        setMessage(null);

        try {
            const result = await applyToBeHost(data);

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: 'Your host application has been submitted successfully! We will review it within 2-3 business days.'
                });
                setApplicationStatus('pending');
                form.reset();
            } else {
                setMessage({
                    type: 'error',
                    text: result.message || 'Failed to submit application. Please try again.'
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'An error occurred. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (applicationStatus === 'pending') {
        return (
            <section id="apply" className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 border border-amber-100 text-center">
                        <div className="w-20 h-20 bg-linear-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Loader2 className="w-10 h-10 text-white animate-spin" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Application Under Review</h3>
                        <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                            Your host application is currently being reviewed by our team.
                            This process typically takes 2-3 business days. If accepted you will login as a host once a decision has been made.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white/80 p-6 rounded-xl">
                                <div className="text-2xl font-bold text-amber-600 mb-1">2-3 Days</div>
                                <div className="text-slate-600">Review Time</div>
                            </div>
                            <div className="bg-white/80 p-6 rounded-xl">
                                <div className="text-2xl font-bold text-amber-600 mb-1">Email</div>
                                <div className="text-slate-600">Notification</div>
                            </div>
                            <div className="bg-white/80 p-6 rounded-xl">
                                <div className="text-2xl font-bold text-amber-600 mb-1">24/7</div>
                                <div className="text-slate-600">Support Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (applicationStatus === 'approved') {
        return (
            <section id="apply" className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 border border-emerald-100 text-center">
                        <div className="w-20 h-20 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Congratulations! You&apos;re a Host</h3>
                        <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                            Your host application has been approved! You can now create events, manage participants, and start building your community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="px-8 py-6 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                                Go to Host Dashboard
                            </Button>
                            <Button variant="outline" className="px-8 py-6 bg-white text-emerald-600 font-bold rounded-xl border-2 border-emerald-500 hover:bg-emerald-50 transition-colors">
                                Create Your First Event
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="apply" className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Shield className="w-4 h-4" />
                        <span>Apply to Become a Host</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Ready to{' '}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                            Get Started?
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Fill out the application form below. We&apos;ll review your application and get back to you within 2-3 business days.
                    </p>
                </div>

                {/* Message Display */}
                {message && (
                    <Alert variant={message.type === 'success' ? 'default' : 'destructive'} className="mb-8">
                        {message.type === 'success' ? (
                            <CheckCircle className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>{message.text}</AlertDescription>
                    </Alert>
                )}

                <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-200">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Contact Information */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <User className="w-6 h-6" />
                                    Contact Information
                                </h3>

                                {/* Phone Number */}
                                <FormField
                                    control={form.control}
                                    name="contactNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Phone Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Please enter your pre provided phone number"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                    className="text-lg py-6"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                We&apos;ll use this to contact you about your application
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Address */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Please enter your pre provided complete address"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                    className="text-lg py-6"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Your city and state/province is sufficient
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Reason for Applying */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <FileText className="w-6 h-6" />
                                    Tell Us About Yourself
                                </h3>

                                <FormField
                                    control={form.control}
                                    name="reason"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Why do you want to become a host? *
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us about your experience, interests, and why you'd make a great host. Minimum 50 characters."
                                                    {...field}
                                                    disabled={isSubmitting}
                                                    className="min-h-[200px] resize-none text-lg"
                                                    rows={6}
                                                />
                                            </FormControl>
                                            <div className="flex justify-between items-center">
                                                <FormDescription>
                                                    Share your passion and experience with us
                                                </FormDescription>
                                                <span className="text-sm text-slate-500">
                                                    {characterCount}/1000 characters
                                                </span>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Terms and Conditions */}
                            <FormField
                                control={form.control}
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-200 p-4 bg-slate-50">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-slate-900">
                                                I agree to the Host Agreement, Terms of Service, and Privacy Policy
                                            </FormLabel>
                                            <FormDescription className="text-slate-600">
                                                I understand that I am responsible for following all local laws and regulations,
                                                and that false information may result in immediate termination of my host status.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting || applicationStatus !== 'none' || !form.formState.isValid}
                                className={`w-full py-6 text-lg font-bold rounded-xl transition-all duration-300 ${applicationStatus !== 'none'
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
                                    : 'bg-linear-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Submitting Application...
                                    </>
                                ) : (
                                    'Submit Host Application'
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Additional Info */}
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="font-medium text-blue-800 mb-1">Secure Application</div>
                        <p className="text-blue-600 text-sm">
                            All information is encrypted and stored securely. We never share your personal data.
                        </p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="font-medium text-emerald-800 mb-1">2-3 Day Review</div>
                        <p className="text-emerald-600 text-sm">
                            Applications are reviewed by our team within 2-3 business days.
                        </p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="font-medium text-amber-800 mb-1">Email Notification</div>
                        <p className="text-amber-600 text-sm">
                            You&apos;ll receive an email notification once your application is reviewed.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
