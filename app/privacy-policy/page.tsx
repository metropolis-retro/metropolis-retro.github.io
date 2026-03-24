import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { pageKeywords } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Metropolis Retro privacy policy, including how we collect, use, and retain member communication data.",
  keywords: pageKeywords(["privacy policy", "chess club privacy", "Metropolis Retro legal"]),
  alternates: {
    canonical: "/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Legal</p>
            <h1 className="text-4xl md:text-6xl tracking-tight">Privacy Policy</h1>
            <p className="mt-6 text-muted-foreground">Last updated: March 24, 2026</p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12 rounded-3xl border border-border bg-card p-6 md:p-10 space-y-8 leading-relaxed">
            <div>
              <h2 className="text-2xl tracking-tight">Information we collect</h2>
              <p className="mt-3 text-muted-foreground">
                We may collect contact details you provide directly, such as your name and email address, when you
                contact Metropolis Retro or subscribe to updates.
              </p>
            </div>
            <div>
              <h2 className="text-2xl tracking-tight">How we use information</h2>
              <p className="mt-3 text-muted-foreground">
                We use your information to communicate meetup details, respond to inquiries, and share club-related
                announcements.
              </p>
            </div>
            <div>
              <h2 className="text-2xl tracking-tight">Data retention</h2>
              <p className="mt-3 text-muted-foreground">
                We retain personal information only as long as necessary for communication and club operations, unless
                a longer retention period is required by law.
              </p>
            </div>
            <div>
              <h2 className="text-2xl tracking-tight">Contact</h2>
              <p className="mt-3 text-muted-foreground">
                For privacy requests, contact us at hello@metropolisretro.com.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}