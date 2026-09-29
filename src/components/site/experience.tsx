import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Counter, Reveal, SectionHeading } from "./primitives"
import { experience, impact } from "@/data/portfolio"
import { cn } from "@/lib/utils"

export function Experience() {
  const [tab, setTab] = useState(experience[0].id)
  return (
    <section id="experience" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading eyebrow="Experience" title={<>Where I've been <span className="italic font-normal text-primary">shipping</span></>}>
          From India's oldest stock exchange to an AI-first startup — pick a chapter.
        </SectionHeading>

        <Reveal>
          <Tabs value={tab} onValueChange={setTab} orientation="vertical" className="gap-6 lg:flex-row lg:gap-10">
            <TabsList className="-mx-5 h-auto w-[calc(100%+2.5rem)] snap-x snap-mandatory flex-row items-stretch justify-start gap-2 overflow-x-auto rounded-none bg-transparent px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:w-72 lg:shrink-0 lg:snap-none lg:flex-col lg:self-start lg:overflow-visible lg:px-0 lg:pb-0">
              {experience.map((e) => (
                <TabsTrigger key={e.id} value={e.id}
                  className="group relative h-auto min-w-60 flex-none snap-start flex-col items-start justify-start gap-1 rounded-2xl border border-border bg-card px-5 py-4 text-left whitespace-normal data-[state=active]:border-transparent data-[state=active]:bg-ink data-[state=active]:text-ink-foreground data-[state=active]:shadow-xl lg:min-w-0">
                  <span className="flex w-full items-center justify-between font-mono text-[11px] tracking-wider uppercase opacity-60">
                    {e.period}
                    {e.current && <span className="rounded-full bg-primary px-2 py-0.5 font-sans text-[10px] font-semibold tracking-normal text-primary-foreground normal-case opacity-100">Now</span>}
                  </span>
                  <span className="font-display text-lg font-semibold">{e.company}</span>
                  <span className="text-xs opacity-70">{e.client ? `Client · ${e.client}` : e.role}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative flex-1 lg:min-h-[34rem]">
              <AnimatePresence mode="wait">
                {experience.filter((e) => e.id === tab).map((e) => (
                  <motion.div key={e.id} role="tabpanel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-3xl border bg-card p-6 md:p-9">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{e.role}</h3>
                          <p className="mt-1 text-muted-foreground">
                            {e.company}{e.client && <> · <span className="text-foreground">{e.client}</span></>}
                          </p>
                        </div>
                        <Badge variant="outline" className="px-3 py-1 font-mono">{e.period}</Badge>
                      </div>
                      <p className="mt-5 text-lg text-balance">{e.blurb}</p>

                      <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
                        {e.metrics.map((m) => (
                          <div key={m.label} className="rounded-2xl bg-accent/60 p-3 sm:p-4">
                            <p className="font-display text-xl font-bold text-primary sm:text-2xl md:text-3xl">{m.value}</p>
                            <p className="mt-1 text-[11px] leading-snug text-muted-foreground hyphens-auto sm:text-xs">{m.label}</p>
                          </div>
                        ))}
                      </div>

                      <ul className="mt-7 space-y-3">
                        {e.points.map((p, i) => (
                          <motion.li key={p} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="flex gap-3 text-[15px]">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Check className="size-3" strokeWidth={3} /></span>
                            <span className="text-muted-foreground">{p}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="mt-7 flex flex-wrap gap-2">
                        {e.stack.map((s) => <Badge key={s} variant="secondary" className="px-3 py-1">{s}</Badge>)}
                      </div>
                    </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </Reveal>
      </div>
    </section>
  )
}

export function Impact() {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-28">
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.07]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <Reveal className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl">
            Numbers I'm <span className="whitespace-nowrap">proud of <ArrowUpRight className="inline size-9 text-primary md:size-10" /></span>
          </h2>
          <p className="max-w-sm opacity-60">Real outcomes from production work — measured, shipped and used by thousands.</p>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4 dark:bg-black/10">
          {impact.map((m, i) => (
            <div key={m.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              className={cn("relative bg-ink p-8 transition-all duration-500", hover !== null && hover !== i && "opacity-40")}>
              <p className="font-display text-6xl font-semibold tracking-tighter md:text-7xl">
                <Counter to={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-4 font-medium">{m.label}</p>
              <p className="mt-1 text-sm opacity-55">{m.note}</p>
              <motion.span className="absolute bottom-0 left-0 h-1 bg-primary" initial={false} animate={{ width: hover === i ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
