import NoticeBar from "@/components/NoticeBar";
import NavigationBar from "@/components/NavigationBar";
import ArticlesSection from "./ArticlesSection";
import Footer from "@/components/Footer";

export default function News() {
  return (
    <>
      <NoticeBar />
      <NavigationBar />

      <main>
        <ArticlesSection />
      </main>

      <Footer />
    </>
  );
}
