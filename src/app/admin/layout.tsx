import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import Topbar from '@/components/Topbar';
import { redirect } from 'next/navigation';

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!user || !user.isAdmin) {
    return redirect('/dashboard');
  }

  return (
    <main>
      <Topbar isAdminView />

      <section>
        <div className="mx-auto container py-14 px-4">{children}</div>
      </section>
    </main>
  );
}
