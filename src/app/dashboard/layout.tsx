import Topbar from "@/components/Topbar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Topbar />

      <section>
        <div className="mx-auto container py-14 px-8">{children}</div>
      </section>
    </main>
  );
}
