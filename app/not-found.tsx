import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GradientBar } from "@/components/ui/gradient-bar"
import { SITE_URL, TITLE_BASE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page could not be found on Metropolis Retro.",
  openGraph: {
    title: `Page Not Found | ${TITLE_BASE}`,
    description: "The page could not be found on Metropolis Retro.",
    url: `${SITE_URL}/404`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Page Not Found | ${TITLE_BASE}`,
    description: "The page could not be found on Metropolis Retro.",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--brand-hover-bg) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-hover-bg) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
          <div
            className="absolute -left-28 top-16 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,0,110,0.35) 0%, rgba(255,0,110,0) 70%)" }}
          />
          <div
            className="absolute -right-28 bottom-16 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--brand-glow-strong) 0%, transparent 70%)" }}
          />
        </div>

        <section className="mx-auto flex min-h-[72vh] w-full max-w-[1280px] flex-col items-center justify-center px-6 py-16 text-center md:px-12">
          <p className="mb-5 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">Metropolis Retro</p>

          <h1
            className="mb-5 text-7xl font-normal leading-none md:text-9xl"
            style={{
              fontFamily: "var(--font-mono)",
              background: "linear-gradient(135deg, #ff006e 0%, #8b5cf6 33%, #203eec 66%, #00d4ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </h1>

          <h2 className="max-w-3xl text-2xl font-semibold tracking-tight md:text-4xl">This board position does not exist.</h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            The page you were trying to reach has moved, expired, or was never part of the tournament bracket.
            Jump back to a live route and keep exploring upcoming Brisbane chess events.
          </p>

          <div className="mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-base font-medium text-primary-foreground transition-all sm:w-auto"
              style={{
                background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-light) 100%)",
                boxShadow: "0 10px 30px var(--brand-glow)",
              }}
            >
              Return Home
            </Link>
            <Link
              href="/events"
              className="inline-flex w-full items-center justify-center rounded-full border border-border bg-card px-8 py-4 text-base font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
            >
              Browse Events
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-border bg-card px-8 py-4 text-base font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
            >
              Contact Club
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <GradientBar />
    </>
  )
}
