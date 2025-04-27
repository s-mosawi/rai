import NoticeBar from "@/components/NoticeBar";
import NavigationBar from "@/components/NavigationBar";
import HeroSection from "./HeroSection";
import WhySection from "./WhySection";
import StepsSection from "./StepsSection";
import FAQsSection from "./FAQsSection";
import Footer from "@/components/Footer";
import BadgesSection from "./BadgesSection";
// import CertifiedBusinessSection from './CertifiedBusinessSection';

export default function Home() {
  return (
    <>
      <NoticeBar />
      <NavigationBar />

      <main>
        <HeroSection />

        <section className="pt-28 pb-10">
          <div className="mx-auto container px-4 flex flex-col items-center">
            <h2 className="mb-8 text-3xl lg:text-4xl !leading-[115%] font-bold text-center">
              Get certified. <br className="block md:hidden" /> Stay ahead.{" "}
              <br />
              <span className="text-primary">Provide confidence.</span>
            </h2>

            <p className="lg:text-lg leading-[170%] text-center text-muted-foreground">
              Get certified to ensure compliance with the future AI Act, stay
              ahead of evolving <br /> standards, and provide confidence to your
              customers through ethical AI practices.
            </p>
          </div>
        </section>
        {/* <CertifiedBusinessSection /> */}

        <BadgesSection />

        <WhySection />

        <StepsSection />

        <FAQsSection />
      </main>

      <Footer />
    </>
  );
}
