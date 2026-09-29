import { useEffect, useRef, useState, type ReactNode } from "react"
import { animate, motion, useInView, useMotionValue, useSpring, type HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

/** Fades + lifts children into view once. */
export function Reveal({ children, delay = 0, y = 24, className, ...rest }:
  { children: ReactNode; delay?: number; y?: number; className?: string } & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Element that gently follows the cursor while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

/** Number that counts up when scrolled into view. */
export function Counter({ to, suffix = "", decimals = 0, className }: { to: number; suffix?: string; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setVal })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref} className={cn("tabular-nums", className)}>{val.toFixed(decimals)}{suffix}</span>
}

export function SectionHeading({ eyebrow, title, children, className }:
  { eyebrow: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between", className)}>
      <Reveal className="max-w-2xl">
        <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary uppercase">
          <span className="h-px w-8 bg-primary" /> {eyebrow}
        </p>
        <h2 className="font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">{title}</h2>
      </Reveal>
      {children && <Reveal delay={0.1} className="max-w-sm text-muted-foreground md:text-right">{children}</Reveal>}
    </div>
  )
}
