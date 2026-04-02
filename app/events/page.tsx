import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { events } from "@/lib/content/events"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse upcoming Metropolis Retro chess meetups and tournament formats across Brisbane, including rapid, classical, and workshop sessions.",
  keywords: pageKeywords(["Brisbane chess events", "rapid chess Brisbane", "chess tournaments Brisbane"]),
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: `Events | ${TITLE_BASE}`,
    description:
      "Browse upcoming Metropolis Retro chess meetups and tournament formats across Brisbane, including rapid, classical, and workshop sessions.",
    url: `${SITE_URL}/events`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Events | ${TITLE_BASE}`,
    description:
      "Browse upcoming Metropolis Retro chess meetups and tournament formats across Brisbane, including rapid, classical, and workshop sessions.",
  },
}

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Events</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">Weekly meetups and official chess events in Brisbane.</h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Our event calendar combines social chess nights, structured training, and competitive tournament formats.
              Join the session that matches your level and goals.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {events.map((event) => (
              <article key={event.slug} className="rounded-3xl border border-border bg-card p-6 md:p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{event.format}</p>
                <h2 className="mt-3 text-2xl md:text-3xl tracking-tight">{event.title}</h2>
                <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Time:</span> {event.time}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Location:</span> {event.location}
                  </p>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{event.note}</p>
                <Link href={`/events/${event.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm" style={{ color: "var(--brand)" }}>
                  View event details
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
