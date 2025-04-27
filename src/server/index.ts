import { router } from "./trpc";
import { userRouter } from "./routers/userRouter";
import { applicationRouter } from "./routers/applicationRouter";

export const appRouter = router({
  user: userRouter,
  application: applicationRouter,
});

export type AppRouter = typeof appRouter;
