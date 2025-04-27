"use client";

import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function BusinessSection() {
  const { data, isLoading } = trpc.application.getForPublic.useQuery();
  const businesses = data as Array<{
    id: string;
    businessLogoUrl: string | null;
    businessName: string;
  }>;

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="mx-auto container px-4 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p className="text-gray-600">Loading certified businesses...</p>
        </div>
      </section>
    );
  }

  if (!businesses || businesses.length === 0) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-primary mb-6">
            Australian Businesses Leading in Responsible AI
          </h2>
          <p className="text-lg text-muted-foreground">
            No certified businesses found at this time.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 mb-20 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold text-primary mb-6">
          Australian Businesses Leading in Responsible AI
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          These brands have earned their certification and are leading the way
          in ethical AI practices.
        </p>

        {/* Wrapper to center the grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center space-x-8 mt-6">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="relative w-32 h-32 flex justify-center items-center rounded-md bg-white shadow-lg"
              >
                {/* Background layer effect */}
                <div className="absolute inset-0 bg-purple-800 rounded-md -translate-x-4 -translate-y-4"></div>

                {/* Foreground logo container */}
                <div className="relative w-full h-full flex justify-center items-center rounded-md bg-white shadow-lg">
                  <Image
                    src={business.businessLogoUrl ?? "/placeholder.png"}
                    alt={business.businessName}
                    width={160}
                    height={160}
                    className="rounded-md object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder.png";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
