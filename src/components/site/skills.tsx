import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Reveal, SectionHeading } from "./primitives"
import { skillGroups } from "@/data/portfolio"
import { cn } from "@/lib/utils"

type Group = keyof typeof skillGroups
const groups = Object.keys(skillGroups) as Group[]
const all = groups.flatMap((g) => skillGroups[g].map((s) => ({ s, g })))

const core = new Set(["React.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Design Systems", "Frontend Architecture", "Code Splitting", "React Hook Form", "TanStack Query", "Redux"])

export function Skills() {
  const [filter, setFilter] = useState<Group | "All">("All")
  const list = filter === "All" ? all : all.filter((x) => x.g === filter)

  return (
    <section id="skills" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading eyebrow="Toolbox" title={<>The stack behind<br />the <span className="italic font-normal text-primary">polish</span></>}>
          Filter by category. The <span className="font-medium text-foreground">highlighted</span> ones are what I reach for every day.
        </SectionHeading>

        <Reveal>
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
            {(["All", ...groups] as const).map((g) => (
              <button key={g} role="tab" aria-selected={filter === g} onClick={() => setFilter(g)}
                className={cn("relative cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors", filter === g ? "border-transparent text-ink-foreground" : "bg-card text-muted-foreground hover:text-foreground")}>
                {filter === g && <motion.span layoutId="skill-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{g}</span>
                <span className={cn("relative ml-1.5 font-mono text-[10px]", filter === g ? "opacity-60" : "opacity-50")}>
                  {g === "All" ? all.length : skillGroups[g].length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="flex min-h-56 flex-wrap content-start gap-3">
          <AnimatePresence mode="popLayout">
            {list.map(({ s, g }, i) => (
              <motion.span
                layout
                key={s}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 350, damping: 26, delay: i * 0.012 }}
                whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
                title={g}
                className={cn(
                  "cursor-default rounded-2xl border px-5 py-3 font-display text-lg font-medium tracking-tight shadow-xs md:text-xl",
                  core.has(s) ? "border-primary/30 bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:border-primary/40"
                )}
              >
                {s}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
