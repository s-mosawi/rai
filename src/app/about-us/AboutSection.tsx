import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="pt-28 pb-10 lg:pb-28">
      <div className="mx-auto container px-4 flex flex-col items-center">
        <h1 className="mb-14 text-4xl lg:text-6xl !leading-[115%] font-extrabold text-center">
          Empowering the Future of AI: <br /> Our Commitment to{" "}
          <span className="text-primary">Excellence and Integrity</span>
        </h1>

        <p className="mb-14 w-full max-w-[880px] lg:text-lg !leading-[170%] text-center text-muted-foreground">
          Welcome to responsble.ai—where ethics meets innovation in the world of
          artificial intelligence (AI). At the forefront of responsible AI
          certification, we are dedicated to ensuring that businesses not only
          meet but exceed the highest standards of ethical AI use. Our platform
          provides digital certifications that validate your commitment to
          transparency, accountibility, and responsible technology development.{" "}
          <br />
          <br />
          Our digital badges are more than mere accolades; they represent a bold
          commitment to transparency, fairness, and safety in AI. Each badge is
          a testament to a company's dedication to doing AI right—making
          technology that's not just smart, but also conscientious. <br />
          <br />
          At{" "}
          <Link href={"/"} className="text-foreground underline">
            responsble.ai
          </Link>
          , we're not just issuing certifications; we're pioneering a movement
          for ethical AI. Join us in championing a future where technology
          serves us all with respect and care. Dive into our world to discover
          how we're reshaping the AI landscape, one badge at a time. <br />
          <br />
          Welcome to responsble.ai—where ethical AI is not just an ideal, but
          our standard of excellence.
        </p>

        <Link
          href={"/sign-up"}
          className="py-3 px-8 border border-transparent hover:border-primary bg-primary hover:bg-transparent rounded-xl text-lg font-medium text-white hover:text-primary duration-200"
        >
          Get certified today!
        </Link>
      </div>
    </section>
  );
}
