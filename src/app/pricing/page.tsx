import NoticeBar from "@/components/NoticeBar";
import NavigationBar from "@/components/NavigationBar";
import PricingSection from "./PricingSection";
import FAQsSection from "@/app/(home)/FAQsSection";
import Footer from "@/components/Footer";

export default function Pricing() {
  return (
    <>
      <NoticeBar />
      <NavigationBar />

      <main>
        <PricingSection />
        <FAQsSection />
      </main>

      <Footer />
    </>
  );
}
