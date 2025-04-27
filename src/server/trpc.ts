import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const t = initTRPC.create();

const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!user.isVerified) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Email not verified",
    });
  }

  return opts.next({
    ctx: {
      userId: session.user.id,
    },
  });
});

const isAdmin = middleware(async (opts) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!user.isVerified) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Email not verified",
    });
  }

  if (!user.isAdmin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User is not an admin",
    });
  }

  return opts.next({
    ctx: {
      userId: session.user.id,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
export const adminProcedure = t.procedure.use(isAdmin);
