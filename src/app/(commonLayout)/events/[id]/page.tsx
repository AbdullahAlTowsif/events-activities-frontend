// // import DoctorReviews from "@/components/modules/DoctorDetails/DoctorReviews";
// import EventContent from "@/components/modules/Event/EventContent";
// import { getEventById } from "@/services/admin/eventManagement";
// import { getParticipants } from "@/services/event/event.service";


// const EventDetailPage = async ({
//     params,
// }: {
//     params: Promise<{ id: string }>;
// }) => {
//     const { id } = await params;
//     const result = await getEventById(id);
//     const eventParticipants = await getParticipants(id);

//     return (
//         <div className="container mx-auto px-4 py-8 space-y-6">
//             <EventContent event={result.data} />
//             <ParticipantsContent eventId={id} />
//         </div>
//     );
// };

// export default EventDetailPage;


import EventContent from "@/components/modules/Event/EventContent";
import { getHostProfile } from "@/services/host/host.service";
import { getEventById } from "@/services/admin/eventManagement";
import EventActions from "@/components/modules/Event/EventActions";
import ParticipantsContent from "@/components/modules/Event/ParticipantsContent";
import HostProfile from "@/components/modules/Event/HostProfile";

const EventDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    const result = await getEventById(id);
    const event = result.data;

    // Fetch host profile
    const hostResult = await getHostProfile(event.hostEmail);
    console.log("hostResult", hostResult);
    const host = hostResult.data;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Event Details & Host */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Event Details */}
                    <EventContent event={event} />

                    {/* Event Actions (Join/Leave Buttons) */}
                    <EventActions eventId={id} event={event} />

                    {/* Participants List */}
                    <ParticipantsContent eventId={id} event={event} />
                </div>

                {/* Right Column - Host Profile */}
                <div className="lg:col-span-1">
                    <HostProfile host={host} event={event} />
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
