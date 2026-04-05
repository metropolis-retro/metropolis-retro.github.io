import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"
import { ArrowLeft } from "lucide-react"
import { PacmanEmbed } from "./pacman-embed"

export const metadata: Metadata = {
  title: "Pac-Man",
  description:
    "Play Pac-Man in your browser. Navigate the maze, eat all the dots, and avoid the ghosts.",
  keywords: pageKeywords(["pacman", "pac-man", "retro game", "arcade game", "browser game"]),
  alternates: {
    canonical: "/games/pacman",
  },
  openGraph: {
    title: `Pac-Man | ${TITLE_BASE}`,
    description: "Play Pac-Man in your browser. Navigate the maze, eat all the dots, and avoid the ghosts.",
    url: `${SITE_URL}/games/pacman`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Pac-Man | ${TITLE_BASE}`,
    description: "Play Pac-Man in your browser. Navigate the maze, eat all the dots, and avoid the ghosts.",
  },
}

export default function PacmanPage() {
  return (
    <>
      <Header />
      <main className="pt-14 md:pt-20">
        <section className="border-b border-t border-border">
          <div className="w-full py-6 px-4 md:px-6">
            <Link
              href="/games"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to games
            </Link>
          </div>
        </section>

        <div className="w-full px-0">
          <PacmanEmbed />
        </div>
      </main>
      <Footer />
    </>
  )
}
