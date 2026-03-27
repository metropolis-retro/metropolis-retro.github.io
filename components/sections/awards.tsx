"use client";

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { SectionTitle } from "@/components/ui/section-title"

const awards = [
  { title: "Club launch on GitHub", year: "2021", organization: "Metropolis Retro", link: "#" },
  { title: "Club launch in Brisbane", year: "2025", organization: "Metropolis Retro", link: "#" },
  { title: "First official weekly meetup series", year: "2025", organization: "Community Program", link: "#" },
  { title: "11th event at The Breakfast Creek Hotel", year: "2026", organization: "Community Program", link: "#" },
  { title: "Club launch on Discord, Telegram and lichess", year: "2026", organization: "Metropolis Retro", link: "#" },
  /*
  { title: "Beginner coaching nights introduced", year: "2025", organization: "Training Program", link: "#" },
  { title: "Rapid arena format added", year: "2025", organization: "Weekend Events", link: "#" },
  { title: "First seasonal open announced", year: "2026", organization: "Club Tournament", link: "#" },
  { title: "Growing Brisbane chess network", year: "2026", organization: "Local Community", link: "#" },
  */
];

export function Awards() {
  return (
    <section id="awards" className="py-20 md:py-32 border-border border-t-0 md:pt-0 md:pb-0">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-12 md:mb-16">
          Club milestones
        </SectionTitle>

        <div className="flex flex-col gap-4">
          {awards.map((award, index) => (
            <Link
              key={index}
              href={award.link}
              className="group flex items-center justify-between p-5 md:p-6 border border-border rounded-2xl hover:bg-secondary/50 transition-all hover:border-foreground/20"
            >
              <div className="flex items-center gap-6 flex-1">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl md:text-2xl">{award.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{award.organization}</p>
                </div>
                <span className="text-sm text-muted-foreground font-medium">{award.year}</span>
              </div>
              <ArrowUpRight
                className="w-8 h-8 md:w-10 md:h-10 ml-6 text-muted-foreground transition-all group-hover:translate-x-1"
                strokeWidth={1}
                style={{ color: "var(--brand)" }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
