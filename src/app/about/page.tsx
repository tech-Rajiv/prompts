import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import AboutPage from '@/components/Aboutpage';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About — PromptForYou',
  description:
    'Learn about PromptForYou — a side project built to share AI image prompts with credit and context.',
};

export default function AboutRoute() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <Footer />
    </>
  );
}
