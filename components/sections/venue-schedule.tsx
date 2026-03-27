import { SectionTitle } from "@/components/ui/section-title"

const schedule = [
  {
    day: "Wednesday",
    title: "Beginner Training Night",
    time: "6:00 PM - 8:30 PM",
    details: "Foundational tactics, opening ideas, and guided practice games.",
  },
  {
    day: "Thursday",
    title: "CBD Club Meetup",
    time: "6:30 PM - 10:00 PM",
    details: "Social and competitive over-the-board games for all levels.",
  },
  {
    day: "Saturday",
    title: "Rapid Arena",
    time: "2:00 PM - 5:00 PM",
    details: "Swiss rapid rounds with standings and short post-game analysis.",
  },
];

export function VenueSchedule() {
  return (
    <section id="venue" className="py-20 md:py-28 border-border border-t-0">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Venue and weekly schedule
            </SectionTitle>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
              We host regular sessions in Brisbane with a clear weekly rhythm so members can build consistency and
              improve over time.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Primary location</p>
              <p className="mt-2 text-lg font-semibold">Brisbane CBD and Inner Brisbane venues</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Exact venue details are shared through club updates and registration messages.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {schedule.map((item) => (
              <article key={item.day} className="rounded-2xl border border-border bg-card p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{item.day}</span>
                </div>
                <p className="mt-2 text-sm font-medium" style={{ color: "var(--brand)" }}>
                  {item.time}
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.details}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
