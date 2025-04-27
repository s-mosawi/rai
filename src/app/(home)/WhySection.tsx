"use client";
import { useState } from "react";
import Image from "next/image";

interface IProps {
  imgUrl: string;
  title: string;
  description: JSX.Element;
}

function InfoBox({ imgUrl, title, description }: IProps) {
  return (
    <div>
      <Image src={imgUrl} alt="" width={40} height={40} />

      <h3 className="mt-6 mb-5 text-lg font-semibold">{title}</h3>

      {description}
    </div>
  );
}

export default function WhySection() {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <section className="pt-28">
      <div className="mx-auto container px-4 flex justify-center">
        <div className="w-full max-w-[1100px] p-14 lg:p-20 bg-primary/5 rounded-[2.5rem] flex flex-col items-center">
          <h2 className="mb-8 text-3xl lg:text-4xl font-bold !leading-[140%] text-center">
            Why get <span className="text-primary">certified?</span>
          </h2>

          <div className="mb-20 flex">
            <button
              onClick={() => setActiveTab(1)}
              className={`py-1.5 px-4 ${
                activeTab === 1 ? "bg-primary text-white" : ""
              } rounded-full font-medium duration-200`}
            >
              Advantages
            </button>

            <button
              onClick={() => setActiveTab(2)}
              className={`py-1.5 px-4 ${
                activeTab === 2 ? "bg-primary text-white" : ""
              } rounded-full font-medium duration-200`}
            >
              Use cases
            </button>
          </div>

          {activeTab === 1 ? (
            <div className="relative">
              <div className="relative pb-[54px] grid lg:grid-cols-2 gap-[120px]">
                <InfoBox
                  imgUrl="/images/advantage-1.png"
                  title="Trust & credibility"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • The certification signals that your business adheres to
                      ethical AI standards, building trust with customers,
                      partners, and stakeholders. <br />
                      <br />• Add credibility to your company’s AI practices,
                      which is particularly important as AI regulations tighten
                      globally.
                    </p>
                  }
                />

                <InfoBox
                  imgUrl="/images/advantage-2.png"
                  title="Market differentiation"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • Stand out from competitors by showcasing your commitment
                      to responsible AI practices. <br />
                      <br />• The badge serves as a visual representation of
                      your dedication to ethical AI, making your business more
                      attractive to conscientious consumers and clients.
                    </p>
                  }
                />

                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent hidden lg:block"></div>
              </div>

              <div className="relative py-[54px] grid lg:grid-cols-2 gap-[120px]">
                <InfoBox
                  imgUrl="/images/advantage-3.png"
                  title="Compliance & risk management"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • The certification helps your business ensure it meets
                      industry standards and regulatory requirements for AI,
                      reducing legal and reputational risks. <br />
                      <br />• Demonstrate proactive steps towards aligning with
                      future AI legislation, which could be a competitive
                      advantage as regulations evolve.
                    </p>
                  }
                />

                <InfoBox
                  imgUrl="/images/advantage-4.png"
                  title="Customer confidence"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • Customers are more likely to trust and engage with your
                      business for being transparent about their AI use and
                      ethical standards. <br />
                      <br />• The badge reassures customers that your business
                      prioritises fairness, transparency, and data privacy in
                      its AI operations.
                    </p>
                  }
                />

                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent hidden lg:block"></div>
              </div>

              <div className="pt-[54px] grid lg:grid-cols-2 gap-[120px]">
                <InfoBox
                  imgUrl="/images/advantage-5.png"
                  title="Attracting investment"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • Investors are more inclined to fund businesses that
                      demonstrate a commitment to responsible AI, as it reduces
                      long-term risks.
                    </p>
                  }
                />
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-foreground/10 to-transparent hidden lg:block pointer-events-none"></div>
            </div>
          ) : (
            <div className="relative">
              <div className="relative pb-[54px] grid lg:grid-cols-2 gap-[120px]">
                <InfoBox
                  imgUrl="/images/use-1.png"
                  title="Website and Marketing Materials"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • You can display the badge on your websites, social media
                      profiles, and marketing materials to highlight your
                      certification. <br />
                      <br />• It can be featured in press releases, blog posts,
                      and case studies to amplify your business’s commitment to
                      ethical AI.
                    </p>
                  }
                />

                <InfoBox
                  imgUrl="/images/use-2.png"
                  title="Sales and Client Acquisition"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • You can use the badge in your sales presentations and
                      proposals to differentiate your business from competitors,
                      providing a unique selling point. <br />
                      <br />• Fulfill any requirements in tenders and contracts
                      with clients who prioritize ethical AI practices.
                    </p>
                  }
                />

                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent hidden lg:block"></div>
              </div>

              <div className="relative py-[54px] grid lg:grid-cols-2 gap-[120px]">
                <InfoBox
                  imgUrl="/images/use-3.png"
                  title="Employee Engagement and Recruitment"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • Displaying the badge attracts talent interested in
                      working for companies committed to ethical AI.
                    </p>
                  }
                />

                <InfoBox
                  imgUrl="/images/use-4.png"
                  title="Partnerships and Collaborations"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • Facilitate partnerships with other businesses and
                      organisations that share a commitment to responsible AI.
                    </p>
                  }
                />

                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent hidden lg:block"></div>
              </div>

              <div className="pt-[54px] lg:grid grid-cols-2 gap-[120px]">
                <InfoBox
                  imgUrl="/images/use-5.png"
                  title="Reporting and Compliance Documentation"
                  description={
                    <p className="leading-[170%] text-muted-foreground">
                      • Businesses can include the certification in their annual
                      reports, CSR documents, and compliance filings to
                      demonstrate their commitment to responsible AI. <br />
                      <br /> • By offering our digital badges, our platform not
                      only helps businesses build trust and credibility but also
                      supports the broader goal of fostering a responsible and
                      ethical AI ecosystem in Australia.
                    </p>
                  }
                />
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-foreground/10 to-transparent hidden lg:block pointer-events-none"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
