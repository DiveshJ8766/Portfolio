import { useEffect, useState, type FormEvent } from "react"
import { motion } from "motion/react"
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, GraduationCap, Phone, Send } from "lucide-react"
import { Github, Linkedin } from "./brand-icons"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Magnetic, Reveal, SectionHeading } from "./primitives"
import { education, profile } from "@/data/portfolio"

export function Education() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <Reveal className="mb-8 flex items-center gap-3">
          <GraduationCap className="size-6 text-primary" />
          <h2 className="font-display text-2xl font-semibold tracking-tight">Education</h2>
        </Reveal>
        <div className="divide-y border-y">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08}>
              <div className="group relative grid items-center gap-2 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:gap-8">
                <span aria-hidden className="pointer-events-none absolute inset-y-2 -inset-x-3 rounded-2xl bg-accent/0 transition-colors duration-300 group-hover:bg-accent/50 md:-inset-x-4" />
                <p className="relative font-display text-xl font-semibold tracking-tight transition-[color,transform] duration-300 group-hover:translate-x-1.5 group-hover:text-primary md:text-2xl">{e.degree}</p>
                <p className="relative text-muted-foreground">{e.school}</p>
                <div className="relative flex items-center gap-3 md:justify-end">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{e.score}</span>
                  <span className="font-mono text-sm text-muted-foreground">{e.period}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email) } catch { /* clipboard blocked */ }
    setCopied(true)
    toast.success("Email copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get("name") || "")
    const body = `${f.get("message")}\n\n— ${name} (${f.get("email")})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${name}`)}&body=${encodeURIComponent(body)}`
    toast.success("Opening your mail app…", { description: "Thanks for reaching out — I'll reply soon." })
  }

  return (
    <section id="contact" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading eyebrow="Contact" title={<>Have a product in mind?<br /><span className="italic font-normal text-primary">Let's build it.</span></>}>
          Open to full-time SDE / frontend roles and interesting collaborations.
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="flex flex-col gap-4">
            <button onClick={copy} className="group relative cursor-pointer overflow-hidden rounded-3xl bg-primary p-7 text-left text-primary-foreground md:p-9">
              <div className="absolute inset-0 grain opacity-20 mix-blend-overlay" />
              <div className="absolute -right-16 -bottom-16 size-56 rounded-full bg-sun/50 blur-3xl transition-transform duration-700 group-hover:scale-150" />
              <p className="relative text-sm opacity-80">Drop me a line</p>
              <p className="relative mt-2 font-display text-xl font-semibold tracking-tight [overflow-wrap:anywhere] min-[400px]:text-2xl sm:text-3xl lg:text-xl xl:text-2xl">{profile.email}</p>
              <span className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-black/15 px-4 py-2 text-sm">
                {copied ? <><Check className="size-4" /> Copied!</> : <><Copy className="size-4" /> Click to copy</>}
              </span>
            </button>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: profile.github, icon: Github, label: "GitHub" },
                { href: profile.resume, icon: FileText, label: "Résumé" },
                { href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone, label: "Call" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer" whileHover={{ y: -4 }}
                  className="group flex flex-col justify-between gap-8 rounded-3xl border bg-card p-5 text-card-foreground transition-colors hover:border-primary/40">
                  <div className="flex justify-between">
                    <Icon className="size-6" />
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </motion.a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="flex h-full flex-col gap-4 rounded-3xl border bg-card p-6 text-card-foreground md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">Name<Input name="name" required placeholder="Jane Doe" autoComplete="name" /></label>
                <label className="grid gap-2 text-sm font-medium">Email<Input name="email" type="email" required placeholder="jane@company.com" autoComplete="email" /></label>
              </div>
              <label className="grid flex-1 gap-2 text-sm font-medium">Message
                <Textarea name="message" required placeholder="Tell me about the role or project…" className="min-h-40 flex-1" />
              </label>
              <Magnetic strength={0.2} className="self-start">
                <Button type="submit" size="lg" className="group"><Send className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /> Send message</Button>
              </Magnetic>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: true }).format(new Date()))
    tick()
    const t = setInterval(tick, 30_000)
    return () => clearInterval(t)
  }, [])
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 pb-8 text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase opacity-50">Local time · IST</p>
            <p className="mt-2 font-display text-3xl font-semibold">{time}</p>
          </div>
          <a href="#top" className="group inline-flex items-center gap-3 self-start rounded-full border border-current/15 py-2 pr-2 pl-5 text-sm transition-colors hover:border-transparent hover:bg-primary hover:text-primary-foreground md:self-auto">
            Back to top
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:-translate-y-0.5 group-hover:bg-primary-foreground group-hover:text-primary"><ArrowUp className="size-4" /></span>
          </a>
        </div>
        <p aria-hidden className="mt-14 bg-gradient-to-b from-ink-foreground from-30% to-ink-foreground/0 bg-clip-text text-center font-display text-[11vw] leading-[0.85] whitespace-nowrap font-extrabold tracking-tighter text-transparent opacity-90 select-none xl:text-[8.5rem]">
          Divesh Jadhav
        </p>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-current/10 pt-6 text-sm opacity-60 sm:flex-row">
          <span>© {new Date().getFullYear()} Divesh Jadhav. All rights reserved.</span>
          <span>Built with React, Tailwind CSS & shadcn/ui</span>
        </div>
      </div>
    </footer>
  )
}
