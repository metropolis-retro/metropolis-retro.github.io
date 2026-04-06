export interface GalleryImage {
  id: string
  title: string
  description?: string
  imageUrl: string
  aspect: "square" | "portrait" | "landscape" | "wide"
  category?: string
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Board Game Night",
    description: "Catan and other board games at our community gathering",
    imageUrl: "/images/gallery/catan.jpg",
    aspect: "portrait",
    category: "community",
  },
  {
    id: "2",
    title: "Chess in Action",
    description: "Intense over-the-board play at the club",
    imageUrl: "/images/gallery/chess.jpg",
    aspect: "landscape",
    category: "tournaments",
  },
  {
    id: "3",
    title: "C.O.O.L. Chess",
    description: "Chess literature from our club library collection",
    imageUrl: "/images/gallery/cool-chess.jpg",
    aspect: "portrait",
    category: "community",
  },
  {
    id: "4",
    title: "Fifth Event",
    description: "Highlights from our fifth community event",
    imageUrl: "/images/gallery/fifth-event.jpg",
    aspect: "portrait",
    category: "events",
  },
  {
    id: "5",
    title: "First Event — Game One",
    description: "The very first game at our inaugural event",
    imageUrl: "/images/gallery/first-event-first-game.jpg",
    aspect: "landscape",
    category: "events",
  },
  {
    id: "6",
    title: "First Event — Game Two",
    description: "Second game underway at our inaugural event",
    imageUrl: "/images/gallery/first-event-second-game.jpg",
    aspect: "portrait",
    category: "events",
  },
  {
    id: "7",
    title: "Club History",
    description: "A look back at the origins of Metropolis Retro",
    imageUrl: "/images/gallery/history.jpg",
    aspect: "landscape",
    category: "community",
  },
  {
    id: "8",
    title: "Second Event",
    description: "Members gather for our second community event",
    imageUrl: "/images/gallery/second-event.jpg",
    aspect: "wide",
    category: "events",
  },
  {
    id: "9",
    title: "Third Event — Beers in Play",
    description: "Casual games and good times at the third event",
    imageUrl: "/images/gallery/third-event-beers-in-play.jpg",
    aspect: "landscape",
    category: "events",
  },
  {
    id: "10",
    title: "Top Pitfalls",
    description: "Learning from common chess mistakes together",
    imageUrl: "/images/gallery/top-pitfalls.jpg",
    aspect: "portrait",
    category: "training",
  },
  {
    id: "11",
    title: "The Big Issue",
    description: "A memorable moment from the club",
    imageUrl: "/images/gallery/the-big-issue.jpg",
    aspect: "landscape",
    category: "community",
  },
]

export const galleryCategories = Array.from(new Set(galleryImages.map((img) => img.category).filter(Boolean))) as string[]

export function getGalleryImagesByCategory(category: string) {
  return galleryImages.filter((img) => img.category === category)
}
