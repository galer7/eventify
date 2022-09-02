import { createRouter } from "./context";
import { z } from "zod";
import { add } from "date-fns";
import { convertToSlug } from "@/utils/fns";

export default createRouter()
  .mutation("create", {
    input: z.object({
      title: z.string(),
      description: z.string(),
      startDate: z.date(),
      durationMin: z.number(),
    }),
    async resolve({
      input: { title, description, startDate, durationMin },
      ctx: { prisma },
    }) {
      await prisma.event.create({
        data: {
          title,
          description,
          startDate,
          endDate: add(startDate, { minutes: durationMin }),
          durationMin,
          slug: convertToSlug(title),
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input: { slug }, ctx: { prisma } }) {
      // TODO: check if all users subscribed to this event are disconnected by prisma
      await prisma.event.delete({ where: { slug } });
    },
  })
  .mutation("kick", {
    input: z.object({
      slug: z.string(),
      userId: z.string(),
    }),
    async resolve({ input: { slug, userId }, ctx: { prisma } }) {
      await prisma.event.update({
        where: { slug: slug },
        data: {
          users: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
    },
  });
