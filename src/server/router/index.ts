// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import userRouter from "./user";
import adminRouter from "./admin";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("admin.", adminRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
