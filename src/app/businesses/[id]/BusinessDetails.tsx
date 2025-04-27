"use client";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import BusinessDetailsCard from "@/components/BusinessDetailsCard";
import BusinessCertificateCard from "@/components/BusinessCertificateCard";
import BusinessOtherInfoCard from "@/components/BusinessOtherInfoCard";

interface IProps {
  applicationId: string;
}

export default function BusinessDetails({ applicationId }: IProps) {
  const { data: businessData } = trpc.application.getBusiness.useQuery({
    applicationId,
  }) as {
    data: IBusiness;
    refetch: () => void;
  };

  if (!businessData)
    return (
      <div className="pt-20 flex justify-center">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );

  return (
    <section className="pt-20">
      <div className="mx-auto container px-4">
        <div className="grid lg:grid-cols-[450px_auto] gap-14">
          <div className="lg:sticky top-5 h-fit space-y-5">
            <BusinessDetailsCard business={businessData} />

            <BusinessCertificateCard business={businessData} />
          </div>

          <BusinessOtherInfoCard business={businessData} />
        </div>
      </div>
    </section>
  );
}
