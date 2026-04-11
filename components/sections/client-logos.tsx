import { SectionTitle } from "@/components/ui/section-title"

const names = [
  "John Bampton",
  "Albion",
  "Gazza and female friend",
  "Uni Student Tim",
  "FIDE Master Stevan Jovic",
  "Seyyed Ali Mohammadiyeh",
  "Brisbane CBD",
  "Chess Teacher Kieran",
  "Breakfast Creek Hotel",
  "Tournament Player Tony",
  "Tradesmen Dan and Tim",
  "Random father and son",
  "Henry",
  "Lichess"
];

const marqueeMask =
  "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]";

export function ClientLogos() {
  return (
    <section
      className="relative py-20 overflow-hidden md:py-24"
      aria-label="Community members and venues"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/25 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 mb-10 md:mb-12 text-center">
        <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance max-w-2xl mx-auto">
          Players and places
        </SectionTitle>
        <p className="mt-4 md:mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Played by chess lovers, gamers, and socialites at venues across Brisbane and around the world.
        </p>
      </div>

      <div
        className={`group relative max-w-[1280px] mx-auto px-6 md:px-12 ${marqueeMask}`}
      >
        <div className="relative flex items-center min-h-[3rem] md:min-h-[3.25rem] cursor-default">
          <div className="flex items-center animate-marquee group-hover:[animation-play-state:paused]">
            {[...names, ...names].map((client, index) => (
              <span
                key={`${client}-${index}`}
                className="shrink-0 whitespace-nowrap mx-2 md:mx-3 px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-secondary transition-colors cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
