import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  application: IApplication;
}

export default function DashboardApplicationCertificateCard({
  application,
}: IProps) {
  return (
    <>
      {application.status === "REJECTED" && application.rejectionReason && (
        <div className="p-6 bg-red-100 rounded-2xl">
          <h3 className="mb-4 text-lg font-semibold text-red-600">
            Rejection reason
          </h3>

          <p className="text-red-600">{application.rejectionReason}</p>
        </div>
      )}

      {application.status === "PAID" &&
        application.certificateImgUrl &&
        application.certificateFileUrl &&
        application.expiresAt && (
          <div className="p-6 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl">
            <h3 className="mb-5 text-lg font-semibold text-center">
              Certificate issued
            </h3>

            <div className="flex flex-col items-center gap-6">
              <Image
                src={application.certificateImgUrl}
                alt=""
                width={120}
                height={120}
              />

              <Button size={"sm"} asChild className="w-fit">
                <Link href={application.certificateFileUrl} target="_blank">
                  Download
                </Link>
              </Button>
            </div>
          </div>
        )}
    </>
  );
}
