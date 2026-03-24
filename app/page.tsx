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
