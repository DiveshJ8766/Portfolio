import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import {ArrowUpRight, Lock} from "lucide-react"
import { Github } from "./brand-icons"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal, SectionHeading } from "./primitives"
import { projects, type Project } from "@/data/portfolio"
import { cn } from "@/lib/utils"

/** Little abstract UI illustration per project, drawn in CSS so it stays crisp and themeable. */
function Mock({ kind }: { kind: Project["mock"] }) {
  const shell = "absolute inset-x-5 top-14 bottom-0 sm:inset-x-8 rounded-t-2xl bg-white/95 p-4 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 dark:bg-stone-900/95 md:inset-x-10"
  const bar = (
    <div className="mb-4 flex gap-1.5">
      <span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-400" />
    </div>
  )
  if (kind === "checkout")
    return (
      <div className={shell}>
        {bar}
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-3 space-y-2">
            {["Haircut & style", "Deep conditioning", "Tip"].map((t, i) => (
              <div key={t} className="flex items-center justify-between rounded-lg bg-stone-100 px-3 py-2 text-[11px] text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                <span>{t}</span><span className="font-mono">${[45, 30, 12][i]}.00</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-1 pt-1 text-xs font-semibold text-stone-800 dark:text-stone-100"><span>Total</span><span className="font-mono">$87.00</span></div>
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center gap-2 rounded-xl bg-stone-900 p-3 text-white dark:bg-stone-800">
            <div className="relative grid size-12 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
              <span className="relative grid size-12 place-items-center rounded-full bg-primary text-[10px] font-bold">TAP</span>
            </div>
            <span className="text-[10px] opacity-70">Tap to Pay</span>
          </div>
        </div>
      </div>
    )
  if (kind === "chart")
    return (
      <div className={shell}>
        {bar}
        <div className="mb-3 flex gap-2">
          {["SENSEX", "NIFTY", "BANKEX"].map((t, i) => (
            <div key={t} className="flex-1 rounded-lg bg-stone-100 p-2 dark:bg-stone-800">
              <p className="font-mono text-[9px] text-stone-500">{t}</p>
              <p className={cn("text-xs font-semibold", i === 2 ? "text-red-500" : "text-emerald-600")}>{i === 2 ? "−0.42%" : `+${(1.2 + i * 0.6).toFixed(2)}%`}</p>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 300 90" className="w-full text-emerald-500">
          <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".35" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
          <path d="M0 70 L25 62 L50 66 L75 48 L100 52 L125 38 L150 44 L175 30 L200 34 L225 20 L250 26 L275 12 L300 16 L300 90 L0 90Z" fill="url(#g)" />
          <path d="M0 70 L25 62 L50 66 L75 48 L100 52 L125 38 L150 44 L175 30 L200 34 L225 20 L250 26 L275 12 L300 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </div>
    )
  if (kind === "chain")
    return (
      <div className={shell}>
        {bar}
        <div className="flex items-center justify-between gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-1 items-center gap-1">
              <div className="flex-1 rounded-lg border border-violet-200 bg-violet-50 p-2 dark:border-violet-900 dark:bg-violet-950">
                <p className="font-mono text-[9px] text-violet-500">BLOCK #{1042 + i}</p>
                <p className="mt-1 h-1.5 w-full rounded bg-violet-200 dark:bg-violet-800" />
                <p className="mt-1 h-1.5 w-2/3 rounded bg-violet-200 dark:bg-violet-800" />
              </div>
              {i < 2 && <span className="h-0.5 w-3 bg-violet-300" />}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <span className="grid size-4 place-items-center rounded-full bg-emerald-500 text-[9px] text-white">✓</span> Certificate verified on-chain
        </div>
      </div>
    )
  return (
    <div className={shell}>
      {bar}
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-stone-100 p-2 dark:bg-stone-800">
            <div className={cn("mb-2 aspect-video rounded-md", ["bg-emerald-300", "bg-amber-300", "bg-sky-300"][i])} />
            <p className="h-1.5 w-full rounded bg-stone-300 dark:bg-stone-600" />
            <p className="mt-1 h-1.5 w-1/2 rounded bg-stone-300 dark:bg-stone-600" />
          </div>
        ))}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800"><div className="h-full w-2/3 rounded-full bg-emerald-500" /></div>
    </div>
  )
}

function ProjectCard({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 150, damping: 15 })
  const glow = useTransform([mx, my], ([x, y]) => `radial-gradient(420px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,.22), transparent 45%)`)

  return (
    <Reveal delay={(index % 2) * 0.1} className={cn(index % 2 === 1 && "md:mt-20")}>
      <div className="[perspective:1400px]">
        <motion.button
          ref={ref}
          onClick={onOpen}
          style={{ rotateX: rx, rotateY: ry }}
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse" || !ref.current) return
            const r = ref.current.getBoundingClientRect()
            mx.set((e.clientX - r.left) / r.width)
            my.set((e.clientY - r.top) / r.height)
          }}
          onPointerLeave={() => { mx.set(0.5); my.set(0.5) }}
          className="group block w-full cursor-pointer text-left"
          aria-label={`Open ${p.title} details`}
        >
          <div className={cn("relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br", p.gradient)}>
            <div className="absolute inset-0 grain opacity-20 mix-blend-overlay" />
            <Mock kind={p.mock} />
            <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute top-4 left-4 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur">{p.kind}</span>
            <span className="absolute top-4 right-4 grid size-11 translate-y-2 scale-75 place-items-center rounded-full bg-white text-stone-900 opacity-0 shadow-lg transition-all duration-400 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
          <div className="mt-5 flex items-start justify-between gap-4 px-1">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>
            </div>
            <span className="font-mono text-sm text-muted-foreground">{p.year}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 px-1">
            {p.stack.slice(0, 4).map((s) => <Badge key={s} variant="outline" className="font-normal">{s}</Badge>)}
          </div>
        </motion.button>
      </div>
    </Reveal>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  return (
    <section id="projects" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading eyebrow="Selected work" title={<>Things I've <span className="italic font-normal text-primary">built</span> &amp; shipped</>}>
          Client work and side projects. Click any card for the full story.
        </SectionHeading>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} index={i} onOpen={() => setOpen(p)} />)}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="max-h-[90vh] overflow-y-auto border-0 p-0 shadow-2xl ring-1 ring-black/5 sm:max-w-2xl dark:ring-white/10">
          {open && (
            <>
              <div className={cn("relative h-48 shrink-0 overflow-hidden sm:h-56 bg-gradient-to-br", open.gradient)}>
                <Mock kind={open.mock} />
              </div>
              <div className="p-6 pt-2 md:p-8 md:pt-2">
                <DialogHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{open.kind}</Badge><span className="font-mono">{open.year}</span>
                  </div>
                  <DialogTitle className="font-display text-3xl tracking-tight">{open.title}</DialogTitle>
                  <DialogDescription className="text-base">{open.description}</DialogDescription>
                </DialogHeader>
                <ul className="mt-6 space-y-3">
                  {open.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{pt}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {open.stack.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
                </div>
                <div className="mt-8">
                  {open.link ? (
                    <Button asChild><a href={open.link} target="_blank" rel="noreferrer"><Github /> View on GitHub</a></Button>
                  ) : (
                    <p className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground"><Lock className="size-4" /> Proprietary client work — happy to walk through it on a call.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
