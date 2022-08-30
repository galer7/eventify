import { createRouter } from "./context";
import { z } from "zod";

export const eventRouter = createRouter()
  .mutation("subscribe", {
    input: z
      .object({
        eventSlug: z.string(),
      })
      .nullish(),
    async resolve({ input, ctx: { prisma, session } }) {
      await prisma.event.update({
        where: { slug: input?.eventSlug },
        data: {
          users: {
            connect: {
              id: session?.user?.id,
            },
          },
        },
      });
    },
  })
  .mutation("unsubscribe", {
    input: z
      .object({
        eventSlug: z.string(),
      })
      .nullish(),
    async resolve({ input, ctx: { prisma, session } }) {
      await prisma.event.update({
        where: { slug: input?.eventSlug },
        data: {
          users: {
            disconnect: {
              id: session?.user?.id,
            },
          },
        },
      });
    },
  });
