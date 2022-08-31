import { createRouter } from "./context";
import { z } from "zod";

export default createRouter()
  .mutation("create", {
    input: z
      .object({
        title: z.string(),
        startDate: z.date(),
        description: z.string(),
        durationMin: z.number(),
      })
      .nullish(),
    async resolve({ input, ctx: { prisma, session } }) {
      //   await prisma.event.update({
      //     where: { slug: input?.eventSlug },
      //     data: {
      //       users: {
      //         connect: {
      //           id: session?.user?.id,
      //         },
      //       },
      //     },
      //   });
    },
  })
  .mutation("kick", {
    input: z
      .object({
        eventSlug: z.string(),
      })
      .nullish(),
    async resolve({ input, ctx: { prisma, session } }) {
      //   await prisma.event.update({
      //     where: { slug: input?.eventSlug },
      //     data: {
      //       users: {
      //         disconnect: {
      //           id: session?.user?.id,
      //         },
      //       },
      //     },
      //   });
    },
  });
