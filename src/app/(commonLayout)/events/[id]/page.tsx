// import DoctorReviews from "@/components/modules/DoctorDetails/DoctorReviews";
import EventContent from "@/components/modules/Event/EventContent";
import { getEventById } from "@/services/admin/eventManagement";

const EventDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const result = await getEventById(id);
    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <EventContent event={result.data} />
            {/* <DoctorReviews doctorId={id} /> */}
        </div>
    );
};

export default EventDetailPage;
