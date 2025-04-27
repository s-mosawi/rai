import NoticeBar from "@/components/NoticeBar";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import BusinessesSection from "./BusinessesSection";

export default function Businesses() {
  return (
    <>
      <NoticeBar />
      <NavigationBar />

      <main>
        <BusinessesSection />
      </main>

      <Footer />
    </>
  );
}
