import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionTitle } from "@/components/ui/section-title"

const faqs = [
  {
    question: "Do I need a rating to join?",
    answer:
      "No. We welcome unrated beginners, casual players, and experienced competitors. Sessions are structured to support mixed levels.",
  },
  {
    question: "What should I bring to a meetup?",
    answer:
      "Bring a chess set if you can, but it is not mandatory. We recommend bringing a clock for timed formats and a notebook for analysis.",
  },
  {
    question: "Are events beginner-friendly?",
    answer:
      "Yes. We run dedicated beginner training nights and clear event formats so new players can participate comfortably.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28 border-border border-t-0">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between gap-6 mb-10 md:mb-12">
          <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Frequently asked questions
          </SectionTitle>
          <Link
            href="/faq"
            className="hidden md:inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--brand)" }}
          >
            View full FAQ
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-card p-4 md:p-6">
          <Accordion type="single" collapsible>
            {faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-base md:text-lg font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="md:hidden mt-6">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--brand)" }}
          >
            View full FAQ
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
