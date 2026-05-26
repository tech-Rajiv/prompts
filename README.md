# PromptForYou

A modern Gen-Z AI prompt database — trending image filters, effects, and YouTube thumbnail prompts. Built with Next.js 14 (App Router, static export).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

Static files will be output to the `out/` folder — ready to deploy to Vercel, Netlify, or any static host.

## Deploy to Vercel (recommended)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import project
3. Vercel auto-detects Next.js — just click Deploy

## Project Structure

```
src/
  app/
    layout.tsx       # Root layout + metadata (SEO)
    page.tsx         # Main page — assembles all sections
  components/
    Navbar.tsx       # Fixed nav with YT Thumbnails NEW badge
    Hero.tsx         # Hero section with stats
    TrendingSection  # Trending cards + All prompts with filter
    PromptCard.tsx   # Hover-to-reveal prompt card
    YTSection.tsx    # YouTube Thumbnail studio section
    HowItWorks.tsx   # 3-step explainer + terminal mockup
    About.tsx        # About / value props
    Contact.tsx      # Submit a prompt form
    Footer.tsx
  data/
    prompts.ts       # All prompt data — add more here!
  styles/
    globals.css      # Global CSS variables + grid background
```

## Adding More Prompts

Open `src/data/prompts.ts` and add to the `prompts` array:

```ts
{
  id: 9,
  title: 'My New Filter',
  tool: 'Midjourney',
  category: 'Portrait',   // must match a value in `categories` array
  trending: true,
  prompt: 'Your full prompt text here...',
  before: 'Before label',
  after: 'After label',
  colorA: '#0a0e1f',      // before-side bg color
  colorB: '#050d1a',      // after-side bg color
  accentA: '#00f5c4',     // before-side accent
  accentB: '#bf5fff',     // after-side accent
}
```

For YouTube thumbnails, add to the `ytPrompts` array similarly.
