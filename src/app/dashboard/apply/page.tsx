import Form from "./Form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export default async function Apply() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  const name = user?.name || "";
  const userName = name.split(" ")[0];

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-24 text-3xl font-bold text-center">
        Let’s get your certification underway
      </h1>

      <Form userName={userName} />
    </div>
  );
}
