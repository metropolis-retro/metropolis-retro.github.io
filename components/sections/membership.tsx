import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"

const benefits = [
  "Priority access to weekly events",
  "Member-only training sessions",
  "Seasonal tournament eligibility",
  "Structured improvement pathways",
];

export function Membership() {
  return (
    <section id="membership" className="py-20 md:py-28 border-border border-t-0">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between gap-6 mb-12 md:mb-14">
          <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Membership and benefits
          </SectionTitle>
          <Link
            href="/membership"
            className="hidden md:inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--brand)" }}
          >
            View full membership details
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
          <p className="text-sm text-muted-foreground max-w-2xl">
            Join Metropolis Retro to get consistent access to events, coaching pathways, and a strong Brisbane chess
            network.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm font-medium">
                {benefit}
              </div>
            ))}
          </div>

          <div className="md:hidden mt-6">
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "var(--brand)" }}
            >
              View full membership details
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
