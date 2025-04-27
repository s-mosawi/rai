import Link from "next/link";
import Image from "next/image";

export default function ContentSection() {
  return (
    <section className="pt-28">
      <div className="mx-auto container px-4 flex flex-col items-center">
        <div className="relative mb-24 w-full max-w-[1100px] aspect-video rounded-3xl overflow-hidden">
          <Image
            src={"/images/articles/2.png"}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <h1 className="mb-14 max-w-[1100px] text-3xl md:text-4xl lg:text-5xl !leading-[115%] font-extrabold text-center">
          Announcing the launch of Responsble.ai™ Australia
        </h1>

        <p className="mb-14 w-full max-w-[1100px] lg:text-lg !leading-[170%] text-muted-foreground">
          We are excited to announce the launch of Responsble.ai™, a platform
          dedicated to certifying Australian businesses for safe, responsible,
          and ethical AI use and development. <br />
          <br />
          With AI changing industries at a rapid pace, one big question is how
          businesses can show they’re using AI responsibly—especially when there
          are no formal AI regulations in Australia yet. Customers want to know
          they can trust AI-powered services, but without clear standards, how
          can businesses prove their AI is as safe and effective as advertised?{" "}
          <br />
          <br />
          That’s where Responsble.ai™ comes in. We offer a certification process
          that helps businesses demonstrate their commitment to ethical AI. By
          certifying with us, companies can provide their customers with the
          confidence that their AI technologies are safe, transparent, and
          working as intended. <br />
          <br /> For businesses, this certification builds trust and sets them
          apart in an increasingly competitive market. For customers, it’s a
          signal that the business prioritizes responsible AI practices and
          transparency. <br />
          <br /> As AI continues to shape the future, Responsble.ai™ is here to
          help Australian businesses lead the way in integrity and trust. We’re
          thrilled to invite you to explore our platform and join us in building
          a future where AI is used safely and ethically for all.
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
