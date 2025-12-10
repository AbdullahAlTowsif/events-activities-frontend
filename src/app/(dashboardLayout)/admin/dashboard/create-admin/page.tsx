import AdminCreateForm from "@/components/modules/Admin/AdminCreateForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

const AdminCreatePage = () => {
    return (
        <>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create an Admin</CardTitle>
                            <CardDescription>
                                Enter your information below to create admin account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div>Loading search params...</div>}>
                                <AdminCreateForm />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default AdminCreatePage;
