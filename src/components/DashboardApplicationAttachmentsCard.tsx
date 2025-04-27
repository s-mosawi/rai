import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IProps {
  isAdminView?: boolean;
  application: IApplication;
}

export default function DashboardApplicationAttachmentsCard({
  isAdminView,
  application,
}: IProps) {
  return (
    <div className="p-6 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl">
      <h3 className="mb-5 text-lg font-semibold">Certification documents</h3>

      {isAdminView && (
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-3">
            <Paperclip className="w-5 h-5" />
            Logo
          </p>

          <Button size={"sm"} asChild>
            <Link href={application.businessLogoUrl} target="_blank">
              View
            </Link>
          </Button>
        </div>
      )}

      <div
        className={`${
          isAdminView ? "mt-4 pt-4 border-t border-secondary" : ""
        } flex justify-between items-center`}
      >
        <p className="flex items-center gap-3">
          <Paperclip className="w-5 h-5" />
          Pledge
        </p>

        <Button size={"sm"} asChild>
          <Link href={application.pledgeUrl} target="_blank">
            View
          </Link>
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-secondary flex justify-between items-center">
        <p className="flex items-center gap-3">
          <Paperclip className="w-5 h-5" />
          AI policy
        </p>

        {application.aiPolicyUrl ? (
          <Button size={"sm"} asChild>
            <Link href={application.aiPolicyUrl} target="_blank">
              View
            </Link>
          </Button>
        ) : (
          <p className="text-sm text-red-600">Not provided</p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-secondary flex justify-between items-center">
        <p className="flex items-center gap-3">
          <Paperclip className="w-5 h-5" />
          ISO certification
        </p>

        {application.isoCertificationUrl ? (
          <Button size={"sm"} asChild>
            <Link href={application.isoCertificationUrl} target="_blank">
              View
            </Link>
          </Button>
        ) : (
          <p className="text-sm text-red-600">Not provided</p>
        )}
      </div>
    </div>
  );
}
