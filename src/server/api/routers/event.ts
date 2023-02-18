import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany();
    return events;
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        start: z.date(),
        end: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, start, end } = input;

      const event = await ctx.prisma.event.create({
        data: { title, start, end },
      });

      const result = { ...event, event_id: event.id, color: undefined };

      return result;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      await ctx.prisma.event.delete({ where: { id } });
    }),
});
