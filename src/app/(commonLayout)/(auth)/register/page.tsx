import RegisterForm from "@/components/modules/Auth/RegisterForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
const RegisterPage = () => {
    return (
        <>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create an account</CardTitle>
                            <CardDescription>
                                Enter your information below to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div>Loading search params...</div>}>
                                <RegisterForm />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
