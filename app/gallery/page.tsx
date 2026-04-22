import type { Metadata } from "next"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GalleryGrid } from "@/components/sections/gallery-grid"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"
import { galleryImages } from "@/lib/content/gallery"

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore the vibrant life of a community gaming club, showcasing everything from intense board game nights and chess" +
      " literature to relaxed social gatherings at the Breakfast Creek Hotel. The collection also features dedicated product shots," +
      " highlighting iconic items like the Waddingtons of London playing cards and Trivial Pursuit mini packs that fuel our weekly events.",
  keywords: pageKeywords(["chess club gallery", "relaxed social gatherings", "iconic weekly events"]),
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: `Gallery | ${TITLE_BASE}`,
    description:
      "Browse photos from our events, training sessions, and community gatherings at Metropolis Retro.",
    url: `${SITE_URL}/gallery`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Gallery | ${TITLE_BASE}`,
    description:
      "Browse photos from our events, training sessions, and community gatherings at Metropolis Retro.",
  },
}

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Visual Archive</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">Gallery</h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Discover moments from our events, training sessions, and community gatherings at Metropolis Retro.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <GalleryGrid images={galleryImages} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
