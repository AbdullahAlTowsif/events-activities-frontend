import EventGrid from "@/components/modules/Event/EventGrid";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getEvents } from "@/services/admin/eventManagement";
import { Suspense } from "react";

export const revalidate = 600;

const ConsultationPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    // Fetch doctors and specialties in parallel
    const [eventsResponse] = await Promise.all([
        getEvents(queryString),
    ]);

    const events = eventsResponse?.data || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Find your Desired Events</h1>
                    <p className="text-muted-foreground mt-2">
                        Search and enjoy evnets with your like minded people and turn interests into
                        shared memories
                    </p>
                </div>

                {/* Doctor Grid */}
                <Suspense fallback={<TableSkeleton columns={3} />}>
                    <EventGrid events={events} />
                </Suspense>

                {/* Pagination */}
                <TablePagination
                    currentPage={eventsResponse?.meta?.page || 1}
                    totalPages={eventsResponse?.meta?.totalPage || 1}
                />
            </div>
        </div>
    );
};

export default ConsultationPage;
