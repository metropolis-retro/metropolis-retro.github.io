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
    coverImage: "/images/gallery/books.png",
    publishedAt: "2026-04-07",
    readTime: "2 min read",
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
        heading: "Build a two-session training cycle",
        paragraphs: [
          "Session one: solve 10 to 15 tactical puzzles and annotate one game. Session two: play two blitz games and compare outcomes against your focus area.",
          "This loop creates consistent progress without requiring heavy daily study time.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "card-games-for-club-events",
    title: "Card games for club events",
    excerpt:
      "Master the most popular card games for all ages.",
    coverImage: "/images/gallery/five-crowns-front.jpeg",
    publishedAt: "2026-04-03",
    readTime: "3 min read",
    category: "Social",
    tags: ["Luck", "Strategy", "Trivia"],
    author: "Metropolis Retro Social Desk",
    content: [
      {
        heading: "Classic and modern card games for all ages",
        paragraphs: [
          "UNO Show ’Em No Mercy is a high-stakes version of the classic featuring 56 extra cards, including" +
          " a \"Wild Draw 10\" and a rule that eliminates anyone holding 25 cards. Five Crowns is a five-suited" +
          " rummy-style game where the wild cards change every round, challenging players to build sets and runs over" +
          " eleven levels. Trivial Pursuit Mini Packs offer a portable, board-free experience with 240 questions" +
          " usually themed by specific decades like the 80s or 90s. Classic Card Games refer to traditional favorites" +
          " played with a standard deck, such as Rummy, Spades, or Poker, which focus on matching or trick-taking." +
          "While UNO and Five Crowns rely on luck and strategy, Trivial Pursuit tests your knowledge across various" +
          " pop-culture categories. The mini trivia packs are designed for quick wins, requiring only five correct" +
          " answers to finish a match. In contrast, No Mercy allows players to stack penalties, making it much more" +
          " aggressive than a standard game night. Together, these options cater to everyone from competitive" +
          " strategists to trivia buffs looking for travel-friendly entertainment.",
        ],
      },
    ],
  },
    {
        id: 3,
        slug: "chess-clocks-for-club-events",
        title: "Chess clocks for club events",
        excerpt:
            "LEAP® PQ9907S Digital Chess Timer with delay and bonus",
        coverImage: "/images/gallery/LEAP-PQ9907S.jpeg",
        publishedAt: "2026-03-25",
        readTime: "3 min read",
        category: "Training",
        tags: ["Club Players", "Time Management"],
        author: "Metropolis Retro Coaching Team",
        content: [
            {
                heading: "Standardized with LEAP®",
                paragraphs: [
                    "Using the same model and brand of chess clock across a club or tournament ensures operational consistency, meaning players don't have to relearn button layouts between rounds. This uniformity reduces accidental errors during high-pressure time scrambles and creates a level playing field where every board offers the same tactile response and display readability.\n" +
                    "For organizers, a standardized fleet of clocks simplifies tournament setup because the programming sequence is identical for every device. This allows arbiters to resolve disputes or add time penalties much faster, as they are already intimately familiar with the specific interface and menu system of that model.\n" +
                    "The LEAP® PQ9907S is a standout choice for this type of bulk use because it balances professional features with extreme affordability. It supports essential competitive timing modes, including increments and delays, making it suitable for both casual club nights and serious rated matches.\n" +
                    "Players benefit from its user-friendly interface, featuring a large, durable \"seesaw\" button and a memory function that saves the last used settings for instant play. Its lightweight, compact design also makes it highly portable, fitting easily into any standard chess bag for travel or school use.\n" +
                    "Ultimately, while it is more budget-friendly than flagship FIDE-approved models, the LEAP® PQ9907S provides the reliability and customisation needed for modern play. It includes toggleable audible alerts and clear digital displays, making it an ideal \"best value\" option for expanding a chess community."
                ]
            }
        ]
    },
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
