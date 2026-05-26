import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'PromptForYou — AI Image & Thumbnail Prompts',
  description:
    'Every viral AI image edit, trending filter, and YouTube thumbnail prompt. Copy, paste, create. Updated daily.',
  keywords: ['AI prompts', 'image editing prompts', 'YouTube thumbnail prompts', 'Midjourney prompts', 'AI art'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
