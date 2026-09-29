import { useState } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { useTheme } from "@/hooks/use-theme"
import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { About, Marquee } from "@/components/site/about"
import { Experience, Impact } from "@/components/site/experience"
import { Skills } from "@/components/site/skills"
import { Projects } from "@/components/site/projects"
import { Contact, Education, Footer } from "@/components/site/contact"
import { CommandMenu } from "@/components/site/command-menu"
import { Cursor } from "@/components/site/cursor"

export default function App() {
  const { dark, toggle } = useTheme()
  const [cmd, setCmd] = useState(false)
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background font-sans text-base text-foreground antialiased">
      <Cursor />
      <Navbar dark={dark} onToggleTheme={toggle} onOpenCommand={() => setCmd(true)} />
      <main className="relative overflow-x-clip">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Impact />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CommandMenu open={cmd} setOpen={setCmd} onToggleTheme={toggle} />
      </div>
      <Toaster theme={dark ? "dark" : "light"} position="bottom-center" richColors />
    </TooltipProvider>
  )
}
