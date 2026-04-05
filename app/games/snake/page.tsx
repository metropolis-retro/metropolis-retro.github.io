import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"
import { ArrowLeft } from "lucide-react"
import { SnakeEmbed } from "./snake-embed"

export const metadata: Metadata = {
  title: "Snake",
  description:
    "Play Snake in your browser. Collect food, grow longer, and avoid crashing into yourself.",
  keywords: pageKeywords(["snake", "retro game", "arcade game", "browser game"]),
  alternates: {
    canonical: "/games/snake",
  },
  openGraph: {
    title: `Snake | ${TITLE_BASE}`,
    description: "Play Snake in your browser. Collect food, grow longer, and avoid crashing into yourself.",
    url: `${SITE_URL}/games/snake`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Snake | ${TITLE_BASE}`,
    description: "Play Snake in your browser. Collect food, grow longer, and avoid crashing into yourself.",
  },
}

export default function SnakePage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="border-b border-border py-8 md:py-12">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <Link
              href="/games"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to games
            </Link>
            <h1 className="text-3xl tracking-tight md:text-5xl lg:text-6xl">Snake</h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              Use the arrow keys or WASD to move. Collect food to grow, avoid collisions, and tap the on-screen controls on mobile.
            </p>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <SnakeEmbed />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
