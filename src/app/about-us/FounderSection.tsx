import Image from "next/image";
import Link from "next/link";

export default function FounderSection() {
  return (
    <section className="pt-28 pb-10 lg:pb-28">
      <div className="mx-auto container px-4 flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full max-w-[300px] lg:max-w-[400px] flex flex-col items-center">
          <Image
            src={"/images/founder.png"}
            alt=""
            width={300}
            height={300}
            className="w-[220px] lg:w-[300px] h-[220px] lg:h-[300px] object-cover"
          />

          <div className="w-full py-6 px-10 bg-primary rounded-t-xl lg:rounded-xl flex flex-col items-center">
            <h3 className="mb-1 text-xl lg:text-2xl font-semibold text-center text-white">
              Syed Mosawi
            </h3>

            <p className="mb-4 text-center text-white">Founder & CEO</p>

            <Link
              href={"https://www.linkedin.com/in/syedmosawi/"}
              target="_blank"
              className="flex"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-auto"
              >
                <path
                  d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4062 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4062 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39062 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39062 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="lg:-ml-[50px] max-w-[680px] p-14 lg:p-20 lg:pl-36 bg-primary/5 rounded-2xl">
          <h3 className="mb-10 text-3xl lg:text-4xl font-extrabold text-primary">
            Meet the Founder
          </h3>

          <p className="leading-[170%]">
            Syed Mosawi is a passionate innovator at the intersection of AI,
            science, and intellectual property. With a unique blend of
            multidisciplinary scientific expertise and a deep understanding of
            IP law, he excels in crafting novel solutions by converging diverse
            fields. His enthusiasm for exploring new technologies and
            anticipating future regulations fuels his drive to lead
            transformative projects. <br />
            <br /> A proactive problem-solver and strategic thinker, Syed
            thrives on overcoming challenges and spearheading impactful
            initiatives. He values the power of networking and enjoys connecting
            with other professionals to exchange ideas and inspire new
            possibilities. Dedicated to advancing responsible AI development,
            Syed is committed to shaping the future of technology with
            creativity and insight.
          </p>
        </div>
      </div>
    </section>
  );
}
