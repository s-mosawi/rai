"use client";
import { trpc } from "@/app/_trpc/client";
import DashboardApplicationCard from "@/components/DashboardApplicationCard";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Applications() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchParams = useSearchParams();

  const { data: applications } =
    trpc.application.getUserApplications.useQuery() as {
      data: IApplication[];
    };

  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  if (!applications)
    return (
      <div className="mt-16 flex justify-center">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    );

  return applications.length > 0 ? (
    <>
      {applications.filter((application) => {
        if (!searchQuery) return true;
        return application.businessName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }).length > 0 ? (
        <div className="mt-16 grid lg:grid-cols-2 2xl:grid-cols-3 gap-5">
          {applications
            .filter((application) => {
              if (!searchQuery) return true;
              return application.businessName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            })
            .map((application, index) => {
              return (
                <DashboardApplicationCard
                  key={index}
                  application={application}
                />
              );
            })}
        </div>
      ) : (
        <p className="mt-16 text-sm text-center text-muted-foreground">
          No applications found with the search query "{searchQuery}"
        </p>
      )}
    </>
  ) : (
    <p className="mt-16 text-sm text-center text-muted-foreground">
      No applications to show...
    </p>
  );
}
