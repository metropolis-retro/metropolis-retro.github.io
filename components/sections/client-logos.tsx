"use client";

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

export function ClientLogos() {
  return (
    <section className="py-16 border-border overflow-hidden md:py-10 border-t-[0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-8">
        <p className="text-sm text-muted-foreground text-center">Played by chess lovers, gamers and socialites at venues across Brisbane and globally</p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {[...names, ...names].map((client, index) => (
            <div key={`${client}-${index}`} className="flex items-center justify-center min-w-[200px] px-8">
              <span className="text-2xl md:text-3xl font-semibold text-muted-foreground/50 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
