import EventContent from "@/components/modules/Event/EventContent";
import { getHostProfile } from "@/services/host/host.service";
import { getEventById } from "@/services/admin/eventManagement";
import EventActions from "@/components/modules/Event/EventActions";
import ParticipantsContent from "@/components/modules/Event/ParticipantsContent";
import HostProfile from "@/components/modules/Event/HostProfile";
import { Suspense } from "react";

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
                    <Suspense fallback={<div>Loading search params...</div>}>
                        <EventContent event={event} />
                    </Suspense>

                    {/* Event Actions (Join/Leave Buttons) */}
                    <Suspense fallback={<div>Loading search params...</div>}>
                        <EventActions eventId={id} event={event} />
                    </Suspense>

                    {/* Participants List */}
                    <Suspense fallback={<div>Loading search params...</div>}>
                        <ParticipantsContent eventId={id} event={event} />
                    </Suspense>
                </div>

                {/* Right Column - Host Profile */}
                <div className="lg:col-span-1">
                    <Suspense fallback={<div>Loading search params...</div>}>
                        <HostProfile host={host} event={event} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
