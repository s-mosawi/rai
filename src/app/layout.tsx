import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import ProvidersWrapper from "@/components/ProvidersWrapper";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Responsble.ai – A Human-centred Platform for Australian AI-Powered Businesses",
  description:
    "We're on a mission to elevate AI practices across Australia by celebrating businesses that lead with integrity and responsibility.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ProvidersWrapper session={session}>
          {children} <Toaster />
        </ProvidersWrapper>

        <Analytics />
      </body>
    </html>
  );
}
