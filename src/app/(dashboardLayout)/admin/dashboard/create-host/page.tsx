import HostCreateForm from "@/components/modules/Admin/HostCreateForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

const HostCreatePage = () => {
    return (
        <>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Host</CardTitle>
                            <CardDescription>
                                Enter your information below to create host account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div>Loading search params...</div>}>
                                <HostCreateForm />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default HostCreatePage;
