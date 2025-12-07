import { Suspense } from "react";
import MyEventsPage from "@/components/modules/Host/MyEventsPage";
import MyEventsLoading from "@/components/modules/Host/MyEventsLoading";

export default function MyEvents() {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
            <Suspense fallback={<MyEventsLoading />}>
                <MyEventsPage />
            </Suspense>
        </div>
    );
}
