import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { pageKeywords } from "@/lib/seo"

const tiers = [
  {
    name: "Community Member",
    bestFor: "Casual players and regular meetup attendees",
    features: [
      "Weekly meetup access",
      "Community game nights",
      "Basic event announcements",
    ],
  },
  {
    name: "Competitive Member",
    bestFor: "Players preparing for events and regular rated practice",
    features: [
      "Priority entry to rapid events",
      "Tournament prep sessions",
      "Game review circles",
    ],
  },
  {
    name: "Development Pathway",
    bestFor: "Beginners and improving players seeking structured growth",
    features: [
      "Beginner workshop track",
      "Guided improvement plan",
      "Mentor pairing opportunities",
    ],
  },
];

const steps = [
  "Send us a contact message with your playing level and goals.",
  "Choose your preferred meetup rhythm and event format.",
  "Attend your first session and get paired into suitable games.",
];

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Explore Metropolis Retro membership paths for casual, competitive, and development-focused chess players in Brisbane.",
  keywords: pageKeywords(["chess club membership", "Brisbane chess members", "join Metropolis Retro"]),
  alternates: {
    canonical: "/membership",
  },
}

export default function MembershipPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Membership</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">Choose the right path to grow your chess in Brisbane.</h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Metropolis Retro offers flexible participation styles so members can stay social, improve consistently,
              or compete more seriously.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {tiers.map((tier) => (
              <article key={tier.name} className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl tracking-tight">{tier.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{tier.bestFor}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="rounded-lg bg-secondary/40 px-3 py-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl tracking-tight">How to join</h2>
            <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {steps.map((step, index) => (
                <li key={step} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Step {index + 1}</p>
                  <p className="mt-3 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}