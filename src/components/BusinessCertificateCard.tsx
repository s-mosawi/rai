import Image from "next/image";

interface IProps {
  business: IBusiness;
}

export default function BusinessCertificateCard({ business }: IProps) {
  return (
    <>
      <div className="p-6 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl">
        <h3 className="mb-5 text-lg font-semibold text-center">
          Certificate issued
        </h3>

        <div className="flex flex-col items-center gap-6">
          <Image
            src={business.certificateImgUrl ?? ""}
            alt=""
            width={120}
            height={120}
            className="hover:scale-125 duration-200"
          />
        </div>
      </div>
    </>
  );
}
