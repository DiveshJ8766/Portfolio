import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react"
import {ArrowDownRight, Download, Mail, MapPin, Sparkles} from "lucide-react"
import { Github, Linkedin } from "./brand-icons"
import { Button } from "@/components/ui/button"
import { Magnetic, Counter } from "./primitives"
import { profile, stats } from "@/data/portfolio"
import portrait from "@/assets/portrait.webp"

const ease = [0.22, 1, 0.36, 1] as const

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-grid h-[1.35em] overflow-hidden align-bottom leading-[1.35]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease }}
          className="col-start-1 row-start-1 whitespace-nowrap text-primary"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function CircleBadge() {
  const text = "OPEN TO NEW OPPORTUNITIES • OPEN TO NEW OPPORTUNITIES • "
  return (
    <a href="#contact" className="group relative grid size-28 place-items-center rounded-full bg-ink text-ink-foreground shadow-xl sm:size-32" aria-label="Contact me">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="fill-current font-mono text-[7.4px] tracking-[0.12em]"><textPath href="#circ">{text}</textPath></text>
      </svg>
      <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
        <ArrowDownRight className="size-5" />
      </span>
    </a>
  )
}

export function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-7, 7])
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6])
  const floatX = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const floatY = useTransform(sy, [-0.5, 0.5], [-14, 14])
  const floatXr = useTransform(sx, [-0.5, 0.5], [14, -14])
  const bgX = useTransform(sx, [-0.5, 0.5], [30, -30])

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-sun/30 blur-[120px] dark:bg-primary/20" />
      <motion.div style={{ x: bgX }} aria-hidden className="pointer-events-none absolute bottom-10 left-0 w-full overflow-hidden text-center font-display text-[24vw] leading-none font-extrabold tracking-tighter whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_color-mix(in_oklch,var(--foreground)_9%,transparent)] md:bottom-0">
        DIVESH
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border bg-card/70 py-1.5 pr-4 pl-1.5 text-sm shadow-sm backdrop-blur">
            <span className="relative flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-emerald-500" /></span>
              Available
            </span>
            <span className="text-muted-foreground">SDE @ <span className="font-medium text-foreground">Zoca AI</span></span>
          </motion.div>

          <h1 className="font-display text-[2.6rem] leading-[0.98] font-semibold tracking-tight min-[400px]:text-[2.9rem] sm:text-7xl lg:text-[4.2rem] xl:text-[5.4rem]">
            {["Hi, I'm Divesh.", "I craft fast,", "human interfaces"].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}>
                  {i === 2 ? <>human <span className="relative italic font-normal">interfaces<svg className="absolute -bottom-2 left-0 w-full text-primary" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none"><motion.path d="M3 14 C 70 4, 150 4, 297 12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 1, ease }} /></svg></span></> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-7 max-w-xl text-lg text-muted-foreground">
            <p className="mb-2 font-display text-xl text-foreground sm:text-2xl">
              <RotatingRole />
            </p>
            3+ years building production-grade React products for stock exchanges, KYC platforms and AI-powered booking — with an obsession for performance, design systems and accessibility.
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease }}
            className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button size="lg" asChild className="shadow-lg shadow-primary/25">
                <a href="#projects">See my work <ArrowDownRight /></a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="outline" asChild>
                <a href={profile.resume} target="_blank" rel="noreferrer"><Download /> Download résumé</a>
              </Button>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: profile.github, icon: Github, label: "GitHub" },
                { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="grid size-10 place-items-center rounded-full text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-foreground">
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* portrait */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[21rem] [perspective:1200px] sm:max-w-[25rem] lg:max-w-[23rem] xl:max-w-[27rem]">
          <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="relative [transform-style:preserve-3d]">
            <div className="absolute -inset-3 rounded-t-[14rem] rounded-b-[2.5rem] border border-dashed border-primary/40" />
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-t-[13rem] rounded-b-[2rem] bg-[#f1bc6a] shadow-2xl shadow-primary/20">
              <img src={portrait} alt="Portrait of Divesh Jadhav" className="size-full object-cover object-[50%_20%]" />
              <div className="absolute inset-0 grain opacity-[0.12] mix-blend-overlay" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white">
                <MapPin className="size-4" /> {profile.location}
              </div>
            </div>
          </motion.div>

          <motion.div style={{ x: floatX, y: floatY }} className="absolute top-[14%] -left-2 sm:-left-12">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl border bg-card/90 px-4 py-3 shadow-xl backdrop-blur">
              <p className="font-display text-3xl font-bold leading-none"><Counter to={3} suffix="+" /></p>
              <p className="mt-1 text-xs text-muted-foreground">Years of<br />experience</p>
            </motion.div>
          </motion.div>

          <motion.div style={{ x: floatXr, y: floatY }} className="absolute top-[46%] -right-2 sm:-right-10">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2.5 rounded-2xl border bg-card/90 py-2.5 pr-4 pl-2.5 shadow-xl backdrop-blur">
              <span className="grid size-9 place-items-center rounded-xl bg-[#149eca]/15 text-[#149eca]">
                <svg viewBox="-11.5 -10.23 23 20.46" className="size-6 animate-spin-slow"><circle r="2.05" fill="currentColor" /><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg>
              </span>
              <div className="text-sm leading-tight"><p className="font-semibold">React.js</p><p className="text-xs text-muted-foreground">+ TypeScript</p></div>
            </motion.div>
          </motion.div>

          <motion.div style={{ x: floatX }} className="absolute -bottom-6 -left-2 hidden min-[420px]:block sm:-left-6">
            <div className="flex items-center gap-2 rounded-full border bg-card/90 px-3.5 py-2 text-sm shadow-xl backdrop-blur">
              <Sparkles className="size-4 text-primary" /> Design systems · Perf · a11y
            </div>
          </motion.div>

          <div className="absolute -right-2 -bottom-10 sm:-right-8">
            <CircleBadge />
          </div>
        </motion.div>
      </div>

      {/* stats */}
      <div className="relative mx-auto mt-24 max-w-6xl px-5 md:px-6">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border bg-card/60 backdrop-blur md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.7, ease }}
              className="group relative border-border p-6 transition-colors hover:bg-accent/50 md:p-8 [&:not(:last-child)]:md:border-r max-md:[&:nth-child(odd)]:border-r max-md:[&:nth-child(-n+2)]:border-b">
              <p className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              <span className="absolute top-5 right-5 size-2 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
