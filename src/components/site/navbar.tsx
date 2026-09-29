import { useEffect, useState } from "react"
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react"
import { Command, Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]

function useActiveSection() {
  const [active, setActive] = useState("")
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export function Navbar({ dark, onToggleTheme, onOpenCommand }: { dark: boolean; onToggleTheme: () => void; onOpenCommand: () => void }) {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
  }, [open])

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary to-sun" />
      <header className="fixed inset-x-0 top-3 z-50 px-4">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pr-2 pl-3 transition-all duration-500",
            scrolled ? "border-border bg-background/75 shadow-lg shadow-black/5 backdrop-blur-xl" : "border-transparent bg-transparent"
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
            <span className="grid size-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-ink-foreground transition-transform duration-500 group-hover:rotate-[360deg]">DJ</span>
            <span className="hidden font-display text-lg font-semibold tracking-tight sm:block">Divesh<span className="text-primary">.</span></span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.id} className="relative">
                <a href={`#${n.id}`} className={cn("relative z-10 block rounded-full px-4 py-2 text-sm transition-colors", active === n.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {n.label}
                </a>
                {active === n.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onOpenCommand} className="hidden gap-1 font-mono text-xs text-muted-foreground lg:inline-flex" aria-label="Open command menu">
                  <Command className="size-3.5" />K
                </Button>
              </TooltipTrigger>
              <TooltipContent>Quick actions</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label="Toggle theme" className="relative overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={dark ? "m" : "s"} initial={{ y: 20, rotate: -90, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} exit={{ y: -20, rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                      {dark ? <Moon /> : <Sun />}
                    </motion.span>
                  </AnimatePresence>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{dark ? "Light mode" : "Dark mode"}</TooltipContent>
            </Tooltip>
            <Button asChild className="hidden sm:inline-flex">
              <a href="#contact">Let's talk <ArrowUpRight /></a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu />
            </Button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink px-6 pt-5 pb-10 text-ink-foreground md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Divesh<span className="text-primary">.</span></span>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu" className="hover:bg-white/10 hover:text-ink-foreground">
                <X />
              </Button>
            </div>
            <ul className="mt-14 flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-2 font-display text-5xl font-semibold tracking-tight">
                    <span className="font-mono text-sm text-primary">0{i + 1}</span>{n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto text-sm opacity-70">diveshjadhav72@gmail.com</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
