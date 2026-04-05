import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"
import { Gamepad2, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Games",
  description:
    "Play retro arcade games in your browser. Classic games built with modern web technologies.",
  keywords: pageKeywords(["retro games", "browser games", "pacman", "arcade games"]),
  alternates: {
    canonical: "/games",
  },
  openGraph: {
    title: `Games | ${TITLE_BASE}`,
    description: "Play retro arcade games in your browser.",
    url: `${SITE_URL}/games`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Games | ${TITLE_BASE}`,
    description: "Play retro arcade games in your browser.",
  },
}

interface GameCard {
  title: string
  description: string
  href: string
  emoji: string
  available: boolean
}

const games: GameCard[] = [
  {
    title: "Pac-Man",
    description: "Navigate the maze, eat all the dots, and avoid the ghosts in this classic arcade game.",
    href: "/games/pacman",
    emoji: "👾",
    available: true,
  },
  {
    title: "Snake",
    description: "Guide the snake to eat food and grow longer without hitting the walls or yourself.",
    href: "#",
    emoji: "🐍",
    available: false,
  },
  {
    title: "Tetris",
    description: "Arrange falling blocks to complete rows and score points in this timeless puzzle game.",
    href: "#",
    emoji: "🧱",
    available: false,
  },
  {
    title: "Space Invaders",
    description: "Defend Earth from waves of descending alien invaders in this retro shooter.",
    href: "#",
    emoji: "👽",
    available: false,
  },
  {
    title: "Breakout",
    description: "Bounce the ball to break all the bricks and clear the board.",
    href: "#",
    emoji: "🏓",
    available: false,
  },
  {
    title: "Pong",
    description: "The original arcade classic. Challenge yourself in this simple yet addictive game.",
    href: "#",
    emoji: "🎾",
    available: false,
  },
]

export default function GamesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-6">
              <Gamepad2 className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm uppercase tracking-wider text-muted-foreground">Arcade</p>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">
              Retro games, right in your browser.
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A growing collection of classic arcade games rebuilt with modern web technologies.
              Pick a game and start playing — no downloads required.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCardItem key={game.title} game={game} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function GameCardItem({ game }: { game: GameCard }) {
  if (!game.available) {
    return (
      <div className="group relative rounded-xl border border-border bg-muted/30 p-6 flex flex-col gap-4 opacity-60 cursor-not-allowed select-none">
        <div className="flex items-center justify-between">
          <span className="text-4xl">{game.emoji}</span>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{game.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{game.description}</p>
        </div>
        <span className="mt-auto inline-block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Coming Soon
        </span>
      </div>
    )
  }

  return (
    <Link
      href={game.href}
      className="group relative rounded-xl border border-border bg-card p-6 flex flex-col gap-4 transition-all hover:border-foreground/20 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span className="text-4xl">{game.emoji}</span>
        <span className="text-xs font-medium uppercase tracking-wider text-green-600 dark:text-green-400">
          Play Now
        </span>
      </div>
      <div>
        <h2 className="text-lg font-semibold tracking-tight group-hover:underline underline-offset-4">
          {game.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{game.description}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium">
        Launch game
        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
      </span>
    </Link>
  )
}
