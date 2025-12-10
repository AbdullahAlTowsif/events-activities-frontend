"use client";

import { XCircle, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-red-50 to-white">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <Card className="border-red-200 shadow-xl">
                        <CardContent className="pt-12 pb-8 text-center">
                            {/* Cancel Icon */}
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-12 h-12 text-red-600" />
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
                                Payment Cancelled
                            </h1>

                            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                                Your payment was cancelled. No charges have been made to your account.
                                You can try again or return to the event page.
                            </p>

                            {/* Important Note */}
                            <div className="mb-10 p-4 bg-red-50 rounded-lg">
                                <p className="text-sm text-red-700">
                                    Your event spot is not reserved until payment is completed.
                                    Event spots are limited and may become unavailable.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/events">
                                    <Button className="bg-red-600 hover:bg-red-700 px-8 py-6">
                                        <ArrowLeft className="w-5 h-5 mr-2" />
                                        Return to Events
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="outline" className="px-8 py-6 border-red-600 text-red-600 hover:bg-red-50">
                                        <Home className="w-5 h-5 mr-2" />
                                        Go Home
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
