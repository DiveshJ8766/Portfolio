import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, Briefcase, Code2, Copy, FileText, FolderGit2, Mail, Moon, Search, User } from "lucide-react"
import { Github, Linkedin } from "./brand-icons"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"

type Item = { label: string; group: string; icon: React.ComponentType<{ className?: string }>; run: () => void; hint?: string }

export function CommandMenu({ open, setOpen, onToggleTheme }: { open: boolean; setOpen: (o: boolean) => void; onToggleTheme: () => void }) {
  const [q, setQ] = useState("")
  const [idx, setIdx] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(!open) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, setOpen])

  const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  const items: Item[] = useMemo(() => [
    { label: "About", group: "Navigate", icon: User, run: go("about") },
    { label: "Experience", group: "Navigate", icon: Briefcase, run: go("experience") },
    { label: "Skills", group: "Navigate", icon: Code2, run: go("skills") },
    { label: "Projects", group: "Navigate", icon: FolderGit2, run: go("projects") },
    { label: "Contact", group: "Navigate", icon: Mail, run: go("contact") },
    { label: "Copy email address", group: "Actions", icon: Copy, run: () => { navigator.clipboard?.writeText(profile.email).catch(() => {}); toast.success("Email copied") } },
    { label: "Toggle dark mode", group: "Actions", icon: Moon, run: onToggleTheme },
    { label: "Download résumé", group: "Links", icon: FileText, run: () => window.open(profile.resume, "_blank"), hint: "PDF" },
    { label: "Open GitHub", group: "Links", icon: Github, run: () => window.open(profile.github, "_blank"), hint: "github.com" },
    { label: "Open LinkedIn", group: "Links", icon: Linkedin, run: () => window.open(profile.linkedin, "_blank"), hint: "linkedin.com" },
  ], [onToggleTheme])

  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()))
  useEffect(() => setIdx(0), [q, open])
  useEffect(() => { if (!open) setQ("") }, [open])

  const exec = (i: Item | undefined) => { if (!i) return; setOpen(false); setTimeout(i.run, 120) }
  let lastGroup = ""

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="top-[22%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <DialogDescription className="sr-only">Jump to a section or run a quick action</DialogDescription>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-4 text-muted-foreground" />
          <input
            autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, filtered.length - 1)) }
              if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
              if (e.key === "Enter") exec(filtered[idx])
            }}
            placeholder="Type a command or search…"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No results found.</p>}
          {filtered.map((it, i) => {
            const header = it.group !== lastGroup ? (lastGroup = it.group) : null
            const Icon = it.icon
            return (
              <div key={it.label}>
                {header && <p className="px-3 pt-3 pb-1.5 text-xs font-medium text-muted-foreground">{header}</p>}
                <button onMouseMove={() => setIdx(i)} onClick={() => exec(it)}
                  className={cn("flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm", i === idx && "bg-accent text-accent-foreground")}>
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="flex-1 text-left">{it.label}</span>
                  {it.hint && <span className="text-xs text-muted-foreground">{it.hint}</span>}
                  {i === idx && <ArrowRight className="size-4 text-primary" />}
                </button>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
