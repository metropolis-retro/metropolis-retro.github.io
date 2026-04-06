"use client";

const skills = [
  "Weekly Club Meetups",
  "Rapid Chess Nights",
  "Beginner-Friendly Sessions",
  "Classical Play",
  "Blitz Events",
  "Tournament Pairings",
  "Game Analysis",
  "Junior Development",
  "Community Events",
];

const stats = [
  { value: "Weekly", label: "Official Meetups" },
  { value: "All", label: "Skill Levels Welcome" },
  { value: "Brisbane", label: "Club Home Base" },
];

import { SectionTitle } from "@/components/ui/section-title"

export function About() {
  return (
    <section id="about" className="py-20 border-border border-t-0 md:py-10 md:pb-32 md:pt-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              A Friendly Chess Community in Brisbane
            </SectionTitle>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Metropolis Retro brings together games lovers across Brisbane for regular over-the-board meetups,
              practical training sessions, and social play in a welcoming environment.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you are learning your first openings or preparing for tournament play, our club events are built
              to help you improve, connect with others, and enjoy the game.
            </p>
          </div>

          <div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">What we run</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-secondary rounded-2xl">
                  <div className="text-2xl md:text-3xl font-semibold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
