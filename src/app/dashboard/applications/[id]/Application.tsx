"use client";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import DashboardApplicationDetailsCard from "@/components/DashboardApplicationDetailsCard";
import DashboardApplicationAttachmentsCard from "@/components/DashboardApplicationAttachmentsCard";
import DashboardApplicationCertificateCard from "@/components/DashboardApplicationCertificateCard";
import DashboardApplicationOtherInfoCard from "@/components/DashboardApplicationOtherInfoCard";

interface IProps {
  applicationId: string;
}

export default function Application({ applicationId }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: applicationData } = trpc.application.get.useQuery({
    applicationId,
  }) as {
    data: IApplication;
  };

  if (!applicationData)
    return (
      <div className="flex justify-center">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );

  return (
    <div className="grid lg:grid-cols-[450px_auto] gap-14">
      <div className="lg:sticky top-0 space-y-5">
        <DashboardApplicationDetailsCard
          application={applicationData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        <DashboardApplicationAttachmentsCard application={applicationData} />

        <DashboardApplicationCertificateCard application={applicationData} />
      </div>

      <DashboardApplicationOtherInfoCard application={applicationData} />
    </div>
  );
}
