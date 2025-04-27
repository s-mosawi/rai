"use client";
import { useRef, useState } from "react";
import Link from "next/link";

interface IFaq {
  question: string;
  answer: JSX.Element;
}

function FAQ({ question, answer }: IFaq) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-[900px] py-4 lg:py-5 px-6 lg:px-8 bg-primary/5 rounded-2xl">
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className="flex justify-between items-center gap-4 cursor-pointer"
      >
        <h3 className="lg:text-lg font-medium">{question}</h3>

        <div className="w-[40px] min-w-[40px] h-[40px] border rounded-full flex justify-center items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isActive ? "rotate-45" : ""} duration-200`}
          >
            <path
              d="M10.0001 4.1665V15.8332M4.16675 9.99984H15.8334"
              stroke="#97909D"
              strokeOpacity="0.75"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${isActive ? "stroke-primary" : "stroke-[#97909D]"} duration-200`}
            />
          </svg>
        </div>
      </div>

      <div
        ref={contentRef}
        className={`${
          isActive ? "pt-[10px]" : ""
        } duration-300 overflow-hidden`}
        style={{
          maxHeight: isActive
            ? `${
                contentRef.current?.scrollHeight
                  ? contentRef.current?.scrollHeight + 10
                  : "0"
              }px`
            : "0px",
        }}
      >
        {answer}
      </div>
    </div>
  );
}

export default function FAQsSection() {
  const faqs: IFaq[] = [
    {
      question: "Who should get certified?",
      answer: (
        <p className="leading-[170%] text-muted-foreground">
          Any Australian business that integrates AI into its daily operations
          or develops AI solutions for other businesses should consider
          certification. <br />
          <br />
          <span className="font-medium text-foreground">For AI Users:</span> If
          your business leverages AI for decision-making, customer interactions,
          or automation, certification helps showcase your commitment to ethical
          and responsible AI use. <br />
          <span className="font-medium text-foreground">
            For AI Developers:
          </span>{" "}
          If your business builds AI tools for other organisations,
          certification demonstrates adherence to industry best practices and
          safety standards. <br />
          <br /> Our certification ensures businesses uphold responsible,
          ethical, and safe AI practices.
        </p>
      ),
    },
    {
      question: "What does each badge represent?",
      answer: (
        <p className="leading-[170%] text-muted-foreground">
          We issue three tiers of badges: Bronze, Silver and Gold. <br />
          <br />
          <span className="font-medium text-foreground">
            Bronze Badge:
          </span>{" "}
          Signifies that the business has both committed to the AI pledge and
          implemented an AI policy. <br />
          <span className="font-medium text-foreground">
            Silver Badge:
          </span>{" "}
          Indicates that the business has formally committed to the AI pledge.
          <br />{" "}
          <span className="font-medium text-foreground">Gold Badge:</span>{" "}
          Denotes that the business has committed to the AI pledge, has an AI
          policy in place, and complies with ISO/IEC 42001:2023 standards.{" "}
          <br />
          <br /> The Gold badge is the highest level of certification.
        </p>
      ),
    },
    {
      question: "What are the costs associated with certification?",
      answer: (
        <p className="leading-[170%] text-muted-foreground">
          Our certification process is designed to be accessible for businesses
          of all sizes. We offer tiered pricing based on the number of employees
          in your organisation, ensuring that every business can demonstrate its
          commitment to responsible and ethical AI use. <br />
          <br /> For more information, please visit our pricing page.
        </p>
      ),
    },
    {
      question: "Is it necessary to renew my certification?",
      answer: (
        <p className="leading-[170%] text-muted-foreground">
          Yes, certification must be renewed every 12 months from the date of
          issue.
        </p>
      ),
    },
    {
      question: "What are the consequences of failing to renew certification?",
      answer: (
        <p className="leading-[170%] text-muted-foreground">
          Failure to renew certification by the specified deadline will result
          in the revocation of your license. Consequently, you will no longer be
          authorised to use our certification trade mark. Unauthorised use of
          the trademark may result in legal action.
        </p>
      ),
    },
    {
      question:
        "How can I report unethical use of AI by a certified business, and what is the procedure?",
      answer: (
        <p className="leading-[170%] text-muted-foreground">
          To report unethical AI use by a certified business, please submit a
          complaint using our designated form. We will review the complaint,
          notify the business involved, and undertake a thorough investigation.
          The business will be given 28 days from the date of notification to
          address the issues raised. Should the business fail to resolve the
          matter within the allotted time, its certification will be revoked.{" "}
          <br />
          <br />
          <Link href={"/contact"} className="hover:underline text-primary">
            Submit a complaint
          </Link>
        </p>
      ),
    },
  ];

  return (
    <section className="pt-28">
      <div className="mx-auto container px-4">
        <h2 className="mb-14 text-3xl lg:text-4xl font-bold text-center">
          Frequently asked <span className="text-primary">questions</span>
        </h2>

        <div className="flex flex-col items-center gap-4">
          {faqs.map((faq, index) => (
            <FAQ key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
