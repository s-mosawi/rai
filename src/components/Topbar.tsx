import Link from "next/link";
import Image from "next/image";
import iconImg from "@/assets/images/icon.png";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import ProfileDropdown from "./ProfileDropdown";
import TopbarMenu from "./TopbarMenu";
import TopbarSearchBox from "./TopbarSearchBox";

interface IProps {
  isAdminView?: boolean;
}

export default async function Topbar({ isAdminView }: IProps) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <nav className="border-b">
      <div className="mx-auto container h-[90px] px-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/dashboard">
            <Image src={iconImg} alt="" width={50} />
          </Link>

          <div className="hidden lg:block">
            <TopbarMenu isAdminView={isAdminView} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <TopbarSearchBox isAdminView={isAdminView} />
          </div>

          <ProfileDropdown name={user?.name || ""} email={user?.email || ""} />
        </div>
      </div>
    </nav>
  );
}
