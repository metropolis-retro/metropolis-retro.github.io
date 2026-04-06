export type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  coverImage: string
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  author: string
  content: {
    heading: string
    paragraphs: string[]
  }[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "how-to-improve-between-club-nights",
    title: "How to improve between club nights",
    excerpt:
      "A practical weekly routine to turn casual games into steady rating and decision-making improvement.",
    coverImage: "/images/",
    publishedAt: "2026-03-10",
    readTime: "6 min read",
    category: "Training",
    tags: ["Improvement", "Study Plan", "Club Players"],
    author: "Metropolis Retro Coaching Team",
    content: [
      {
        heading: "Use one clear weekly focus",
        paragraphs: [
          "Most players stall because they try to fix everything at once. Choose one theme each week, such as tactical vision, time management, or endgame conversion.",
          "A narrow focus makes your review sessions meaningful and easier to measure when you return for your next meetup.",
        ],
      },
      {
        heading: "Review your own games first",
        paragraphs: [
          "Before opening an engine, write down where you felt uncertain and what alternatives you considered. This captures your decision process.",
          "Engine checks are more valuable after your own analysis because they reveal thinking gaps instead of only showing move differences.",
        ],
      },
      {
        heading: "Build a two-session training cycle",
        paragraphs: [
          "Session one: solve 15 to 20 tactical puzzles and annotate one game. Session two: play two rapid games and compare outcomes against your focus area.",
          "This loop creates consistent progress without requiring heavy daily study time.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "rapid-time-management-for-club-events",
    title: "Rapid time management for club events",
    excerpt:
      "Simple decision rules to avoid clock collapses and finish your games with more practical chances.",
    coverImage: "/images/",
    publishedAt: "2026-03-14",
    readTime: "5 min read",
    category: "Competition",
    tags: ["Rapid", "Time Management", "Tournament Prep"],
    author: "Metropolis Retro Tournament Desk",
    content: [
      {
        heading: "Budget your time by phase",
        paragraphs: [
          "In rapid formats, allocate most of your deep thinks to critical middlegame moments, not familiar opening moves.",
          "Entering move 20 with enough clock lets you convert better positions and defend worse ones more resourcefully.",
        ],
      },
      {
        heading: "Use the 20-second checkpoint",
        paragraphs: [
          "When you feel stuck, force a quick candidate scan at 20 seconds: checks, captures, and threats. Then decide if the position deserves extra time.",
          "This keeps your clock moving while still preventing one-move blunders.",
        ],
      },
      {
        heading: "Practice with realistic constraints",
        paragraphs: [
          "Training with the same time control as club events improves practical instincts faster than unlimited analysis games.",
          "Replicate event conditions once or twice per week to normalize pressure.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "opening-repertoire-for-busy-players",
    title: "Opening repertoire for busy players",
    excerpt:
      "How to choose compact opening systems that are easier to remember and useful across many club pairings.",
    coverImage: "/images/",
    publishedAt: "2026-03-18",
    readTime: "7 min read",
    category: "Openings",
    tags: ["Openings", "Repertoire", "Beginner Friendly"],
    author: "Metropolis Retro Analysis Group",
    content: [
      {
        heading: "Prefer structures over memorization",
        paragraphs: [
          "For most club players, understanding pawn structures and piece plans gives better long-term results than memorizing long tactical lines.",
          "Choose openings that repeatedly lead to positions you understand.",
        ],
      },
      {
        heading: "Use one core system per color",
        paragraphs: [
          "A compact repertoire reduces pre-game stress and post-game confusion. Keep one primary setup as White and one versus 1.e4 and 1.d4 as Black.",
          "Consistency creates stronger pattern recall during practical play.",
        ],
      },
      {
        heading: "Track recurring mistakes",
        paragraphs: [
          "After each meetup, note one opening decision that cost time or position quality. Add a short correction note to your repertoire file.",
          "Small corrections across several weeks produce measurable gains.",
        ],
      },
    ],
  },
    /*
  {
    id: 4,
    slug: "building-confidence-for-your-first-tournament",
    title: "Building confidence for your first tournament",
    excerpt:
      "A calm, realistic preparation checklist for players entering their first rated event.",
    coverImage: "/images/bg-2.png",
    publishedAt: "2026-03-22",
    readTime: "5 min read",
    category: "Mindset",
    tags: ["Tournament", "Mindset", "Beginners"],
    author: "Metropolis Retro Community Team",
    content: [
      {
        heading: "Define success beyond result",
        paragraphs: [
          "Your first tournament should prioritize process goals: time usage, move quality, and emotional control. Rating outcomes follow over time.",
          "Process goals reduce pressure and improve post-event learning.",
        ],
      },
      {
        heading: "Prepare your event routine",
        paragraphs: [
          "Pack essentials the night before, arrive early, and establish a warm-up pattern with a few tactical exercises.",
          "A repeatable routine gives stability when competitive stress rises.",
        ],
      },
      {
        heading: "Review with intention",
        paragraphs: [
          "After the event, analyze one win and one loss in detail. Focus on turning points and practical decisions, not only tactical misses.",
          "This balanced review keeps confidence high while still accelerating growth.",
        ],
      },
    ],
  },
     */
]

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export const blogCategories = Array.from(new Set(blogPosts.map((post) => post.category))).sort()

export const blogTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort()

export function slugifyBlogTaxonomy(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

export function getBlogCategoryBySlug(slug: string) {
  return blogCategories.find((category) => slugifyBlogTaxonomy(category) === slug)
}

export function getBlogTagBySlug(slug: string) {
  return blogTags.find((tag) => slugifyBlogTaxonomy(tag) === slug)
}

export function getBlogPostsByCategory(category: string) {
  return blogPosts.filter((post) => post.category === category)
}

export function getBlogPostsByTag(tag: string) {
  return blogPosts.filter((post) => post.tags.includes(tag))
}
