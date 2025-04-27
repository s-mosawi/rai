import {
  publicProcedure,
  privateProcedure,
  adminProcedure,
  router,
} from "../trpc";
import { applicationSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import NewApplicationSubmitted from "@/components/emails/NewApplicationSubmitted";
import ApplicationApproved from "@/components/emails/ApplicationApproved";
import CertificateAssigned from "@/components/emails/CertificateAssigned";
import ApplicationRejected from "@/components/emails/ApplicationRejected";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { pricing } from "@/lib/platform";

const resend = new Resend(process.env.RESEND_API_KEY);

export const applicationRouter = router({
  create: privateProcedure
    .input(applicationSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const {
        businessName,
        businessAddress,
        businessSector,
        businessSize,
        businessLogoUrl,
        pledgeUrl,
        aiPolicyUrl,
        isoCertificationUrl,
        contactName,
        contactEmail,
        contactPhone,
        otherInfo,
      } = input;

      await prisma.application.create({
        data: {
          userId: user.id,
          businessName,
          businessAddress,
          businessSector,
          businessSize,
          businessLogoUrl,
          pledgeUrl,
          aiPolicyUrl,
          isoCertificationUrl,
          contactName,
          contactEmail,
          contactPhone,
          otherInfo,
        },
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "",
        to: process.env.ADMIN_EMAIL || "",
        subject: "New application submitted",
        react: NewApplicationSubmitted({
          userName: user.name,
        }),
      });

      return true;
    }),

  createCheckoutSession: privateProcedure
    .input(
      z.object({
        applicationId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { applicationId } = input;

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      const price = pricing.find(
        (p) => p.dbValue === application.businessSize
      )?.price;

      const product = await stripe.products.create({
        name: "Responsble.ai Certification",
        images: [`${process.env.NEXT_PUBLIC_APP_URL}/images/icon.png`],
        default_price_data: {
          currency: "AUD",
          unit_amount: price ? price * 100 : 0,
        },
      });

      const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${applicationId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/applications/${applicationId}`,
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
          applicationId,
        },
        line_items: [
          {
            price: product.default_price as string,
            quantity: 1,
          },
        ],
      });

      return stripeSession.url;
    }),

  get: privateProcedure
    .input(
      z.object({
        applicationId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { applicationId } = input;

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
        });
      }

      return application;
    }),

  delete: privateProcedure
    .input(
      z.object({
        applicationId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { applicationId } = input;

      // Check if the application exists
      const application = await prisma.application.findUnique({
        where: { id: applicationId },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
        });
      }

      // Get the current user to check if they're an admin
      const user = await prisma.user.findUnique({
        where: { id: ctx.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      if (!user.isAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to delete this application",
        });
      }

      // Delete the application
      await prisma.application.delete({
        where: { id: applicationId },
      });

      return { success: true, message: "Application deleted successfully" };
    }),

  getBusiness: publicProcedure
    .input(
      z.object({
        applicationId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { applicationId } = input;

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
          isBlocked: false,
          status: "PAID",
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Business not found",
        });
      }

      return {
        id: application.id,
        uId: application.uId,
        certificateImgUrl: application.certificateImgUrl,
        businessName: application.businessName,
        businessSector: application.businessSector,
        businessSize: application.businessSize,
        businessWebsite: application.businessWebsite,
        businessLogoUrl: application.businessLogoUrl,
        aiPolicyUrl: application.aiPolicyUrl,
        isoCertificationUrl: application.isoCertificationUrl,
        otherInfo: application.otherInfo,
        expiresAt: application.expiresAt,
      };
    }),

  getAll: adminProcedure.query(async () => {
    return await prisma.application.findMany();
  }),

  getForPublic: publicProcedure.query(async () => {
    const applications = await prisma.application.findMany({
      where: {
        isBlocked: false,
        status: "PAID",
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return applications
      .filter(
        (application) =>
          application.certificateImgUrl !== "" &&
          application.certificateFileUrl !== ""
      )
      .map((application) => ({
        id: application.id,
        uId: application.uId,
        certificateImgUrl: application.certificateImgUrl,
        businessName: application.businessName,
        businessSector: application.businessSector,
        businessSize: application.businessSize,
        businessWebsite: application.businessWebsite,
        businessLogoUrl: application.businessLogoUrl,
        aiPolicyUrl: application.aiPolicyUrl,
        isoCertificationUrl: application.isoCertificationUrl,
        otherInfo: application.otherInfo,
      }));
  }),

  getUserApplications: privateProcedure.query(async ({ ctx }) => {
    return await prisma.application.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: {
        expiresAt: "asc",
      },
    });
  }),

  approve: adminProcedure
    .input(
      z.object({
        applicationId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { applicationId } = input;

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
        include: {
          user: true,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
        });
      }

      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: "AWAITING_PAYMENT",
        },
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "",
        to: application.user.email,
        subject: "Application approved",
        react: ApplicationApproved({
          userName: application.user.name,
        }),
      });

      return true;
    }),

  reject: adminProcedure
    .input(
      z.object({
        applicationId: z.string(),
        rejectionReason: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { applicationId, rejectionReason } = input;

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
        include: {
          user: true,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
        });
      }

      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: "REJECTED",
          rejectionReason,
        },
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "",
        to: application.user.email,
        subject: "Application rejected",
        react: ApplicationRejected({
          userName: application.user.name,
          rejectionReason,
        }),
      });

      return true;
    }),

  assignCertificate: adminProcedure
    .input(
      z.object({
        applicationId: z.string(),
        uId: z.string(),
        certificateImgUrl: z.string(),
        certificateFileUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { applicationId, uId, certificateImgUrl, certificateFileUrl } =
        input;

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
        include: {
          user: true,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
        });
      }

      const existingApplicationWithUId = await prisma.application.findUnique({
        where: {
          uId,
        },
      });

      if (existingApplicationWithUId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Unique id already exists",
        });
      }

      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: "PAID",
          uId,
          certificateImgUrl,
          certificateFileUrl,
          expiresAt: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
        },
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "",
        to: application.user.email,
        subject: "Certificate assigned",
        react: CertificateAssigned({
          userName: application.user.name,
        }),
      });

      return true;
    }),

  block: adminProcedure
    .input(
      z.object({
        applicationId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { applicationId } = input;

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
        });
      }

      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          isBlocked: true,
        },
      });

      return true;
    }),

  unblock: adminProcedure
    .input(
      z.object({
        applicationId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { applicationId } = input;

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
        });
      }

      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          isBlocked: false,
        },
      });

      return true;
    }),
});
export type AppRouter = typeof applicationRouter;
