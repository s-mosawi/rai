import { publicProcedure, router } from "../trpc";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import VerifyEmail from "@/components/emails/VerifyEmail";
import AccountCreated from "@/components/emails/AccountCreated";
import ResetPassword from "@/components/emails/ResetPassword";
import PasswordUpdated from "@/components/emails/PasswordUpdated";
import {
  signUpSchema,
  verifySignUpSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} from "@/lib/zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const userRouter = router({
  create: publicProcedure
    .input(verifySignUpSchema)
    .mutation(async ({ input }) => {
      const { name, email, password, otp } = input;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already exists",
        });
      }

      const dbOtp = await prisma.otp.findFirst({
        where: {
          isUsed: false,
          userEmail: email,
          for: "SIGN_UP",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!dbOtp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Please request to sign up",
        });
      }

      if (dbOtp.code !== otp) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid otp",
        });
      }

      const diff = new Date().getTime() - dbOtp.createdAt.getTime();
      const diffInMins = Math.floor(diff / 1000 / 60);

      if (diffInMins > 2) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "OTP expired",
        });
      }

      await prisma.otp.update({
        where: { id: dbOtp.id },
        data: { isUsed: true },
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          isVerified: true,
          name,
          email,
          password: hashedPassword,
        },
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "",
        to: email,
        subject: "Account created",
        react: AccountCreated({
          userName: name,
        }),
      });

      return true;
    }),

  signUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    const { name, email } = input;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already exists",
      });
    }

    const lastOtp = await prisma.otp.findFirst({
      where: {
        userEmail: email,
        for: "SIGN_UP",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (lastOtp?.isUsed === false) {
      const diff = new Date().getTime() - lastOtp.createdAt.getTime();
      const diffInMins = Math.floor(diff / 1000 / 60);

      if (diffInMins < 2) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "You can request again after 2 minutes",
        });
      } else {
        await prisma.otp.update({
          where: {
            id: lastOtp.id,
          },
          data: {
            isUsed: true,
          },
        });
      }
    }

    const newOtp = await prisma.otp.create({
      data: {
        userEmail: email,
        for: "SIGN_UP",
        code: Math.floor(100000 + Math.random() * 900000).toString(),
      },
    });

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "",
      to: email,
      subject: "Verify email",
      react: VerifyEmail({
        userName: name,
        otp: newOtp.code,
      }),
    });

    return true;
  }),

  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ input }) => {
      const { email } = input;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No account found with this email",
        });
      }

      const lastOtp = await prisma.otp.findFirst({
        where: {
          userId: user.id,
          for: "RESET_PASSWORD",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (lastOtp?.isUsed === false) {
        const diff = new Date().getTime() - lastOtp.createdAt.getTime();
        const diffInMins = Math.floor(diff / 1000 / 60);

        if (diffInMins < 2) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "You can request again after 2 minutes",
          });
        } else {
          await prisma.otp.update({
            where: {
              id: lastOtp.id,
            },
            data: {
              isUsed: true,
            },
          });
        }
      }

      const newOtp = await prisma.otp.create({
        data: {
          userId: user.id,
          for: "RESET_PASSWORD",
          code: Math.floor(100000 + Math.random() * 900000).toString(),
        },
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "",
        to: email,
        subject: "Reset password",
        react: ResetPassword({
          userName: user.name,
          otp: newOtp.code,
        }),
      });

      return true;
    }),

  updatePassword: publicProcedure
    .input(updatePasswordSchema)
    .mutation(async ({ input }) => {
      const { email, password, otp } = input;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No account found with this email",
        });
      }

      const dbOtp = await prisma.otp.findFirst({
        where: {
          userId: user.id,
          isUsed: false,
          for: "RESET_PASSWORD",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!dbOtp) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Please request to reset password",
        });
      }

      if (dbOtp.code !== otp) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid otp",
        });
      }

      const diff = new Date().getTime() - dbOtp.createdAt.getTime();
      const diffInMins = Math.floor(diff / 1000 / 60);

      if (diffInMins > 2) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "OTP expired",
        });
      }

      await prisma.otp.update({
        where: { id: dbOtp.id },
        data: { isUsed: true },
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "",
        to: email,
        subject: "Password updated",
        react: PasswordUpdated({
          userName: user.name,
        }),
      });

      return true;
    }),
});

export type AppRouter = typeof userRouter;
