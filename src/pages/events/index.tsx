import { prisma } from "@/server/db/client";
import EventCardsList from "@/components/EventCardsList";
import { TypeSafeEvent } from "@/types/events";

export async function getServerSideProps() {
  const events = await prisma.event.findMany({
    where: {},
    include: { doctors: true },
  });

  return {
    props: {
      events: events.map(({ startDate, ...restOfEvent }) => ({
        ...restOfEvent,
        startDate: startDate.toJSON(),
      })),
    },
  };
}

export default function EventsList({ events }: { events: TypeSafeEvent[] }) {
  return <EventCardsList events={events} />;
}
