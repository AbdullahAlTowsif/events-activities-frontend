import { Metadata } from "next";
import { Shield, Lock, Key, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ChangePasswordForm from "@/components/modules/Auth/ChangePasswordForm";

export const metadata: Metadata = {
    title: "Change Password | Security Settings",
    description: "Update your password to keep your account secure",
};

const ChangePasswordPage = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-primary to-primary/80 rounded-2xl mb-6 shadow-lg">
                        <Lock className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Update Your Password
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Secure your account by choosing a strong, unique password
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form - Left Column */}
                    <div className="lg:col-span-2">
                        <ChangePasswordForm />
                    </div>

                    {/* Right Column - Tips & Info */}
                    <div className="space-y-6">
                        {/* Security Checklist */}
                        <Card className="shadow-lg border-0 bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                    Password Best Practices
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">
                                            Use at least 12 characters for maximum security
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">
                                            Include numbers, symbols, and mixed cases
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">
                                            Avoid personal information like birthdays
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                        <span className="text-gray-700 dark:text-gray-300">
                                            Don&apos;t reuse passwords across sites
                                        </span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Why It Matters */}
                        <Card className="shadow-lg border-0 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    Why Regular Updates Matter
                                </h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">67%</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            of breaches involve stolen credentials
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/30 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">90 days</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Recommended password rotation period
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Important Notes */}
                        <Card className="shadow-lg border-0 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                    Important Notes
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                    <li>• Changing your password will log you out of all devices</li>
                                    <li>• Save your new password in a secure place</li>
                                    <li>• Contact support if you&apos;ve forgotten your password</li>
                                    <li>• Use 2FA for additional security</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Quick Links */}
                        {/* <Card className="shadow-lg border-0 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                                    Need Help?
                                </h3>
                                <div className="space-y-3">
                                    <a
                                        href="/settings/security"
                                        className="block w-full text-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg border dark:border-gray-700 transition-colors"
                                    >
                                        Security Settings
                                    </a>
                                    <a
                                        href="/help/password-recovery"
                                        className="block w-full text-center bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all"
                                    >
                                        Forgot Password?
                                    </a>
                                    <a
                                        href="/support"
                                        className="block w-full text-center border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 font-medium py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Contact Support
                                    </a>
                                </div>
                            </CardContent>
                        </Card> */}
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-12 text-center">
                    <div className="inline-flex flex-wrap items-center justify-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                        <span className="flex items-center">
                            <Key className="w-3 h-3 mr-2" />
                            End-to-end encrypted
                        </span>
                        <span className="flex items-center">
                            <Lock className="w-3 h-3 mr-2" />
                            SSL secured connection
                        </span>
                        <span className="flex items-center">
                            <Shield className="w-3 h-3 mr-2" />
                            No password storage
                        </span>
                    </div>
                    <p className="mt-4 text-gray-400 dark:text-gray-500 text-sm">
                        Your security is our priority. We never store passwords in plain text.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
