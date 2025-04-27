"use client";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/images/logo.png";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavigationBar() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { status } = useSession();
  const pathname = usePathname();

  return (
    <nav>
      <div className="relative mx-auto container h-[125px] px-4 flex justify-between items-center">
        <Link href={"/"}>
          <Image src={logoImg} alt="" width={200} />
        </Link>

        <button onClick={() => setIsOpened(true)} className="flex lg:hidden">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M9 18H21"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-muted-foreground"
            />
          </svg>
        </button>

        <div
          className={`${
            isOpened ? "is-opened" : "is-not-opened"
          } fixed z-[1000] lg:static top-0 left-0 w-full lg:w-fit h-full lg:h-fit bg-white flex flex-col justify-center items-center gap-10 duration-300`}
        >
          <button
            onClick={() => setIsOpened(false)}
            className="absolute top-6 right-6 flex lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-muted-foreground"
              />
            </svg>
          </button>

          <ul className="static lg:absolute top-1/2 left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2 flex flex-col lg:flex-row items-center gap-10">
            <li>
              <Link
                href={"/"}
                className={`${
                  pathname === "/"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                } duration-200`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href={"/pricing"}
                className={`${
                  pathname === "/pricing"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                } duration-200`}
              >
                Pricing
              </Link>
            </li>

            <li>
              <Link
                href={"/about-us"}
                className={`${
                  pathname === "/about-us"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                } duration-200`}
              >
                About us
              </Link>
            </li>

            <li>
              <Link
                href={"/news"}
                className={`${
                  pathname === "/news"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                } duration-200`}
              >
                AI news
              </Link>
            </li>

            <li>
              <Link
                href={"/contact"}
                className={`${
                  pathname === "/contact"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                } duration-200`}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-6">
            {status === "authenticated" ? (
              <Link
                href={"/dashboard"}
                className="py-2.5 px-6 border border-transparent hover:border-primary bg-primary hover:bg-transparent rounded-xl font-medium text-white hover:text-primary duration-200"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className="text-muted-foreground hover:text-foreground duration-200"
                >
                  Login
                </Link>

                <Link
                  href={"/sign-up"}
                  className="py-2.5 px-6 border border-transparent hover:border-primary bg-primary hover:bg-transparent rounded-xl font-medium text-white hover:text-primary duration-200"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
