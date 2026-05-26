export type PromptBadge = 'trending' | 'popular' | 'editors-pick' | 'premium';

export type Prompt = {
  id: number;
  title: string;
  tool: string;
  category: string;
  badge: PromptBadge;
  trending: boolean;
  prompt: string;
  before: string;
  after: string;
  colorA: string;
  colorB: string;
  accentA: string;
  accentB: string;
};

export type YTPrompt = {
  id: string;
  title: string;
  niche: string;
  tool: string;
  result: string;
  prompt: string;
  beforeBg: string;
  afterBg: string;
  afterAccent: string;
  faceColor: string;
  titleText: string;
  bgPattern: string;
};

export const prompts: Prompt[] = [
  {
    id: 1,
    title: 'Cyberpunk Portrait',
    tool: 'Midjourney',
    category: 'Portrait',
    badge: 'trending',
    trending: true,
    prompt:
      'Cinematic cyberpunk portrait, neon rim lighting, rain bokeh, holographic tattoos, dark street background, 8k hyperrealistic, --ar 2:3 --style raw --v 6',
    before: 'Original Photo',
    after: 'Cyberpunk Edit',
    colorA: '#0a0e1f',
    colorB: '#050d1a',
    accentA: '#00f5c4',
    accentB: '#bf5fff',
  },
  {
    id: 2,
    title: 'Anime Filter',
    tool: 'DALL·E 3',
    category: 'Style Transfer',
    badge: 'trending',
    trending: true,
    prompt:
      'Convert to anime art style, Studio Ghibli inspired, soft watercolor textures, dreamy sky background, warm golden hour lighting, highly detailed illustration',
    before: 'Real Photo',
    after: 'Anime Style',
    colorA: '#120a1a',
    colorB: '#0d1220',
    accentA: '#bf5fff',
    accentB: '#ff4ecd',
  },
  {
    id: 3,
    title: 'Y2K Glitch',
    tool: 'Stable Diffusion',
    category: 'Glitch Art',
    badge: 'popular',
    trending: false,
    prompt:
      'Y2K aesthetic glitch art, VHS distortion effect, chromatic aberration, holographic stickers overlay, early 2000s digital aesthetic, pixel corruption artifacts, neon pink and cyan',
    before: 'Modern Photo',
    after: 'Y2K Glitch',
    colorA: '#1a0a0f',
    colorB: '#0a0e1a',
    accentA: '#ff4ecd',
    accentB: '#00f5c4',
  },
  {
    id: 4,
    title: 'Neon Deity',
    tool: 'Midjourney',
    category: 'Concept Art',
    badge: 'editors-pick',
    trending: false,
    prompt:
      'Ancient deity reimagined in neon light sculpture, floating in void, sacred geometry, bioluminescent patterns, ultra-detailed, cinematic, --ar 1:1 --style expressive --chaos 20',
    before: 'Concept Sketch',
    after: 'Neon Deity',
    colorA: '#08120a',
    colorB: '#0a0e1a',
    accentA: '#00f5c4',
    accentB: '#bf5fff',
  },
  {
    id: 5,
    title: 'Liquid Chrome',
    tool: 'Adobe Firefly',
    category: 'Abstract',
    badge: 'premium',
    trending: false,
    prompt:
      'Liquid mercury portrait, chrome skin texture, reflective surface, dramatic studio lighting, high contrast black background, hyperrealistic 3D render, octane render quality',
    before: 'Portrait',
    after: 'Chrome Effect',
    colorA: '#0e0e12',
    colorB: '#141420',
    accentA: '#8892b0',
    accentB: '#00f5c4',
  },
  {
    id: 6,
    title: 'Vaporwave Dream',
    tool: 'Midjourney',
    category: 'Style Transfer',
    badge: 'trending',
    trending: true,
    prompt:
      'Vaporwave aesthetic portrait, pink and purple gradient sky, retro grid floor, palm trees silhouette, roman bust statue, lo-fi grain texture, 80s retro futurism, --ar 1:1 --v 6',
    before: 'Photo',
    after: 'Vaporwave',
    colorA: '#1a0a18',
    colorB: '#0e0820',
    accentA: '#ff4ecd',
    accentB: '#bf5fff',
  },
  {
    id: 7,
    title: 'Dark Academia',
    tool: 'DALL·E 3',
    category: 'Portrait',
    badge: 'premium',
    trending: false,
    prompt:
      'Dark academia aesthetic portrait, moody library background, candlelight, vintage oil painting texture, muted earth tones, classical composition, introspective mood, highly detailed',
    before: 'Casual Photo',
    after: 'Dark Academia',
    colorA: '#120e08',
    colorB: '#0e0a08',
    accentA: '#c8a87a',
    accentB: '#8892b0',
  },
  {
    id: 8,
    title: 'Biopunk Creature',
    tool: 'Stable Diffusion',
    category: 'Concept Art',
    badge: 'premium',
    trending: false,
    prompt:
      'Biopunk creature design, organic cybernetic hybrid, bioluminescent veins, translucent skin revealing mechanical parts, dark wet environment, cinematic horror lighting, ultra detailed, artstation trending',
    before: 'Sketch',
    after: 'Biopunk',
    colorA: '#081208',
    colorB: '#050e10',
    accentA: '#00ff88',
    accentB: '#00aaff',
  },
];

export const ytPrompts: YTPrompt[] = [
  {
    id: 'yt1',
    title: 'Shocked Reaction',
    niche: 'Reaction / Commentary',
    tool: 'ChatGPT / DALL·E',
    result: '3.2x more clicks',
    prompt:
      "Professional YouTube thumbnail, person with shocked open-mouth expression, bold yellow text overlay reading 'I CAN'T BELIEVE THIS', dramatic gradient background red to black, bright studio lighting, high contrast, 16:9 aspect ratio, ultra sharp",
    beforeBg: '#1a1008',
    afterBg: '#1a0808',
    afterAccent: '#ff4444',
    faceColor: '#ffcc88',
    titleText: "I CAN'T BELIEVE THIS",
    bgPattern: 'radial-gradient(ellipse at 70% 50%, rgba(255,34,0,0.2) 0%, #1a0808 60%)',
  },
  {
    id: 'yt2',
    title: 'Finance / Money Hook',
    niche: 'Finance & Business',
    tool: 'Midjourney',
    result: 'Top 5% CTR',
    prompt:
      "YouTube thumbnail for finance video, person in sharp suit holding fanned cash, dark luxury background, gold accent lighting, cinematic lens flare, bold green '$10,000 in 30 Days' text overlay, professional grading, ultra detailed, --ar 16:9",
    beforeBg: '#0a1208',
    afterBg: '#080e08',
    afterAccent: '#00ff88',
    faceColor: '#d4a876',
    titleText: '$10K in 30 Days',
    bgPattern: 'radial-gradient(ellipse at 30% 50%, rgba(0,255,136,0.13) 0%, #080e08 60%)',
  },
  {
    id: 'yt3',
    title: 'Tech / AI Reveal',
    niche: 'Tech & Tutorials',
    tool: 'Adobe Firefly',
    result: '2.8x avg CTR',
    prompt:
      "YouTube thumbnail tech style, futuristic AI robot face emerging from digital void, glowing blue circuit patterns, bold white sans-serif text 'The AI That Changes Everything', dark background, dramatic volumetric lighting, 16:9 cinematic",
    beforeBg: '#08101a',
    afterBg: '#060d1a',
    afterAccent: '#00aaff',
    faceColor: '#88ccff',
    titleText: 'AI Changes Everything',
    bgPattern: 'radial-gradient(ellipse at 50% 40%, rgba(0,102,255,0.13) 0%, #060d1a 65%)',
  },
  {
    id: 'yt4',
    title: 'Gaming Hype',
    niche: 'Gaming',
    tool: 'Stable Diffusion',
    result: 'Top 10% Gaming',
    prompt:
      "Epic gaming YouTube thumbnail, player character in dramatic action pose, explosion debris particles flying, neon orange and purple color grade, bold chunky text '1 vs 100 WINS', dark moody atmosphere, cinematic composition, hyper detailed, 16:9",
    beforeBg: '#12080a',
    afterBg: '#0e0818',
    afterAccent: '#bf5fff',
    faceColor: '#ffaa66',
    titleText: '1 vs 100 WINS',
    bgPattern: 'radial-gradient(ellipse at 60% 50%, rgba(136,0,255,0.13) 0%, #0e0818 60%)',
  },
];

export const filterCategories = ['All', 'Trending', 'Popular', "Editor's Pick", 'Premium'] as const;

export const BADGE_LABELS: Record<PromptBadge, string> = {
  trending: '🔥 Trending',
  popular: '⭐ Popular',
  'editors-pick': "✦ Editor's Pick",
  premium: '👑 Premium',
};

export type SortOption = 'recent' | 'most-liked' | 'most-commented' | 'oldest' | 'title-az';

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Recently Added' },
  { value: 'most-liked', label: 'Most Liked' },
  { value: 'most-commented', label: 'Most Commented' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title-az', label: 'Title A–Z' },
];

const MOCK_LIKES = ['2.4k', '1.8k', '956', '3.1k', '427', '2k', '1.2k', '640', '890'];
const MOCK_COMMENTS = ['186', '94', '2k', '52', '310', '88', '145', '402', '67'];

function parseEngagementCount(value: string): number {
  const v = value.trim().toLowerCase();
  if (v.endsWith('k')) return parseFloat(v) * 1000;
  return parseFloat(v) || 0;
}

export function getPromptEngagement(id: number) {
  const i = (id - 1) % MOCK_LIKES.length;
  return {
    likes: parseEngagementCount(MOCK_LIKES[i]),
    comments: parseEngagementCount(MOCK_COMMENTS[i]),
  };
}

export function sortPrompts(list: Prompt[], sortBy: SortOption): Prompt[] {
  const sorted = [...list];
  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => b.id - a.id);
    case 'oldest':
      return sorted.sort((a, b) => a.id - b.id);
    case 'most-liked':
      return sorted.sort(
        (a, b) => getPromptEngagement(b.id).likes - getPromptEngagement(a.id).likes,
      );
    case 'most-commented':
      return sorted.sort(
        (a, b) => getPromptEngagement(b.id).comments - getPromptEngagement(a.id).comments,
      );
    case 'title-az':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}
