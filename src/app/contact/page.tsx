import NoticeBar from "@/components/NoticeBar";
import NavigationBar from "@/components/NavigationBar";
import FormSection from "./FormSection";
import FAQsSection from "@/app/(home)/FAQsSection";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <NoticeBar />
      <NavigationBar />

      <main>
        <FormSection />
        <FAQsSection />
      </main>

      <Footer />
    </>
  );
}
