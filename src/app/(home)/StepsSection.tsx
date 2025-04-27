import Image from "next/image";
import stepsImg from "@/assets/images/steps.png";

export default function StepsSection() {
  return (
    <section className="pt-28">
      <div className="mx-auto container px-4 flex justify-center">
        <div className="relative w-full max-w-[1180px]">
          <Image
            src={stepsImg}
            alt=""
            className="w-full hidden lg:block pointer-events-none"
          />

          <div className="lg:absolute top-[18%] right-0 w-full max-w-[680px]">
            <h2 className="mb-6 text-3xl lg:text-4xl font-bold !leading-[140%]">
              The steps to get certified and own{" "}
              <span className="text-primary">Digital Badge</span>
            </h2>

            <p className="lg:text-lg !leading-[170%] text-muted-foreground">
              Join the movement for responsible AI use by following these simple
              steps:
            </p>
          </div>

          <div className="mt-14 grid lg:hidden sm:grid-cols-2 gap-4">
            <div className="p-8 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl flex items-center gap-4 hover:opacity-75 duration-200">
              <div className="w-[30px] flex justify-center">
                <Image src="/images/step-1.png" alt="" width={25} height={25} />
              </div>
              <h3 className="text-lg font-semibold">Apply</h3>
            </div>

            <div className="p-8 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl flex items-center gap-4 hover:opacity-75 duration-200">
              <div className="w-[30px] flex justify-center">
                <Image src="/images/step-2.png" alt="" width={25} height={25} />
              </div>
              <h3 className="text-lg font-semibold">Human-reviewed</h3>
            </div>

            <div className="p-8 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl flex items-center gap-4 hover:opacity-75 duration-200">
              <div className="w-[30px] flex justify-center">
                <Image src="/images/step-3.png" alt="" width={28} height={28} />
              </div>
              <h3 className="text-lg font-semibold">Payment</h3>
            </div>

            <div className="p-8 border bg-primary/20 rounded-2xl flex items-center gap-4 hover:opacity-75 duration-200">
              <div className="w-[30px] flex justify-center">
                <Image src="/images/step-4.png" alt="" width={35} height={35} />
              </div>
              <h3 className="text-lg font-semibold text-primary">
                Badge issuance
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
