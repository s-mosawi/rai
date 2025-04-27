import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import Applications from './Applications';
import { redirect as nextRedirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (user?.isAdmin) {
    return nextRedirect('/admin');
  }

  const name = user?.name || '';
  const userName = name.split(' ')[0] + '!';

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">
        <h1 className="text-2xl lg:text-3xl font-bold">Welcome, {userName}</h1>

        <Button asChild>
          <Link href={'/dashboard/apply'}>
            <PlusCircle className="mr-2 w-4 h-4" /> Apply now
          </Link>
        </Button>
      </div>

      <Applications />
    </>
  );
}
