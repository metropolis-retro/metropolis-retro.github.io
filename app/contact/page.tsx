import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/forms/contact-form"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Metropolis Retro for Brisbane meetup details, event registration, and chess club membership questions.",
  keywords: pageKeywords(["contact chess club", "Brisbane meetup contact", "join chess club Brisbane"]),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${TITLE_BASE}`,
    description:
      "Contact Metropolis Retro for Brisbane meetup details, event registration, and chess club membership questions.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${TITLE_BASE}`,
    description:
      "Contact Metropolis Retro for Brisbane meetup details, event registration, and chess club membership questions.",
  },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Contact</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">Join the club and play with us in Brisbane and on Lichess.</h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Send us a message for meetup details, venue info, and upcoming event registration.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl tracking-tight">Message the club</h2>
              <ContactForm />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl tracking-tight">Club details</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="mt-1 font-medium">hello@metropolisretro.com</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">City</dt>
                  <dd className="mt-1 font-medium">Brisbane, Australia</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Regular meetup days</dt>
                  <dd className="mt-1 font-medium">Monday, Friday and once a month online for the club simul</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
