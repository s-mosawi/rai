import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Application from "./Application";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function page({ params }: { params: { id: string } }) {
  const applicationId = params.id;
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId, userId },
    });

    if (!application) return redirect("/dashboard");
  } catch {
    return redirect("/dashboard");
  }

  return <Application applicationId={applicationId} />;
}
