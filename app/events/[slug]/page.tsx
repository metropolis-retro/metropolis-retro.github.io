import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getEventBySlug } from "@/lib/content/events"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"

type EventDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${event.title} | Events`,
    description: event.description,
    keywords: pageKeywords([
      event.category,
      event.format,
      event.location,
      ...event.tags,
      "Brisbane chess event",
    ]),
    alternates: {
      canonical: `/events/${event.slug}`,
    },
    openGraph: {
      title: `${event.title} | ${TITLE_BASE}`,
      description: event.description,
      url: `${SITE_URL}/events/${event.slug}`,
      type: "article",
      images: [
        {
          url: `${SITE_URL}${event.image}`,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | ${TITLE_BASE}`,
      description: event.description,
      images: [`${SITE_URL}${event.image}`],
    },
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">{event.category}</p>
            <h1 className="text-4xl md:text-6xl tracking-tight max-w-4xl">{event.title}</h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">{event.description}</p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-secondary">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8 space-y-4">
              <p className="text-sm">
                <span className="text-muted-foreground">Format:</span> <span className="font-medium">{event.format}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Time:</span> <span className="font-medium">{event.time}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Location:</span> <span className="font-medium">{event.location}</span>
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">{event.note}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {event.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-secondary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
