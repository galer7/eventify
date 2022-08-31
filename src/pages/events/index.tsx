import { prisma } from "@/server/db/client";
import EventCardsList from "@/components/EventCardsList";
import { TypeSafeEvent } from "@/types/events";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";

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
  const { status, data } = useSession();
  const createEventMutation = trpc.useMutation("admin.create");

  return (
    <>
      {data?.user?.name === "admin" && (
        <button
          onClick={() => {
            createEventMutation.mutate(
              {},
              { onSuccess(data, variables, context) {} }
            );
          }}
        >
          Add new event
        </button>
      )}
      <EventCardsList events={events} />
    </>
  );
}
