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
    title: "C.O.O.L. Chess",
    description: "Chess literature from our club library collection",
    imageUrl: "/images/gallery/cool-chess.jpg",
    aspect: "portrait",
    category: "community",
  },
  {
    id: "3",
    title: "Hot Pink versus Green",
    description: "The Breakfast Creek Hotel Since 1889",
    imageUrl: "/images/gallery/chess.jpg",
    aspect: "wide",
    category: "events",
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
    title: "The Big Issue",
    description: "We support The Big Issue",
    imageUrl: "/images/gallery/the-big-issue.jpg",
    aspect: "wide",
    category: "community",
  },
  {
    id: "11",
    title: "Twelfth Event",
    description: "Table 8 in the beer garden is our regular Monday night hangout",
    imageUrl: "/images/gallery/twelfth-event.png",
    aspect: "wide",
    category: "events",
  },
  {
    id: "12",
    title: "Early Setup",
    description: "Setting up early one day at the hotel",
    imageUrl: "/images/gallery/early-setup.jpg",
    aspect: "portrait",
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
  {
    id: "14",
    title: "Trivial Pursuit Mini Card Packs",
    description: "Quick-play trivia packed with the decades biggest events, trends, fads, entertainment, and more!",
    imageUrl: "/images/gallery/trivial-pursuit-mini-packs-front.jpeg",
    aspect: "landscape",
    category: "events",
  },
  {
    id: "15",
    title: "Free Stickers",
    description: "We regularly give away free stickers at events!",
    imageUrl: "/images/gallery/free-stickers.png",
    aspect: "landscape",
    category: "community",
  },
  {
    id: "16",
    title: "Waddingtons OF LONDON",
    description: "A storied British brand, synonymous with high-quality playing cards since they first entered the market in 1922. Best known for their Waddingtons Number 1 series",
    imageUrl: "/images/gallery/waddingtons-of-london-playing-cards.jpeg",
    aspect: "wide",
    category: "events",
  },
  {
    id: "17",
    title: "LEAP® PQ9907S",
    description: "Digital Chess Timer with delay and bonus",
    imageUrl: "/images/gallery/LEAP-PQ9907S.jpeg",
    aspect: "landscape",
    category: "events",
  },
  {
    id: "18",
    title: "FIVE CROWNS",
    description: "The five-suited rummy-style card game",
    imageUrl: "/images/gallery/five-crowns-front.jpeg",
    aspect: "landscape",
    category: "events",
  },
]

export const galleryCategories = Array.from(new Set(galleryImages.map((img) => img.category).filter(Boolean))) as string[]

export function getGalleryImagesByCategory(category: string) {
  return galleryImages.filter((img) => img.category === category)
}
