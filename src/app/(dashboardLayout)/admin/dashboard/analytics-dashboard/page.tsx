import { Suspense } from "react";
import AnalyticsDashboardContent from "@/components/modules/Admin/Analytics/AnalyticsDashboardContent";
import AnalyticsDashboardLoading from "@/components/modules/Admin/Analytics/AnalyticsDashboardLoading";

export const dynamic = 'force-dynamic';
export default function AnalyticsDashboardPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
            <Suspense fallback={<AnalyticsDashboardLoading />}>
                <AnalyticsDashboardContent />
            </Suspense>
        </div>
    );
}
