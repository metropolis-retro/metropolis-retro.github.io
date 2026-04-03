"use client";

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { updates } from "@/lib/content/updates"

export function Insights() {
  return (
    <section id="insights" className="py-20 md:py-32 border-border border-t-0">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Latest updates
          </SectionTitle>
          <Link
            href="/updates"
            className="hidden md:inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: "var(--brand)" }}
          >
            View all updates
            <ArrowUpRight className="w-4 h-4" style={{ color: "var(--brand)" }} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {updates.slice(0, 3).map((insight) => (
            <Link key={insight.id} href={`/updates/${insight.slug}`} className="group block">
              <article className="h-full">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-secondary mb-4">
                  <Image
                    src={insight.image || "/placeholder.svg"}
                    alt={insight.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span>{insight.date}</span>
                  <span>•</span>
                  <span>{insight.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-muted-foreground transition-colors">
                  {insight.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{insight.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border rounded-full hover:bg-secondary transition-colors"
            style={{ color: "var(--brand)", borderColor: "var(--brand)" }}
          >
            View all updates
            <ArrowUpRight className="w-4 h-4" style={{ color: "var(--brand)" }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
