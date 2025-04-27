import Image from "next/image";
import { Bolt, Users, Globe, CalendarX } from "lucide-react";
import Link from "next/link";

interface IProps {
  business: IBusiness;
}

export default function BusinessDetailsCard({ business }: IProps) {
  return (
    <div className="relative p-6 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl">
      <p
        className={`absolute top-[10px] right-[10px] py-[3px] px-3 bg-green-100 rounded-full text-xs font-medium uppercase text-green-600 duration-200`}
      >
        Active
      </p>

      <div className="grid grid-cols-[80px_auto] items-center gap-6">
        <div className="aspect-square bg-secondary rounded-xl flex justify-center items-center">
          <Image
            src={business.businessLogoUrl}
            alt=""
            width={60}
            height={60}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-1">
          {business.businessWebsite ? (
            <Link
              href={business.businessWebsite}
              className="text-lg font-semibold"
            >
              {business.businessName}
            </Link>
          ) : (
            <h3 className="text-lg font-semibold">{business.businessName}</h3>
          )}

          <p className="text-sm text-muted-foreground">
            Badge no: {business.uId ? business.uId : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <p className="flex items-center gap-3 text-muted-foreground">
          <Bolt className="w-5 h-5" />
          Sector:{" "}
          <span className="text-foreground">{business.businessSector}</span>
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-secondary space-y-3">
        <p className="flex items-center gap-3 text-muted-foreground">
          <Users className="w-5 h-5" />
          Size:{" "}
          <span className="text-foreground">
            {business.businessSize} employees
          </span>
        </p>
      </div>

      {business.businessWebsite && (
        <div className="mt-5 pt-5 border-t border-secondary space-y-3">
          <Link
            href={business.businessWebsite}
            className="flex items-center gap-3"
          >
            <Globe className="w-5 h-5" />
            Website
          </Link>
        </div>
      )}

      <div className="mt-5 pt-5 border-t border-secondary space-y-3">
        <p className="flex items-center gap-3 text-muted-foreground">
          <CalendarX className="w-5 h-5" />
          Expires on:{" "}
          <span className="text-foreground">
            {new Date(business.expiresAt!).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        </p>
      </div>
    </div>
  );
}
