import { prisma } from "@/server/db/client";
import { TypeSafeEvent } from "@/types/events";
import { trpc } from "@/utils/trpc";
import { Event } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast, ToastPosition } from "react-toastify";

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  // Call an external API endpoint to get posts
  const events = await prisma.event.findMany();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const event = await prisma.event.findFirst({
    where: { slug },
    include: { doctors: true },
  });

  return {
    props: { event: { ...event, startDate: event?.startDate.toJSON() } },
  };
}

export default function EventPage({ event }: { event: TypeSafeEvent }) {
  const { data } = useSession();
  const router = useRouter();
  const deleteEventMutation = trpc.useMutation("admin.delete");
  const subscribeMutation = trpc.useMutation("user.subscribe");
  const toastOpts = {
    position: "bottom-right" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  };

  const toastWithEventsLinks = (events: Event[]) => (
    <div>
      {`You cannot subscribe to this event ` +
        `because you have conflicts with these events: ` +
        `${events
          .map((event) => (
            <Link key={event.slug} href={`/events/${event.slug}`}>
              {event.title}
            </Link>
          ))
          .join(", ")}`}
    </div>
  );

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div>Title: {event.title}</div>
        <div>Description: {event.description}</div>
        <div>Duration: {event.durationMin} minutes</div>
        <div>Start date: {event.startDate}</div>
        {event.doctors.length > 0 && (
          <div>Doctors: {event.doctors.map(({ name }) => name).join(", ")}</div>
        )}
        {new Date() > new Date(event.startDate) && (
          <button
            className="bg-yellow-400 rounded-md p-2"
            onClick={() => {
              subscribeMutation.mutate(
                { slug: event.slug },
                {
                  onSuccess(data) {
                    console.log("subscribe mutation returned data", { data });
                    if (data?.events) {
                      toast.error(toastWithEventsLinks(data.events), toastOpts);
                    } else {
                      toast.success(
                        `You've successfully subscribed to \"${event.title}\"!`,
                        toastOpts
                      );
                    }
                  },
                }
              );
            }}
          >
            Subscribe to this event
          </button>
        )}
      </div>
      {data?.user && data?.user.role === "admin" && (
        <div>
          <button
            onClick={() => {
              deleteEventMutation.mutate(
                { slug: event.slug },
                {
                  onSuccess(data, variables, context) {
                    toast.success(
                      `Event "${event.slug} deleted successfully! You will be redirected to the events page soon..."`,
                      {
                        ...toastOpts,
                        onClose: () => router.push("/events"),
                      }
                    );
                  },
                }
              );
            }}
          >
            Delete event
          </button>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
