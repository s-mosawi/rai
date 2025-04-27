"use client";
import Link from "next/link";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function PricingSection() {
  const [employees, setEmployees] = useState<number[]>([1]);

  return (
    <section className="pt-28 pb-10 lg:pb-28">
      <div className="mx-auto container px-4 flex flex-col items-center">
        <h1 className="mb-8 text-4xl lg:text-6xl !leading-[115%] font-extrabold text-center">
          Certification <span className="text-primary">pricing</span>
        </h1>

        <p className="max-w-[850px] lg:text-lg !leading-[170%] text-center text-muted-foreground">
          Our certification process is designed to be accessible for businesses
          of all sizes. We offer tiered pricing based on the number of employees
          in your organisation, ensuring that every business can demonstrate its
          commitment to responsible and ethical AI use.
        </p>

        <div className="my-20 w-full flex justify-center">
          <div className="w-full max-w-[450px] p-10 border border-secondary rounded-2xl flex flex-col items-center gap-8">
            {employees[0] === 1 && (
              <h3 className="text-[1.75rem] font-bold text-center text-primary">
                AUD $199 <span className="text-base font-semibold">/year</span>
              </h3>
            )}

            {employees[0] === 2 && (
              <h3 className="text-[1.75rem] font-bold text-center text-primary">
                AUD $499 <span className="text-base font-semibold">/year</span>
              </h3>
            )}

            {employees[0] === 3 && (
              <h3 className="text-[1.75rem] font-bold text-center text-primary">
                AUD $699 <span className="text-base font-semibold">/year</span>
              </h3>
            )}

            {employees[0] === 4 && (
              <h3 className="text-[1.75rem] font-bold text-center text-primary">
                AUD $999 <span className="text-base font-semibold">/year</span>
              </h3>
            )}

            {employees[0] === 5 && (
              <h3 className="text-[1.75rem] font-bold text-center text-primary">
                AUD $1499 <span className="text-base font-semibold">/year</span>
              </h3>
            )}

            <Slider
              value={employees}
              onValueChange={(e) => {
                setEmployees(e);
              }}
              min={1}
              max={5}
              step={1}
            />

            {employees[0] === 1 && <p>1-2 employees</p>}
            {employees[0] === 2 && <p>3-10 employees</p>}
            {employees[0] === 3 && <p>11-50 employees</p>}
            {employees[0] === 4 && <p>51-200 employees</p>}
            {employees[0] === 5 && <p>More than 200 employees</p>}

            <div className="flex flex-col items-center gap-2">
              <p
                className={`w-fit py-1 pr-4 pl-[0.3rem] bg-green-100 rounded-full flex items-center gap-2 text-sm font-medium text-green-600 duration-200`}
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.25008 10.4504L8.75008 12.9504L13.7501 7.9504M18.3334 10.4504C18.3334 15.0528 14.6025 18.7837 10.0001 18.7837C5.39771 18.7837 1.66675 15.0528 1.66675 10.4504C1.66675 5.84803 5.39771 2.11707 10.0001 2.11707C14.6025 2.11707 18.3334 5.84803 18.3334 10.4504Z"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="stroke-green-600"
                  />
                </svg>
                Digital badge
              </p>

              <p
                className={`w-fit py-1 pr-4 pl-[0.3rem] bg-green-100 rounded-full flex items-center gap-2 text-sm font-medium text-green-600 duration-200`}
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.25008 10.4504L8.75008 12.9504L13.7501 7.9504M18.3334 10.4504C18.3334 15.0528 14.6025 18.7837 10.0001 18.7837C5.39771 18.7837 1.66675 15.0528 1.66675 10.4504C1.66675 5.84803 5.39771 2.11707 10.0001 2.11707C14.6025 2.11707 18.3334 5.84803 18.3334 10.4504Z"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="stroke-green-600"
                  />
                </svg>
                12 months validity
              </p>
            </div>

            <Link
              href={"/sign-up"}
              className="w-full py-2.5 px-6 border border-transparent hover:border-primary bg-primary hover:bg-transparent rounded-lg flex justify-center font-medium text-white hover:text-primary duration-200"
            >
              Get started
            </Link>
          </div>
        </div>

        <p className="max-w-[850px] lg:text-lg !leading-[170%] text-center text-muted-foreground">
          Each certification provides your business with a digital badge that
          reflects your adherence to ethical AI practices, building trust and
          confidence with your customers and stakeholders. Certifications are
          valid for 12 months and must be renewed annually to ensure continued
          compliance with evolving AI standards and regulations.
        </p>
      </div>
    </section>
  );
}
