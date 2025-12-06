import { IEvent } from "@/types/event.interface";
import EventCard from "./EventCard";

interface EventGridProps {
    events: IEvent[];
}

export default function EventGrid({ events }: EventGridProps) {
    if (events.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                    No events found matching your criteria.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your filters or search terms.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}
