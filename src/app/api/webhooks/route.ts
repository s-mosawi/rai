import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import PaymentReceived from "@/components/emails/PaymentReceived";
import { pricing } from "@/lib/platform";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.metadata?.applicationId) {
        return NextResponse.json(
          { success: false, error: "Missing application id" },
          { status: 400 }
        );
      }

      const session = event.data.object as Stripe.Checkout.Session;

      const { applicationId } = session.metadata || {
        applicationId: null,
      };

      if (!applicationId) {
        return NextResponse.json(
          { success: false, error: "Invalid request metadata" },
          { status: 400 }
        );
      }

      const application = await prisma.application.findUnique({
        where: {
          id: applicationId,
          status: "AWAITING_PAYMENT",
        },
        include: {
          user: true,
        },
      });

      if (!application) {
        return NextResponse.json(
          { success: false, error: "Invalid application id" },
          { status: 400 }
        );
      }

      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: "PAID",
        },
      });

      const price = pricing.find(
        (p) => p.dbValue === application.businessSize
      )?.priceString;

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "",
        to: process.env.ADMIN_EMAIL || "",
        subject: "Payment received",
        react: PaymentReceived({
          userName: application.user.name,
          price: price || "",
        }),
      });
    }

    return NextResponse.json({ success: true, result: event });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        msg: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
