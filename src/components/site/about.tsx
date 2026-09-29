import { motion } from "motion/react"
import { Asterisk, Code2, Gauge, Layers, CreditCard, Quote } from "lucide-react"
import { Reveal, SectionHeading } from "./primitives"
import { marquee, profile, services } from "@/data/portfolio"

export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="relative -rotate-2 border-y bg-ink py-5 text-ink-foreground">
      <div className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl font-medium tracking-tight whitespace-nowrap md:text-3xl">
            {m}
            <Asterisk className="size-6 text-primary" />
          </span>
        ))}
      </div>
    </div>
  )
}

const icons = [Layers, Code2, Gauge, CreditCard]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading eyebrow="About me" title={<>Engineer by craft,<br /><span className="text-muted-foreground">owner by habit.</span></>}>
          I like the whole arc — from fuzzy requirements to a reliable product people love using.
        </SectionHeading>

        <div className="grid gap-4">
          {/* bio */}
          <Reveal className="relative overflow-hidden rounded-3xl border bg-card p-7 text-card-foreground md:p-10">
            <Quote className="absolute top-6 right-6 size-16 text-primary/10" />
            <p className="max-w-4xl font-display text-2xl leading-snug font-medium tracking-tight text-balance md:text-[2rem]">
              I'm a <span className="text-primary">Software Development Engineer</span> who turns complex business domains — stock exchanges, KYC, salon bookings, payments — into interfaces that feel <em>effortless</em>.
            </p>
            <p className="mt-6 max-w-2xl text-muted-foreground">{profile.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2 text-sm">
              {["Ships end-to-end", "Mentors peers", "Leads frontend teams", "Writes AI skills for teams"].map((t) => (
                <span key={t} className="rounded-full border bg-background px-3.5 py-1.5">{t}</span>
              ))}
            </div>
          </Reveal>

          {/* services */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = icons[i]
              return (
                <Reveal key={s.title} delay={0.05 * i}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group h-full rounded-3xl border bg-card p-5 text-card-foreground transition-colors hover:border-primary/40">
                    <span className="mb-6 grid size-11 place-items-center rounded-2xl bg-accent text-primary transition-all duration-300 group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-lg leading-tight font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
