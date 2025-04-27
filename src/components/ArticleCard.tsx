import Link from "next/link";
import Image from "next/image";

export interface IArticleCard {
  slug: string;
  imgUrl: string;
  title: string;
  label: string;
  timestamp: string;
}

export default function ArticleCard({
  slug,
  imgUrl,
  title,
  label,
  timestamp,
}: IArticleCard) {
  return (
    <Link href={`/news/${slug}`}>
      <div className="relative mb-6 w-full aspect-video rounded-3xl overflow-hidden">
        <Image src={imgUrl} alt="" fill className="object-cover" />
      </div>

      <p className="mb-3 text-sm text-muted-foreground">{label}</p>

      <h3 className="text-lg leading-[145%] font-semibold">{title}</h3>

      <p className="mt-3 text-sm text-muted-foreground">{timestamp}</p>
    </Link>
  );
}
