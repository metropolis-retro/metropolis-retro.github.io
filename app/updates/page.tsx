import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { updates } from "@/lib/content/updates"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Updates",
  description:
    "Read the latest Metropolis Retro announcements, schedule updates, and club news for Brisbane chess events and meetups.",
  keywords: pageKeywords(["chess club news", "Brisbane chess updates", "event announcements"]),
  alternates: {
    canonical: "/updates",
  },
  openGraph: {
    title: `Updates | ${TITLE_BASE}`,
    description:
      "Read the latest Metropolis Retro announcements, schedule updates, and club news for Brisbane chess events and meetups.",
    url: `${SITE_URL}/updates`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Updates | ${TITLE_BASE}`,
    description:
      "Read the latest Metropolis Retro announcements, schedule updates, and club news for Brisbane chess events and meetups.",
  },
}

export default function UpdatesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Latest Updates</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">Club news, announcements, and event changes.</h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Follow this page for schedule updates, tournament announcements, and club operations changes.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {updates.map((update) => (
              <article key={update.slug} className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{update.date}</p>
                <h2 className="mt-3 text-2xl md:text-3xl tracking-tight">{update.title}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{update.excerpt}</p>
                <Link href={`/updates/${update.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm" style={{ color: "var(--brand)" }}>
                  Read update
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
