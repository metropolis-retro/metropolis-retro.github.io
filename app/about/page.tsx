import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SITE_URL, TITLE_BASE, pageKeywords } from "@/lib/seo"

const pillars = [
  {
    title: "Community First",
    description:
      "We are building a welcoming chess community in Brisbane where social players and serious competitors can both feel at home.",
  },
  {
    title: "Structured Improvement",
    description:
      "From beginner workshops to post-game analysis, our sessions are designed to help members improve with practical feedback.",
  },
  {
    title: "Official Events",
    description:
      "Metropolis Retro runs regular meetups and chess events with clear formats, pairings, and tournament standards.",
  },
];

const values = [
  "Respectful club culture",
  "Fair play and sportsmanship",
  "Learning at every level",
  "Consistent weekly rhythm",
];

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Metropolis Retro, a Brisbane chess club focused on community, structured improvement, and official events.",
  keywords: pageKeywords(["about Metropolis Retro", "Brisbane chess community", "club values"]),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About | ${TITLE_BASE}`,
    description:
      "Learn about Metropolis Retro, a Brisbane chess club focused on community, structured improvement, and official events.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${TITLE_BASE}`,
    description:
      "Learn about Metropolis Retro, a Brisbane chess club focused on community, structured improvement, and official events.",
  },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">About Metropolis Retro</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">Brisbane's official chess club for players who want to learn, compete, and connect.</h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Metropolis Retro is a local chess club based in Brisbane, Australia. We host regular meetups and event
              formats that balance strong competition with a friendly, social atmosphere.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{pillar.title}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl tracking-tight">Our club values</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">
                Every meetup is guided by shared standards that keep games competitive, respectful, and enjoyable for
                everyone.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value) => (
                <li key={value} className="rounded-2xl border border-border bg-secondary/50 px-5 py-4 text-sm font-medium">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
