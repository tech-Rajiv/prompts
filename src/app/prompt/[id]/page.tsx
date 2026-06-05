import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PromptDetail from '@/components/PromptDetail';
import { getPromptById, prompts } from '@/data/prompts';

interface Params {
  params: { id: string };
}

// Pre-render a detail page for every prompt in the static library.
export function generateStaticParams() {
  return prompts.map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }: Params): Metadata {
  const prompt = getPromptById(Number(params.id));
  if (!prompt) return { title: 'Prompt not found — PromptForYou' };

  return {
    title: `${prompt.title} — ${prompt.tool} Prompt | PromptForYou`,
    description: prompt.prompt.slice(0, 155),
  };
}

export default function PromptDetailPage({ params }: Params) {
  const prompt = getPromptById(Number(params.id));
  if (!prompt) notFound();

  return (
    <>
      <Navbar />
      <main>
        <PromptDetail prompt={prompt} />
      </main>
      <Footer />
    </>
  );
}
