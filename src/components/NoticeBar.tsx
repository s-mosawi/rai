import Link from "next/link";

export default function NoticeBar() {
  return (
    <div>
      <div className="mx-auto container py-3 px-4 bg-[url('/images/notice-bar-bg.png')] bg-cover bg-center rounded-b-3xl flex justify-center">
        <Link
          href={"/news/launch"}
          className="flex justify-center items-center gap-2"
        >
          <p className="text-sm font-medium text-center text-white">
            Announcing the launch of Responsble.ai™ Australia.{" "}
            <br className="block md:hidden" />
            <span className="text-white/75">Learn more</span>
          </p>

          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden md:inline-block"
          >
            <path
              d="M3.33325 8.5H12.6666M12.6666 8.5L7.99992 3.83333M12.6666 8.5L7.99992 13.1667"
              stroke="white"
              stroke-opacity="0.65"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
