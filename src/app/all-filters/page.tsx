import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import AllFiltersSection from '@/components/AllFiltersSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'All Filters — PromptForYou',
  description:
    'Browse the complete library of AI image prompts. Filter by tool, style, or effect.',
};

export default function AllFiltersPage() {
  return (
    <>
      <Navbar />
      <main>
        <AllFiltersSection />
      </main>
      <Footer />
    </>
  );
}
