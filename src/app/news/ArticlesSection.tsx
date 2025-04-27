import { IArticleCard } from "@/components/ArticleCard";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlesSection() {
  const articles: IArticleCard[] = [
    {
      slug: "launch",
      imgUrl: "/images/articles/2.png",
      title: "Announcing the launch of Responsble.ai™ Australia",
      label: "Others",
      timestamp: "Sep 26, 2024  •  1 min read",
    },
    {
      slug: "what-do-australian-trade-marks-domain-extension-ai-and-anguilla-have-in-common",
      imgUrl: "/images/articles/1.png",
      title:
        "What Do Australian Trade Marks, Domain Extension .AI, and Anguilla Have in Common?",
      label: "Artificial intelligence",
      timestamp: "Sep 15, 2024  •  4 min read",
    },
  ];

  return (
    <section className="pt-28">
      <div className="mx-auto container px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <h1 className="text-3xl !leading-[115%] font-bold text-center lg:text-left">
            Latest news on{" "}
            <span className="text-primary">Artificial Intelligence</span>
          </h1>

          <div className="w-full max-w-[420px] h-[54px] px-5 bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-xl flex items-center gap-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                stroke="#97909D"
                stroke-opacity="0.75"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <input
              type="text"
              placeholder="Search for news..."
              className="flex-1"
            />
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 2xl:grid-cols-3 gap-12">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
