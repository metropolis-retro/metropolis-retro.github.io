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
    excerpt: "What to bring, how pairings work, and how to get the most out of your first Metropolis Retro event.",
    image: "/images/gallery/twelfth-event.png",
    date: "Mar 30, 2026",
    readTime: "2 min read",
    content:
      "For your first meetup, bring a chess set if available, arrive 5 minutes early, and let organizers know your level so pairings can be calibrated. The goal is to make your first event smooth, social, and productive.",
  },
  {
    id: 2,
    slug: "risk-strategy-board-game",
    title: "Betrayal. Alliances. Surprise Attacks.",
    excerpt: "When it comes to taking over the world, it's all about who is willing to take the biggest RISK.",
    image: "/images/gallery/risk-boardgame.jpeg",
    date: "Mar 15, 2026",
    readTime: "3 min read",
    content:
      "Risk is a classic strategy board game of diplomacy, conflict, and conquest where 2-6 players aim to dominate the world by occupying all 42 territories across six continents. Players command armies to attack" +
        " neighboring territories, with combat determined by dice rolls. The ultimate goal is to eliminate opponents, often by completing secret missions." +
        " We are ready for future strategic events with games like Catan, Harmegedo, Quaternity and Risk in our catalogue",
  },
  {
    id: 3,
    slug: "brisbane-event-schedule-update",
    title: "Brisbane event schedule and upcoming dates",
    excerpt: "See the latest calendar for our meetups, workshops, and club events.",
    image: "/images/gallery/build-create-think.png",
    date: "Feb 21, 2026",
    readTime: "2 min read",
    content:
      "The current event rhythm includes Monday night beginner social club workshops, Friday CBD lunchtime technology events, and monthly online chess simuls. A chess" +
        " simul (simultaneous exhibition) is an event where one strong player (often a Master) plays multiple games at once against several opponents.",
  },
    /*
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
     */
];

export function getUpdateBySlug(slug: string) {
  return updates.find((update) => update.slug === slug)
}
