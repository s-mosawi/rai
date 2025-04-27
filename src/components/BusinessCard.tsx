import Image from "next/image";
import Link from "next/link";

interface IProps {
  business: IBusiness;
}

export default function BusinessCard({ business }: IProps) {
  return (
    <Link
      href={`/businesses/${business.id}`}
      className="relative hover:-translate-y-1 pt-12 pb-6 px-6 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl hover:opacity-75 duration-200"
    >
      <p
        className={`absolute top-[10px] right-[10px] py-[3px] px-3 bg-green-100 rounded-full text-xs font-medium uppercase text-green-600 duration-200`}
      >
        Active
      </p>

      <div className="grid grid-cols-[75px_auto_55px] md:grid-cols-[80px_auto_55px] items-center gap-5 lg:gap-6">
        <div className="aspect-square bg-secondary rounded-xl flex justify-center items-center">
          <img
            src={business.businessLogoUrl}
            alt=""
            width={60}
            height={60}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-1">
          {business.businessWebsite ? (
            <Link
              href={business.businessWebsite}
              target="_blank"
              className="flex items-center text-lg font-semibold"
            >
              {business.businessName}&nbsp;&nbsp;&nbsp;
              <span className="text-sm font-[400] text-muted-foreground">
                —&nbsp;&nbsp;&nbsp;{business.businessSector}
              </span>
            </Link>
          ) : (
            <h3 className="flex items-center text-lg font-semibold">
              {business.businessName}&nbsp;&nbsp;&nbsp;
              <span className="hidden md:block text-sm font-[400] text-muted-foreground">
                —&nbsp;&nbsp;&nbsp;{business.businessSector}
              </span>
            </h3>
          )}

          <p className="flex text-sm text-muted-foreground">
            Badge no: {business.uId}
          </p>
        </div>

        <Image
          src={business.certificateImgUrl || ""}
          alt=""
          width={55}
          height={55}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <p
          className={`py-1 pr-4 pl-[0.3rem] bg-green-100 rounded-full flex items-center gap-2 text-sm font-medium text-green-600 duration-200`}
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
          Signed pledge
        </p>

        {business.aiPolicyUrl && (
          <p
            className={`py-1 pr-4 pl-[0.3rem] bg-green-100 rounded-full flex items-center gap-2 text-sm font-medium text-green-600 duration-200`}
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
            Has AI policy
          </p>
        )}

        {business.isoCertificationUrl && (
          <p
            className={`py-1 pr-4 pl-[0.3rem] bg-green-100 rounded-full flex items-center gap-2 text-sm font-medium text-green-600 duration-200`}
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
            Certified to ISO/IEC 42001:2023
          </p>
        )}
      </div>
    </Link>
  );
}
