import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { SelectedWorks } from "@/components/sections/selected-works"
import { About } from "@/components/sections/about"
import { ClientLogos } from "@/components/sections/client-logos"
import { VenueSchedule } from "@/components/sections/venue-schedule"
import { Membership } from "@/components/sections/membership"
import { Testimonials } from "@/components/sections/testimonials"
import { Awards } from "@/components/sections/awards"
import { Insights } from "@/components/sections/insights"
import { Faq } from "@/components/sections/faq"
import { FinalCTA } from "@/components/sections/final-cta"
import { GradientBar } from "@/components/ui/gradient-bar"
import { SITE_URL, pageKeywords } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Chess Club in Brisbane",
  description:
    "Metropolis Retro is a Brisbane chess club hosting weekly meetups, training sessions, and official events for players of all levels.",
  keywords: pageKeywords(["Brisbane chess club", "weekly chess meetup", "chess training Brisbane"]),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Metropolis Retro | Chess Club in Brisbane",
    description:
      "Join weekly Brisbane chess meetups, learning sessions, and competitive club events with Metropolis Retro.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metropolis Retro | Chess Club in Brisbane",
    description:
      "Join weekly Brisbane chess meetups, learning sessions, and competitive club events with Metropolis Retro.",
  },
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SelectedWorks />
        <About />
        <VenueSchedule />
        <Membership />
        <ClientLogos />
        <Testimonials />
        <Awards />
        <Insights />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
      <GradientBar />
    </>
  )
}
