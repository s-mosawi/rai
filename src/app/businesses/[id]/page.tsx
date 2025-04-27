import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import NoticeBar from "@/components/NoticeBar";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import BusinessDetails from "./BusinessDetails";

export default async function Business({ params }: { params: { id: string } }) {
  const applicationId = params.id;

  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId, isBlocked: false, status: "PAID" },
    });

    if (!application) return redirect("/dashboard");
  } catch {
    return redirect("/dashboard");
  }

  return (
    <>
      <NoticeBar />
      <NavigationBar />

      <main>
        <BusinessDetails applicationId={applicationId} />
      </main>

      <Footer />
    </>
  );
}
