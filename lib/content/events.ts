export type EventItem = {
  id: number
  slug: string
  title: string
  category: string
  description: string
  image: string
  tags: string[]
  format: string
  time: string
  location: string
  note: string
}

export const events: EventItem[] = [
  {
    id: 1,
    slug: "thursday-cbd-meetup",
    title: "Thursday CBD Meetup",
    category: "Weekly Meetup",
    description: "Casual and competitive games in Brisbane CBD with clocks, boards, and friendly pairings.",
    image: "/images/work-onboarding.png",
    tags: ["Brisbane CBD", "All Levels", "OTB"],
    format: "Casual + Rated Practice",
    time: "Every Thursday, 6:30 PM",
    location: "Brisbane CBD",
    note: "Bring your set if you can. Clocks available for timed games.",
  },
  {
    id: 2,
    slug: "saturday-rapid-arena",
    title: "Saturday Rapid Arena",
    category: "Club Event",
    description: "A fast-paced rapid event with Swiss rounds, standings, and post-game analysis.",
    image: "/images/work-fashion.png",
    tags: ["Rapid", "Swiss", "Rated Practice"],
    format: "Swiss Rapid",
    time: "Every Saturday, 2:00 PM",
    location: "Inner Brisbane",
    note: "Fast rounds with standings and short review sessions after play.",
  },
  {
    id: 3,
    slug: "beginner-chess-workshop",
    title: "Beginner Chess Workshop",
    category: "Learning Session",
    description: "Learn core tactics, opening principles, and endgame basics with guided coaching.",
    image: "/images/work-tasks.png",
    tags: ["Beginners", "Coaching", "Practice Games"],
    format: "Workshop + Games",
    time: "Wednesday, 6:00 PM",
    location: "South Brisbane",
    note: "Tactics, opening principles, and guided practical games.",
  },
  {
    id: 4,
    slug: "metropolis-retro-open",
    title: "Metropolis Retro Open",
    category: "Tournament",
    description: "Our signature Brisbane event featuring multiple divisions and club prizes.",
    image: "/images/work-crypto.png",
    tags: ["Classical", "Prizes", "Community"],
    format: "Classical Tournament",
    time: "Seasonal Event",
    location: "Brisbane",
    note: "Multiple divisions and club prizes for standout results.",
  },
];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug)
}
