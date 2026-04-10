"use client";

import { useState } from "react"
import Image from "next/image"
import { SectionTitle } from "@/components/ui/section-title"

const testimonials = [
  {
    id: 1,
    quote:
      "I was nervous joining my first meetup, but everyone was welcoming and I had great games from round one.",
    author: "Sarah C.",
    role: "New Club Member",
    avatar: "/images/imgi_97_user77.webp",
    company: "Brisbane",
    blurColor: "bg-blue-500",
  },
  {
    id: 2,
    quote:
      "The rapid nights are well-organized and competitive. It is now my favorite weekly chess event in Brisbane.",
    author: "Marcus J.",
    role: "Weekend Regular",
    avatar: "/images/imgi_106_user86.webp",
    company: "Brisbane North",
    blurColor: "bg-purple-500",
  },
  {
    id: 3,
    quote:
      "The beginner workshop was exactly what I needed. The coaches explained tactics clearly and made it fun.",
    author: "Emily R.",
    role: "Beginner Program",
    avatar: "/images/imgi_105_user85.webp",
    company: "South Brisbane",
    blurColor: "bg-pink-500",
  },
  {
    id: 4,
    quote:
      "Strong players and social players mix really well here. You can push yourself and still enjoy the atmosphere.",
    author: "David P.",
    role: "Club Night Player",
    avatar: "/images/imgi_102_user82.webp",
    company: "Inner City",
    blurColor: "bg-emerald-500",
  },
  {
    id: 5,
    quote:
      "I met training partners at Metropolis Retro within two weeks, and my confidence in tournament games improved fast.",
    author: "Lisa W.",
    role: "Competitive Member",
    avatar: "/images/imgi_100_user80.webp",
    company: "Brisbane East",
    blurColor: "bg-orange-500",
  },
  {
    id: 6,
    quote:
      "The event team runs smooth pairings and keeps rounds on time. It feels professional without being intimidating.",
    author: "James M.",
    role: "Rapid Event Player",
    avatar: "/images/imgi_107_user87.webp",
    company: "Brisbane West",
    blurColor: "bg-cyan-500",
  },
  {
    id: 7,
    quote:
      "Great club culture, strong chess, and friendly people. Metropolis Retro has become part of my weekly routine.",
    author: "Nina P.",
    role: "Long-term Member",
    avatar: "/images/imgi_108_user88.webp",
    company: "Brisbane",
    blurColor: "bg-rose-500",
  },
];

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false)

  const duplicatedTestimonials = [...testimonials, ...testimonials]
  const duplicatedTestimonialsReverse = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()]
  const mobileTestimonials = testimonials.slice(0, 6)

  return (
    <section id="testimonials" className="py-20 border-border overflow-hidden md:py-32 border-t-[0] pb-0 relative">
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20 hidden lg:block" />

      <div className="hidden lg:block pl-6 md:pl-12">
        <div className="mb-12 md:mb-16 max-w-[1280px]">
          <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            What members say
          </SectionTitle>
        </div>

        <div className="relative mb-6">
          <div
            className="flex gap-6 animate-scroll-left"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.id}-${index}`}
                className="relative flex-shrink-0 w-[85vw] md:w-[400px] p-6 md:p-8 border bg-card hover:shadow-lg transition-shadow overflow-hidden border-border md:px-6 md:py-6 rounded-3xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>

                <blockquote className="text-base leading-relaxed font-semibold text-foreground relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div
                  className={`absolute -bottom-12 -right-12 w-48 h-48 ${testimonial.blurColor} rounded-full opacity-10`}
                  style={{ filter: "blur(72px)" }}
                />
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="flex gap-6 animate-scroll-right"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {duplicatedTestimonialsReverse.map((testimonial, index) => (
              <article
                key={`reverse-${testimonial.id}-${index}`}
                className="relative flex-shrink-0 w-[85vw] md:w-[400px] p-6 md:p-8 border bg-card hover:shadow-lg transition-shadow overflow-hidden border-border md:px-6 md:py-6 rounded-3xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>

                <blockquote className="text-base leading-relaxed font-semibold text-foreground relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div
                  className={`absolute -bottom-12 -right-12 w-48 h-48 ${testimonial.blurColor} rounded-full opacity-10`}
                  style={{ filter: "blur(72px)" }}
                />
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            What members say
          </SectionTitle>
        </div>

        <div className="relative">
          {mobileTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="sticky pt-10"
              style={{
                top: `${70 + index * 0}px`,
                zIndex: index + 1,
              }}
            >
              <article className="relative p-6 md:p-8 border bg-card transition-shadow overflow-hidden border-border rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>

                <blockquote className="text-base leading-relaxed font-semibold text-foreground relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div
                  className={`absolute -bottom-12 -right-12 w-48 h-48 ${testimonial.blurColor} rounded-full opacity-10`}
                  style={{ filter: "blur(72px)" }}
                />
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-10 lg:hidden" />
    </section>
  )
}
