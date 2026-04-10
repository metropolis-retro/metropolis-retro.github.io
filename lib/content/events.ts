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
    slug: "monday-breakfast-creek-hotel",
    title: "Monday Breakfast Creek Hotel Chess and Cards Meetup",
    category: "Weekly Meetup",
    description: "Casual and competitive chess and card games in Albion at the world famous Breakfast Creek Hotel with boards, card decks, clocks and friendly pairings.",
    image: "/images/gallery/thirteenth-event.jpeg",
    tags: ["Breakfast Creek Hotel", "Albion", "All Levels", "Card Games", "OTB"],
    format: "Casual + Rated Practice",
    time: "Every Monday, 5:00 PM",
    location: "Breakfast Creek Hotel Albion",
    note: "Bring your set if you can. Clocks available for timed games. Free stickers to give away. Extra batteries, pens and pencils available." +
        " We normally have table 8 booked in the beer garden.",
  },
  {
    id: 2,
    slug: "friday-cbd-meetup",
    title: "Friday CBD Chess And Technology Workshop",
    category: "Weekly Meetup",
    description: "Casual and competitive chess games in Brisbane CBD with clocks, boards, and friendly pairings. Let us talk about GitHub, open-source and Chess960",
    image: "/images/gallery/brisbane-cbd.jpg",
    tags: ["Brisbane CBD", "All Levels", "GitHub", "OTB", "Chess960"],
    format: "Casual + Rated Practice",
    time: "Every Friday, 1:30 PM",
    location: "Brisbane CBD",
    note: "Bring your set if you can. Clocks available for timed games. Tell us about your favorite GitHub repository.",
  }
];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug)
}
