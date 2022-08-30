import { TypeSafeEvent } from "@/types/events";
import Link from "next/link";

function EventCardsList({ events }: { events: TypeSafeEvent[] }) {
  return (
    <div>
      <div className="text-2xl text-center mt-20">Events list</div>
      <div className="flex gap-3 justify-center mt-8">
        {events.map((event, id) => (
          <div className="border-sky-500 border-4" key={id}>
            <Link href={`/events/${event.slug}`}>
              <a>
                <div>Title: {event.title}</div>
                <div>Description: {event.description}</div>
                <div>Duration: {event.durationMin} minutes</div>
                <div>Start date: {event.startDate}</div>
                {event.doctors.length > 0 && (
                  <div>
                    Doctors: {event.doctors.map(({ name }) => name).join(", ")}
                  </div>
                )}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCardsList;
