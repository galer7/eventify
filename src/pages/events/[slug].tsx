import Event from "@/components/Event";
import { prisma } from "@/server/db/client";
import { TypeSafeEvent } from "@/types/events";
import { Doctor, Event as EventType } from "@prisma/client";

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
  return <Event event={event} />;
}
