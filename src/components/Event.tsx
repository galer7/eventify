import { TypeSafeEvent } from "@/types/events";

function Event({ event }: { event: TypeSafeEvent }) {
  return (
    <div>
      <div>Title: {event.title}</div>
      <div>Description: {event.description}</div>
      <div>Duration: {event.durationMin} minutes</div>
      <div>Start date: {event.startDate}</div>
      {event.doctors.length > 0 && (
        <div>Doctors: {event.doctors.map(({ name }) => name).join(", ")}</div>
      )}
      {new Date() > new Date(event.startDate) && (
        <button className="bg-yellow-400 rounded-md p-2">
          Subscribe to this event
        </button>
      )}
    </div>
  );
}

export default Event;
