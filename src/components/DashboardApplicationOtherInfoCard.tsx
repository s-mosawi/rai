"use client";
import { useState } from "react";
import { otherInfoQuestions } from "@/lib/platform";

interface IProps {
  application: IApplication;
}

export default function DashboardApplicationOtherInfoCard({
  application,
}: IProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const otherInfo: object = JSON.parse(JSON.stringify(application.otherInfo));

  return (
    <div>
      <h3 className="mb-10 text-2xl font-semibold">Additional information</h3>

      {Object.entries(otherInfo).map(([key, value], index) => {
        return (
          <div
            key={index}
            className={
              "mt-5 p-10 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl"
            }
          >
            <p
              onClick={() => {
                setActiveFaq(index === activeFaq ? null : index);
              }}
              className="font-medium leading-[170%] cursor-pointer"
            >
              {index + 1}.{" "}
              {otherInfoQuestions.find((q) => q.dbKey === key)?.question || key}
            </p>

            {activeFaq === index && (
              <p className="mt-5 leading-[170%] text-muted-foreground">
                {value
                  ? typeof value === "string"
                    ? value
                    : value.map((v: string, _index: number) => {
                        return (
                          <span key={_index} className="block">
                            - {v}
                          </span>
                        );
                      })
                  : "N/A"}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
