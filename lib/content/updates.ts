export type UpdateItem = {
  id: number
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  content: string
}

export const updates: UpdateItem[] = [
  {
    id: 1,
    slug: "first-club-meetup-prep-guide",
    title: "How to prepare for your first club meetup",
    excerpt: "What to bring, how pairings work, and how to get the most out of your first Metropolis Retro night.",
    image: "/images/bg-1.png",
    date: "Mar 10, 2026",
    readTime: "4 min read",
    content:
      "For your first meetup, bring a chess set if available, arrive 15 minutes early, and let organizers know your level so pairings can be calibrated. The goal is to make your first night smooth, social, and productive.",
  },
  {
    id: 2,
    slug: "rapid-vs-classical-guide",
    title: "Rapid vs classical: which format suits you?",
    excerpt: "A simple guide to choosing the right time control for your goals and current playing level.",
    image: "/images/bg-2.png",
    date: "Mar 02, 2026",
    readTime: "5 min read",
    content:
      "Rapid helps with decision-making speed and practical pattern recognition. Classical supports deeper calculation and strategic planning. Most members improve fastest by combining both across weekly sessions.",
  },
  {
    id: 3,
    slug: "brisbane-event-schedule-update",
    title: "Brisbane event schedule and upcoming dates",
    excerpt: "See the latest calendar for our meetups, workshops, and club tournament events.",
    image: "/images/bg-3.png",
    date: "Feb 21, 2026",
    readTime: "3 min read",
    content:
      "The current event rhythm includes Wednesday beginner workshops, Thursday CBD meetup nights, and Saturday rapid arena sessions. Seasonal open tournament dates are announced in advance through updates.",
  },
  {
    id: 4,
    slug: "pairing-flow-improvements",
    title: "Pairing format improvements",
    excerpt: "We refined pairing flow to reduce downtime and improve round transitions during busy nights.",
    image: "/images/bg-2.png",
    date: "Mar 12, 2026",
    readTime: "4 min read",
    content:
      "We updated pairing flow to reduce start delays during peak attendance and improve fairness across mixed rating groups.",
  },
];

export function getUpdateBySlug(slug: string) {
  return updates.find((update) => update.slug === slug)
}
