"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface IProps {
  isAdminView?: boolean;
}

export default function TopbarSearchBox({ isAdminView }: IProps) {
  const router = useRouter();

  return (
    <Input
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
          router.push(isAdminView ? "/admin" : "/dashboard");
        } else {
          if (isAdminView) {
            router.push(`/admin?q=${e.target.value}`);
          } else {
            router.push(`/dashboard?q=${e.target.value}`);
          }
        }
      }}
      size={40}
      type="text"
      placeholder="Search applications..."
      required
    />
  );
}
