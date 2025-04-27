import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Application from "./Application";

export default async function page({ params }: { params: { id: string } }) {
  const applicationId = params.id;

  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) return redirect("/dashboard");
  } catch {
    return redirect("/dashboard");
  }

  return <Application applicationId={applicationId} />;
}
