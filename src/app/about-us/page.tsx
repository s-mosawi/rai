import NoticeBar from '@/components/NoticeBar';
import NavigationBar from '@/components/NavigationBar';
import AboutSection from './AboutSection';
import FounderSection from './FounderSection';
import FAQsSection from '@/app/(home)/FAQsSection';
import Footer from '@/components/Footer';
import AdvisorsSection from './AdvisorsSection';

export default function AboutUs() {
  return (
    <>
      <NoticeBar />
      <NavigationBar />

      <main>
        <AboutSection />
        <FounderSection />
        <AdvisorsSection />
        <FAQsSection />
      </main>

      <Footer />
    </>
  );
}
