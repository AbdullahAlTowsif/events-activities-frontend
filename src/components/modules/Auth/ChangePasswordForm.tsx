"use client";

import { useState } from "react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle, Lock, Key, Shield } from "lucide-react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/InputFieldError";
import { changePassword } from "@/services/auth/changePassword";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PasswordCriteria {
    id: string;
    label: string;
    met: boolean;
}

const ChangePasswordForm = () => {
    const [state, formAction, isPending] = useActionState(changePassword, null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria[]>([
        { id: "length", label: "At least 8 characters", met: false },
        { id: "uppercase", label: "One uppercase letter", met: false },
        { id: "lowercase", label: "One lowercase letter", met: false },
        { id: "number", label: "One number", met: false },
        { id: "special", label: "One special character", met: false },
    ]);

    // Check password criteria
    const checkPasswordCriteria = (password: string) => {
        setPasswordCriteria([
            { id: "length", label: "At least 8 characters", met: password.length >= 8 },
            { id: "uppercase", label: "One uppercase letter", met: /[A-Z]/.test(password) },
            { id: "lowercase", label: "One lowercase letter", met: /[a-z]/.test(password) },
            { id: "number", label: "One number", met: /\d/.test(password) },
            { id: "special", label: "One special character", met: /[@$!%*?&]/.test(password) },
        ]);
    };

    // Calculate password strength
    const calculatePasswordStrength = () => {
        const metCount = passwordCriteria.filter(c => c.met).length;
        return (metCount / passwordCriteria.length) * 100;
    };

    const getStrengthColor = (strength: number) => {
        if (strength < 40) return "bg-red-500";
        if (strength < 70) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = (strength: number) => {
        if (strength < 40) return "Weak";
        if (strength < 70) return "Medium";
        return "Strong";
    };

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
        if (state && state.success && state.message) {
            toast.success(state.message);
        }
    }, [state]);

    const passwordStrength = calculatePasswordStrength();

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-xl">
            <CardHeader className="space-y-1">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
                        <CardDescription>
                            Update your password to keep your account secure
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <form action={formAction} className="space-y-6">
                    {/* Current Password */}
                    <Field>
                        <FieldLabel htmlFor="oldPassword" className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            Current Password
                        </FieldLabel>
                        <div className="relative">
                            <Input
                                id="oldPassword"
                                name="oldPassword"
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Enter your current password"
                                className="pr-10"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {state?.errors && <InputFieldError field="oldPassword" state={state} />}
                    </Field>

                    {/* New Password */}
                    <Field>
                        <FieldLabel htmlFor="newPassword" className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            New Password
                        </FieldLabel>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Create a strong new password"
                                className="pr-10"
                                required
                                onChange={(e) => checkPasswordCriteria(e.target.value)}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        {/* Password Strength Indicator */}
                        <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Password Strength</span>
                                <span className={`text-sm font-medium ${getStrengthColor(passwordStrength)}`}>
                                    {getStrengthText(passwordStrength)}
                                </span>
                            </div>
                            <Progress value={passwordStrength} className={`h-2 ${getStrengthColor(passwordStrength)}`} />
                        </div>

                        {/* Password Criteria */}
                        <div className="mt-3 space-y-2">
                            <p className="text-sm font-medium">Password must contain:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {passwordCriteria.map((criteria) => (
                                    <div key={criteria.id} className="flex items-center gap-2">
                                        <div className={`h-4 w-4 rounded-full flex items-center justify-center ${criteria.met ? 'bg-green-500' : 'bg-gray-200'}`}>
                                            {criteria.met && <CheckCircle className="h-3 w-3 text-white" />}
                                        </div>
                                        <span className={`text-sm ${criteria.met ? 'text-green-600' : 'text-gray-500'}`}>
                                            {criteria.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {state?.errors && <InputFieldError field="newPassword" state={state} />}
                    </Field>

                    {/* Confirm New Password */}
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">
                            Confirm New Password
                        </FieldLabel>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your new password"
                                className="pr-10"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {state?.errors && <InputFieldError field="confirmPassword" state={state} />}
                    </Field>

                    {/* Security Tips */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Security Tips
                        </h4>
                        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                            <li>• Use a password that you don&apos;t use elsewhere</li>
                            <li>• Consider using a password manager</li>
                            <li>• Change your password regularly</li>
                            <li>• Never share your password with anyone</li>
                        </ul>
                    </div>

                    {/* Submit Button */}
                    <FieldGroup>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                            size="lg"
                        >
                            {isPending ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                                    Updating Password...
                                </>
                            ) : (
                                "Change Password"
                            )}
                        </Button>
                        <FieldDescription className="text-center">
                            Make sure you remember your new password
                        </FieldDescription>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};

export default ChangePasswordForm;
