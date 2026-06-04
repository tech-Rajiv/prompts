import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SubscriptionSection from '@/components/SubscriptionSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Premium — PromptForYou',
  description:
    'Go Premium to copy unlimited prompts and unlock the full premium library. Monthly or yearly plans.',
};

export default function SubscriptionPage() {
  return (
    <>
      <Navbar />
      <main>
        <SubscriptionSection />
      </main>
      <Footer />
    </>
  );
}
