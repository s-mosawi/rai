"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import badgeImg1 from "@/assets/images/badge-1.png";
import badgeImg2 from "@/assets/images/badge-2.png";
import badgeImg3 from "@/assets/images/badge-3.png";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const badges = [badgeImg1, badgeImg2, badgeImg3];

function BadgeQueue({ activeBadge }: { activeBadge: number }) {
  const reordered = [
    badges[(activeBadge - 1) % 3],
    badges[activeBadge % 3],
    badges[(activeBadge + 1) % 3],
  ];

  const imageVariants = {
    initial: (direction: number) => ({
      x: direction === -1 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      x: direction === -1 ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };

  const sizeClasses = [
    "w-[180px] lg:w-[280px] min-w-[180px] lg:min-w-[280px]",
    "w-[110px] lg:w-[200px] min-w-[110px] lg:min-w-[200px] grayscale opacity-50",
    "w-[70px] lg:w-[120px] min-w-[70px] lg:min-w-[120px] grayscale opacity-25",
  ];

  return (
    <div className="lg:absolute lg:top-1/2 lg:left-[820px] lg:-translate-y-1/2 mt-16 lg:mt-0 lg:h-full flex items-center gap-4 lg:gap-8 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {reordered.map((badge, index) => (
          <motion.div
            key={badge.src}
            custom={-1}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <Image src={badge} alt="" className={sizeClasses[index]} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function BadgesSection() {
  const [activeBadge, setActiveBadge] = useState<number>(1);

  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(
        {},
        {
          duration: 1,
          onUpdate: () => setActiveBadge(1),
        }
      )
        .to(
          {},
          {
            duration: 1,
            onUpdate: () => setActiveBadge(2),
          }
        )
        .to(
          {},
          {
            duration: 1,
            onUpdate: () => setActiveBadge(3),
          }
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    setActiveBadge((prev) => (prev % 3) + 1);
  };

  return (
    <section ref={sectionRef} className="pt-28 overflow-hidden">
      <div className="mx-auto container px-4 flex justify-center">
        <div className="relative w-full max-w-[1100px]">
          <div>
            <h2 className="mb-8 max-w-[650px] text-3xl lg:text-4xl font-bold !leading-[140%]">
              Inspire trust with <br />
              <span className="text-primary">
                {activeBadge === 1
                  ? "Bronze"
                  : activeBadge === 2
                    ? "Silver"
                    : "Gold"}{" "}
                Badge
              </span>
            </h2>

            <p className="mb-10 max-w-[700px] lg:text-lg !leading-[170%] text-muted-foreground">
              {activeBadge === 1
                ? "Indicates that the business has formally committed to the AI pledge and adheres to all our certification rules."
                : activeBadge === 2
                  ? "Signifies that the business has both committed to the AI pledge and implemented an AI policy. Further, the business adheres to all our certification rules."
                  : "Denotes that the business has committed to the AI pledge, has an AI policy in place, and complies with ISO/IEC 42001:2023 standards. As well, the business adheres to all our certification rules."}
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-4">
              <p className="lg:text-lg !leading-[170%]">Requirements:</p>

              <div className="flex flex-wrap gap-2">
                <p className="py-1.5 pr-4 pl-2 bg-green-100 rounded-full flex items-center gap-2 text-green-600 duration-200">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.25008 10.4504L8.75008 12.9504L13.7501 7.9504M18.3334 10.4504C18.3334 15.0528 14.6025 18.7837 10.0001 18.7837C5.39771 18.7837 1.66675 15.0528 1.66675 10.4504C1.66675 5.84803 5.39771 2.11707 10.0001 2.11707C14.6025 2.11707 18.3334 5.84803 18.3334 10.4504Z"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-green-600"
                    />
                  </svg>
                  Sign pledge
                </p>

                {activeBadge > 1 && (
                  <p className="py-1.5 pr-4 pl-2 bg-green-100 rounded-full flex items-center gap-2 text-green-600 duration-200">
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.25008 10.4504L8.75008 12.9504L13.7501 7.9504M18.3334 10.4504C18.3334 15.0528 14.6025 18.7837 10.0001 18.7837C5.39771 18.7837 1.66675 15.0528 1.66675 10.4504C1.66675 5.84803 5.39771 2.11707 10.0001 2.11707C14.6025 2.11707 18.3334 5.84803 18.3334 10.4504Z"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-green-600"
                      />
                    </svg>
                    AI policy
                  </p>
                )}

                {activeBadge > 2 && (
                  <p className="py-1.5 pr-4 pl-2 bg-green-100 rounded-full flex items-center gap-2 text-green-600 duration-200">
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.25008 10.4504L8.75008 12.9504L13.7501 7.9504M18.3334 10.4504C18.3334 15.0528 14.6025 18.7837 10.0001 18.7837C5.39771 18.7837 1.66675 15.0528 1.66675 10.4504C1.66675 5.84803 5.39771 2.11707 10.0001 2.11707C14.6025 2.11707 18.3334 5.84803 18.3334 10.4504Z"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-green-600"
                      />
                    </svg>
                    Certified to ISO/IEC 42001:2023
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleNext}
                className="w-[45px] min-w-[45px] h-[45px] border rounded-full flex justify-center items-center"
              >
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.58329 7.45046L14.4166 7.45046M14.4166 7.45046L7.99996 1.03379M14.4166 7.45046L7.99996 13.8671"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-muted-foreground"
                  />
                </svg>
              </button>
            </div>
          </div>

          <BadgeQueue activeBadge={activeBadge} />
        </div>
      </div>
    </section>
  );
}
