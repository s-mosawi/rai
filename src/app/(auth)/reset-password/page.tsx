import type { Metadata } from "next";
import Form from "./Form";
import Link from "next/link";
import Image from "next/image";
import iconImg from "@/assets/images/icon.png";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reset password – Responsble.ai",
};

export default async function ResetPassword() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <main className="relative min-h-[100svh] py-32 flex justify-center items-center">
      <Link href={"/"} className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image src={iconImg} alt="Responsble.ai" width={65} height={74} />
      </Link>

      <section className="w-full">
        <div className="mx-auto container px-4 flex flex-col items-center">
          <h1 className="mb-3 text-3xl font-extrabold text-center">
            Oops, forgot password?
          </h1>

          <p className="mb-8 text-center text-muted-foreground">
            Don't worry, enter your email to reset it
          </p>

          <Form />
        </div>
      </section>
    </main>
  );
}
