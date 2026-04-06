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
    description: "Catan and other board games at our community gatherings",
    imageUrl: "/images/gallery/catan.jpg",
    aspect: "portrait",
    category: "community",
  },
  {
    id: "2",
    title: "Hot Pink versus Green",
    description: "The Breakfast Creek Hotel Since 1889",
    imageUrl: "/images/gallery/chess.jpg",
    aspect: "landscape",
    category: "events",
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
    aspect: "wide",
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
    description: "Second game final position at our inaugural event",
    imageUrl: "/images/gallery/first-event-second-game.jpg",
    aspect: "wide",
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
    title: "Early Setup",
    description: "Setting up early one day at the hotel",
    imageUrl: "/images/gallery/early-setup.jpg",
    aspect: "portrait",
    category: "events",
  },
  {
    id: "11",
    title: "The Big Issue",
    description: "We support The Big Issue",
    imageUrl: "/images/gallery/the-big-issue.jpg",
    aspect: "wide",
    category: "community",
  },
  {
    id: "12",
    title: "Twelfth Event",
    description: "Table 8 in the beer garden is our regular Monday night hangout",
    imageUrl: "/images/gallery/twelfth-event.png",
    aspect: "wide",
    category: "events",
  },
  {
    id: "13",
    title: "Build Create Think",
    description: "144 square 2-player experiments",
    imageUrl: "/images/gallery/build-create-think.png",
    aspect: "portrait",
    category: "community",
  },

]

export const galleryCategories = Array.from(new Set(galleryImages.map((img) => img.category).filter(Boolean))) as string[]

export function getGalleryImagesByCategory(category: string) {
  return galleryImages.filter((img) => img.category === category)
}
