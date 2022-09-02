import { createRouter } from "./context";
import { z } from "zod";

export default createRouter()
  .mutation("add-phone", {
    input: z.object({
      phone: z.string(),
    }),
    async resolve({ input, ctx: { prisma, session } }) {
      if (!session?.user?.id) throw new Error("session user id not found");

      await prisma.user.update({
        where: { id: session.user.id },
        data: { phone: input.phone },
      });
    },
  })
  .mutation("subscribe", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input: { slug }, ctx: { prisma, session } }) {
      const event = await prisma.event.findFirst({ where: { slug } });
      const userWithConflicts = await prisma.user.findFirst({
        where: {
          id: session?.user?.id,
          events: {
            some: {
              startDate: {
                lt: event?.endDate,
              },
              endDate: {
                gt: event?.startDate,
              },
            },
          },
        },
        include: {
          events: {
            where: {
              startDate: {
                lt: event?.endDate,
              },
              endDate: {
                gt: event?.startDate,
              },
            },
          },
        },
      });

      if (userWithConflicts) {
        return userWithConflicts;
      }

      await prisma.event.update({
        where: { slug },
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
        slug: z.string(),
      })
      .nullish(),
    async resolve({ input, ctx: { prisma, session } }) {
      await prisma.event.update({
        where: { slug: input?.slug },
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
