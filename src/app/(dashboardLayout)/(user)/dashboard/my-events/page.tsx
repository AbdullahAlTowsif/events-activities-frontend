import { Suspense } from "react";
import MyEventsLoading from "@/components/modules/Host/MyEventsLoading";
import PaidEventsPage from "@/components/modules/Event/PaidEventCard";

export default function MyEvents() {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
            <Suspense fallback={<MyEventsLoading />}>
                <PaidEventsPage />
            </Suspense>
        </div>
    );
}
