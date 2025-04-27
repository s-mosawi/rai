"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import illustration1Img from "@/assets/images/illustration-1.png";
import SignPledge from "@/components/sign-pledge/page";
import { ArrowRightIcon } from "lucide-react";
import { ENDPOINT } from '../../var.ts'

export default function HeroSection() {
  const [count, setCount] = useState(null)
  const [showPopup, shouldShowPopup] = useState(false);
  const router = useRouter();

  useEffect(()=> {
     async function GetCount() {
        const response = await fetch(ENDPOINT + '/pledgecount')
        if (response.ok) {
           const { count } = await response.json()
           setCount(count)	
        }	
     }	
     GetCount()    
  }, [])

  return (
   <>
    <section className="pt-12 px-4 overflow-x-hidden">
      <div className="mx-auto max-w-7xl container px-4 grid lg:grid-cols-[1fr_1fr] items-center gap-y-6 gap-x-8 xl:gap-x-16">
        <div className="w-full">
          <h3 className="mb-5 text-lg leading-[170%] text-center lg:text-left text-primary">
            Promoting responsible AI use, one badge at a time
          </h3>

          <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl !leading-[115%] font-extrabold text-center lg:text-left">
            Certification for ethical and{" "}
            <span className="text-primary">responsible AI</span> use and
            development
          </h1>

          <p className="mb-4 text-lg leading-[170%] text-center lg:text-left text-muted-foreground">
            Highlight your commitment and inspire trust
          </p>

          <p className="flex items-center gap-1 mb-6 lg:mb-10 text-lg leading-[170%] text-center lg:text-left text-muted-foreground">
            <span className="font-bold">Pledges Signed</span> 
            <ArrowRightIcon />
            <span className="font-extrabold">{count === null ? '...' : count.toLocaleString()}</span>
          </p>      

          <div className="w-full flex flex-col items-center lg:items-start gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <Link
                href={"/sign-up"}
                className="w-full sm:w-auto py-3 px-8 border border-transparent hover:border-primary bg-primary hover:bg-transparent rounded-xl text-lg font-medium whitespace-nowrap text-white hover:text-primary duration-200 text-center"
              >
                Get started
              </Link>

              <div
                onClick={()=> shouldShowPopup(true)}
                style={{ cursor: 'pointer' }}
                className="w-full sm:w-auto py-3 px-8 border border-transparent hover:border-primary bg-primary hover:bg-transparent rounded-xl text-lg font-medium whitespace-nowrap text-white hover:text-primary duration-200 text-center"
              >
                Sign the Pledge
              </div>
            </div>
            
            <p className="text-center lg:text-left text-muted-foreground">or</p>

            <div className="w-full max-w-[600px] h-[54px] px-5 bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-xl flex items-center gap-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:block"
              >
                <path
                  d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                  stroke="#97909D"
                  strokeOpacity="0.75"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="relative flex-1">
                <input
                  onChange={() => {
                    router.push("/businesses");
                  }}
                  type="text"
                  className="w-full bg-transparent focus:outline-none"
                />
                <p className="absolute top-1/2 left-0 -translate-y-1/2 text-sm md:text-[15px] text-muted-foreground/75 pointer-events-none truncate max-w-[90%]">
                  Check if your provider employs responsible AI use and development
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center order-first lg:order-last">
          <Image
            src={illustration1Img}
            alt="Illustration of responsible AI certification"
            className="w-full max-w-[500px] lg:max-w-[650px]"
            priority
          />
        </div>
      </div>
    </section>

    {showPopup && <SignPledge shouldShowPopup={shouldShowPopup} />}
   </>
  );
}
