import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="relative mt-28 border-t">
      {/* <Link
        href={"/docs/ai-policy-template.docx"}
        className="absolute -top-[24px] left-1/2 -translate-x-1/2 py-2.5 px-6 border border-transparent hover:border-primary bg-primary hover:bg-primary/15 backdrop-blur-3xl rounded-xl font-medium text-white hover:text-primary duration-200"
      >
        Score Your Free AI Policy Template
      </Link> */}

      <div className="mx-auto container px-4">
        <div className="py-14 border-b flex flex-col md:flex-row flex-wrap justify-between gap-14">
          <Link href={"/"}>
            <Image src={logoImg} alt="" width={200} />
          </Link>

          <div className="flex flex-col gap-y-5">
            <h3 className="text-lg font-semibold">Company</h3>

            <Link
              href={"/pricing"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Pricing
            </Link>

            <Link
              href={"/about-us"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              About us
            </Link>

            <Link
              href={"/news"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              AI news
            </Link>

            <Link
              href={"/contact"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-y-5">
            <h3 className="hidden md:block text-lg font-semibold opacity-0">
              Company
            </h3>

            <Link
              href={"/businesses"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Businesses
            </Link>

            <Link
              href={"/login"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Login
            </Link>

            <Link
              href={"/sign-up"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Sign up
            </Link>
          </div>

          <div className="flex flex-col gap-y-5">
            <h3 className="text-lg font-semibold">Legal</h3>

            <Link
              href={"/disclaimer"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Disclaimer
            </Link>

            <Link
              href={"/terms-of-service"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Terms of service
            </Link>

            <Link
              href={"/privacy-policy"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Privacy policy
            </Link>

            <Link
              href={"/refund-policy"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Refund policy
            </Link>
          </div>

          {/* <div className="flex flex-col gap-y-5">
            <h3 className="text-lg font-semibold">Useful links</h3>

            <Link
              href={"/contact"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              Submit a complaint
            </Link>

            <Link
              href={"/docs/ai-policy-template.docx"}
              className="text-muted-foreground hover:text-foreground duration-200"
            >
              AI policy template
            </Link>
          </div> */}
        </div>

        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="order-2 md:order-1 text-muted-foreground">
            © Copyright {new Date().getFullYear()}. All rights reserved.
          </p>

          <div className="order-1 md:order-2 flex items-center gap-4">
            <p className="text-muted-foreground">Follow us on:</p>

            <Link
              href={"https://www.linkedin.com/company/responsble-ai"}
              target="_blank"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 4.66667C0 2.08934 2.13031 0 4.75817 0H23.2418C25.8697 0 28 2.08934 28 4.66667V23.3333C28 25.9107 25.8697 28 23.2418 28H4.75817C2.13031 28 0 25.9107 0 23.3333V4.66667Z"
                  fill="#0077B5"
                />
                <path
                  d="M19.7097 24.0637H23.926V15.7236C23.926 11.6046 21.3836 10.1997 19.031 10.1997C16.8555 10.1997 15.3777 11.617 14.9697 12.4471V10.5787H10.9148V24.0637H15.1311V16.7526C15.1311 14.8032 16.3575 13.8552 17.6087 13.8552C18.792 13.8552 19.7097 14.5253 19.7097 16.6985V24.0637Z"
                  fill="white"
                />
                <path
                  d="M3.84302 6.2633C3.84302 7.67112 4.93132 8.69993 6.27378 8.69993C7.61644 8.69993 8.70474 7.67112 8.70474 6.2633C8.70474 4.85567 7.61644 3.82568 6.27378 3.82568C4.93132 3.82568 3.84302 4.85567 3.84302 6.2633Z"
                  fill="white"
                />
                <path
                  d="M4.16573 24.0533H8.38183V10.5683H4.16573V24.0533Z"
                  fill="white"
                />
              </svg>
            </Link>

            <Link
              href={"https://www.instagram.com/responsible_ai_australia"}
              target="_blank"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_27)">
                  <path
                    d="M24 4.32187C30.4125 4.32187 31.1719 4.35 33.6938 4.4625C36.0375 4.56562 37.3031 4.95938 38.1469 5.2875C39.2625 5.71875 40.0688 6.24375 40.9031 7.07812C41.7469 7.92188 42.2625 8.71875 42.6938 9.83438C43.0219 10.6781 43.4156 11.9531 43.5188 14.2875C43.6313 16.8187 43.6594 17.5781 43.6594 23.9813C43.6594 30.3938 43.6313 31.1531 43.5188 33.675C43.4156 36.0188 43.0219 37.2844 42.6938 38.1281C42.2625 39.2438 41.7375 40.05 40.9031 40.8844C40.0594 41.7281 39.2625 42.2438 38.1469 42.675C37.3031 43.0031 36.0281 43.3969 33.6938 43.5C31.1625 43.6125 30.4031 43.6406 24 43.6406C17.5875 43.6406 16.8281 43.6125 14.3063 43.5C11.9625 43.3969 10.6969 43.0031 9.85313 42.675C8.7375 42.2438 7.93125 41.7188 7.09688 40.8844C6.25313 40.0406 5.7375 39.2438 5.30625 38.1281C4.97813 37.2844 4.58438 36.0094 4.48125 33.675C4.36875 31.1438 4.34063 30.3844 4.34063 23.9813C4.34063 17.5688 4.36875 16.8094 4.48125 14.2875C4.58438 11.9437 4.97813 10.6781 5.30625 9.83438C5.7375 8.71875 6.2625 7.9125 7.09688 7.07812C7.94063 6.23438 8.7375 5.71875 9.85313 5.2875C10.6969 4.95938 11.9719 4.56562 14.3063 4.4625C16.8281 4.35 17.5875 4.32187 24 4.32187ZM24 0C17.4844 0 16.6688 0.028125 14.1094 0.140625C11.5594 0.253125 9.80625 0.665625 8.2875 1.25625C6.70312 1.875 5.3625 2.69062 4.03125 4.03125C2.69063 5.3625 1.875 6.70313 1.25625 8.27813C0.665625 9.80625 0.253125 11.55 0.140625 14.1C0.028125 16.6687 0 17.4844 0 24C0 30.5156 0.028125 31.3312 0.140625 33.8906C0.253125 36.4406 0.665625 38.1938 1.25625 39.7125C1.875 41.2969 2.69063 42.6375 4.03125 43.9688C5.3625 45.3 6.70313 46.125 8.27813 46.7344C9.80625 47.325 11.55 47.7375 14.1 47.85C16.6594 47.9625 17.475 47.9906 23.9906 47.9906C30.5063 47.9906 31.3219 47.9625 33.8813 47.85C36.4313 47.7375 38.1844 47.325 39.7031 46.7344C41.2781 46.125 42.6188 45.3 43.95 43.9688C45.2812 42.6375 46.1063 41.2969 46.7156 39.7219C47.3063 38.1938 47.7188 36.45 47.8313 33.9C47.9438 31.3406 47.9719 30.525 47.9719 24.0094C47.9719 17.4938 47.9438 16.6781 47.8313 14.1188C47.7188 11.5688 47.3063 9.81563 46.7156 8.29688C46.125 6.70312 45.3094 5.3625 43.9688 4.03125C42.6375 2.7 41.2969 1.875 39.7219 1.26562C38.1938 0.675 36.45 0.2625 33.9 0.15C31.3313 0.028125 30.5156 0 24 0Z"
                    fill="#000100"
                  />
                  <path
                    d="M24 11.6719C17.1938 11.6719 11.6719 17.1938 11.6719 24C11.6719 30.8062 17.1938 36.3281 24 36.3281C30.8062 36.3281 36.3281 30.8062 36.3281 24C36.3281 17.1938 30.8062 11.6719 24 11.6719ZM24 31.9969C19.5844 31.9969 16.0031 28.4156 16.0031 24C16.0031 19.5844 19.5844 16.0031 24 16.0031C28.4156 16.0031 31.9969 19.5844 31.9969 24C31.9969 28.4156 28.4156 31.9969 24 31.9969Z"
                    fill="#000100"
                  />
                  <path
                    d="M39.6937 11.1844C39.6937 12.7782 38.4 14.0625 36.8156 14.0625C35.2219 14.0625 33.9375 12.7688 33.9375 11.1844C33.9375 9.59065 35.2313 8.30627 36.8156 8.30627C38.4 8.30627 39.6937 9.60003 39.6937 11.1844Z"
                    fill="#000100"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_27">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>

            <Link href={"#"} target="_blank">
              <svg
                width="22"
                height="22"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_24)">
                  <path
                    d="M48 24C48 10.7453 37.2547 0 24 0C10.7453 0 0 10.7453 0 24C0 35.255 7.74912 44.6995 18.2026 47.2934V31.3344H13.2538V24H18.2026V20.8397C18.2026 12.671 21.8995 8.8848 29.9194 8.8848C31.44 8.8848 34.0637 9.18336 35.137 9.48096V16.129C34.5706 16.0694 33.5866 16.0397 32.3645 16.0397C28.4294 16.0397 26.9088 17.5306 26.9088 21.4061V24H34.7482L33.4013 31.3344H26.9088V47.8243C38.7926 46.3891 48.001 36.2707 48.001 24H48Z"
                    fill="#0866FF"
                  />
                  <path
                    d="M33.4003 31.3344L34.7472 24H26.9078V21.4061C26.9078 17.5306 28.4285 16.0397 32.3635 16.0397C33.5856 16.0397 34.5696 16.0694 35.136 16.129V9.48096C34.0627 9.1824 31.439 8.8848 29.9184 8.8848C21.8986 8.8848 18.2016 12.671 18.2016 20.8397V24H13.2528V31.3344H18.2016V47.2934C20.0582 47.7542 22.0003 48 23.999 48C24.983 48 25.9536 47.9395 26.9069 47.8243V31.3344H33.3994H33.4003Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_24">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
