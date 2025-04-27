"use client";
import { useRef, useState } from "react";
import { otherInfoQuestions } from "@/lib/platform";

interface IProps {
  business: IBusiness;
}

interface IFaq {
  question: string;
  answer: JSX.Element;
}

function FAQ({ question, answer }: IFaq) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={
        "mt-5 p-8 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl"
      }
    >
      <p
        onClick={() => {
          setIsActive(!isActive);
        }}
        className="font-medium leading-[170%] cursor-pointer"
      >
        {question}
      </p>

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
        <p className="leading-[170%] text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

export default function BusinessOtherInfoCard({ business }: IProps) {
  const otherInfo: object = JSON.parse(JSON.stringify(business.otherInfo));

  return (
    <div>
      <h3 className="mb-10 text-2xl font-semibold">Additional information</h3>

      {Object.entries(otherInfo).map(([key, value], index) => {
        return (
          <FAQ
            key={index}
            question={`${index + 1}. ${
              otherInfoQuestions.find((q) => q.dbKey === key)?.question || key
            }`}
            answer={
              value
                ? typeof value === "string"
                  ? value
                  : value.map((v: string, _index: number) => {
                      return (
                        <span key={_index} className="block">
                          - {v}
                        </span>
                      );
                    })
                : "N/A"
            }
          />
        );
      })}
    </div>
  );
}
