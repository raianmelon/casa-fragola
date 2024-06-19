import {privateProcedure, publicProcedure, router} from './trpc';
import {z} from "zod";
import {db} from "@/db";

export const appRouter = router({
    OccupyDate: privateProcedure.input(z.object({range: z.string()})).mutation(async({ctx, input}) => {
        let date = await db.reservedDays.create({
            data: {
                range: input.range
            }
        })
        return date
    }),
    GetOccupiedDates: privateProcedure.query(async({ctx}) => {
        const date = await db.reservedDays.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });
        return date
    }),
    DeleteOccupiedDate: privateProcedure.input(z.object({id: z.string()})).mutation(async({ctx, input}) => {
        await db.reservedDays.delete({
            where: {
                id: input.id
            }
        });
    })
})
export type AppRouter = typeof appRouter;