import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Can complete beginners attend?",
    answer:
      "Yes. We run beginner-friendly sessions and can pair new players with suitable opponents. You do not need a formal rating to join.",
  },
  {
    question: "Do I need to register before attending?",
    answer:
      "For standard weekly meetups, registration is recommended but not always mandatory. For tournaments and special events, registration is required.",
  },
  {
    question: "What time controls do you run?",
    answer:
      "We regularly run rapid formats and also host classical and casual play sessions depending on the event schedule.",
  },
  {
    question: "Can juniors join the club?",
    answer:
      "Yes, juniors are welcome at suitable sessions. We recommend contacting the club first so we can guide you to the right event.",
  },
  {
    question: "How can I stay updated on changes?",
    answer:
      "Use the newsletter form in the footer and check the updates page regularly for venue, timing, and format announcements.",
  },
]

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-6">FAQ</p>
            <h1 className="text-4xl md:text-6xl tracking-tight max-w-4xl">Answers to common questions about our Brisbane chess club.</h1>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 rounded-3xl border border-border bg-card p-5 md:p-8">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-page-${index}`}>
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
        </section>
      </main>
      <Footer />
    </>
  )
}