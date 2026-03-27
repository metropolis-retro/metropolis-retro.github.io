import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review Metropolis Retro terms for club participation, event changes, and general liability conditions.",
  keywords: pageKeywords(["terms of service", "chess club terms", "event participation policy"]),
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: `Terms of Service | ${TITLE_BASE}`,
    description:
      "Review Metropolis Retro terms for club participation, event changes, and general liability conditions.",
    url: `${SITE_URL}/terms-of-service`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms of Service | ${TITLE_BASE}`,
    description:
      "Review Metropolis Retro terms for club participation, event changes, and general liability conditions.",
  },
}

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Legal</p>
            <h1 className="text-4xl md:text-6xl tracking-tight">Terms of Service</h1>
            <p className="mt-6 text-muted-foreground">Last updated: March 24, 2026</p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12 rounded-3xl border border-border bg-card p-6 md:p-10 space-y-8 leading-relaxed">
            <div>
              <h2 className="text-2xl tracking-tight">Club participation</h2>
              <p className="mt-3 text-muted-foreground">
                By attending Metropolis Retro activities, members agree to respectful behavior, fair play, and
                compliance with event rules and organizer directions.
              </p>
            </div>
            <div>
              <h2 className="text-2xl tracking-tight">Event changes</h2>
              <p className="mt-3 text-muted-foreground">
                Event schedules, venues, and formats may change. We will post updates through official communication
                channels whenever practical.
              </p>
            </div>
            <div>
              <h2 className="text-2xl tracking-tight">Liability</h2>
              <p className="mt-3 text-muted-foreground">
                Participation in club events is at your own risk. Metropolis Retro is not liable for loss, damage, or
                injury except where liability cannot be excluded by applicable law.
              </p>
            </div>
            <div>
              <h2 className="text-2xl tracking-tight">Contact</h2>
              <p className="mt-3 text-muted-foreground">
                Questions about these terms can be sent to hello@metropolisretro.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
