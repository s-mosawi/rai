"use client";
import { trpc } from "@/app/_trpc/client";
import BusinessCard from "@/components/BusinessCard";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BusinessesSection() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: businesses } = trpc.application.getForPublic.useQuery() as {
    data: IBusiness[];
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  if (!businesses) {
    return (
      <section className="pt-20">
        <div className="mx-auto container px-4 flex justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20">
      <div className="mx-auto container px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <h1 className="text-3xl !leading-[115%] font-semibold text-center lg:text-left">
            Registered <span className="text-primary">businesses</span>
          </h1>

          <div className="w-full max-w-[420px] h-[54px] px-5 bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-xl flex items-center gap-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                stroke="#97909D"
                stroke-opacity="0.75"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                router.push(`/businesses?q=${e.target.value}`);
              }}
              type="text"
              placeholder="Search by business name or badge number"
              className="flex-1"
            />
          </div>
        </div>

        {businesses.length > 0 ? (
          <>
            {businesses.filter((business) => {
              if (!searchQuery) return true;

              return (
                business.uId
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                business.businessName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              );
            }).length > 0 ? (
              <div className="mt-16 grid lg:grid-cols-2 gap-5">
                {businesses
                  .filter((business) => {
                    if (!searchQuery) return true;

                    return (
                      business.uId
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      business.businessName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    );
                  })
                  .map((business, index) => {
                    return <BusinessCard key={index} business={business} />;
                  })}
              </div>
            ) : (
              <p className="mt-16 text-sm text-center text-muted-foreground">
                No businesses found with the search query "{searchQuery}"
              </p>
            )}
          </>
        ) : (
          <p className="mt-16 text-sm text-center text-muted-foreground">
            No businesses to show...
          </p>
        )}
      </div>
    </section>
  );
}
